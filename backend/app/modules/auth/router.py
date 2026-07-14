from __future__ import annotations

import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import RedirectResponse

from ...config import settings
from . import oidc
from .deps import require_user
from .schemas import CurrentUser
from .session import clear_session_cookie, issue_session_cookie

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["auth"])


@router.get("/me")
async def me(user: Annotated[CurrentUser, Depends(require_user)]) -> CurrentUser:
    return user


def _safe_redirect(target: str) -> str:
    """Only allow SPA-relative paths so login can't be used as an open redirect."""
    if target.startswith("/") and not target.startswith("//"):
        return target
    return "/"


@router.get("/auth/login")
async def login(redirect: str = "/") -> RedirectResponse:
    """Kick off the Entra ID code flow (entra_oidc mode only)."""
    if settings.auth_mode != "entra_oidc":
        # dev/EasyAuth modes have no interactive login on the backend.
        return RedirectResponse(url=settings.frontend_base_url or "/")
    auth_uri, signed_flow = oidc.build_auth_flow(_safe_redirect(redirect))
    response = RedirectResponse(url=auth_uri)
    response.set_cookie(
        key=oidc.FLOW_COOKIE,
        value=signed_flow,
        max_age=oidc.FLOW_MAX_AGE,
        httponly=True,
        secure=settings.session_cookie_secure,
        samesite="lax",
        path="/api/auth",
    )
    return response


@router.get("/auth/callback")
async def callback(request: Request) -> RedirectResponse:
    """Entra redirects here; exchange the code and mint the session cookie."""
    signed_flow = request.cookies.get(oidc.FLOW_COOKIE)
    if not signed_flow:
        raise HTTPException(status_code=400, detail="Missing login flow state")
    try:
        user, redirect_after = oidc.complete_auth_flow(
            signed_flow, dict(request.query_params)
        )
    except ValueError as exc:
        logger.warning("Login failed: %s", exc)
        return RedirectResponse(
            url=f"{settings.frontend_base_url}/login?error=auth_failed"
        )

    response = RedirectResponse(
        url=f"{settings.frontend_base_url}{_safe_redirect(redirect_after)}"
    )
    response.delete_cookie(key=oidc.FLOW_COOKIE, path="/api/auth")
    issue_session_cookie(response, user)
    logger.info("Login ok user=%s roles=%s", user.email, user.roles)
    return response


@router.post("/auth/logout")
async def logout(response: Response) -> dict:
    """Clear the local session cookie. Also returns the Entra logout URL so the
    SPA can end the Microsoft session too (full single sign-out)."""
    clear_session_cookie(response)
    payload: dict = {"ok": True}
    if settings.auth_mode == "entra_oidc":
        payload["entra_logout_url"] = oidc.logout_url(
            f"{settings.frontend_base_url}/login"
        )
    return payload
