"""Request authentication dependencies.

Every data-bearing route must depend on require_user so nothing leaks without
an identity attached. Three modes:

- dev:        no real login; a configurable local user is injected so the app
              is fully usable before Entra ID is wired up.
- entra:      expects Azure App Service EasyAuth headers
              (X-MS-CLIENT-PRINCIPAL). Requests without them are 401.
- entra_oidc: self-hosted Entra ID code flow; identity comes from the signed
              httpOnly session cookie minted by /api/auth/callback.
"""

from __future__ import annotations

import base64
import json

from fastapi import HTTPException, Request

from ...config import settings
from ..towers.registry import towers_for_roles
from .schemas import CurrentUser
from .session import read_session

PRINCIPAL_HEADER = "X-MS-CLIENT-PRINCIPAL"


def _dev_user() -> CurrentUser:
    roles = settings.dev_user_roles
    return CurrentUser(
        id="dev",
        email=settings.dev_user_email,
        name=settings.dev_user_name,
        roles=roles,
        towers=[t.id for t in towers_for_roles(roles)],
    )


def _entra_user(request: Request) -> CurrentUser:
    raw = request.headers.get(PRINCIPAL_HEADER)
    if not raw:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        principal = json.loads(base64.b64decode(raw))
        claims = {c["typ"]: c["val"] for c in principal.get("claims", [])}
        roles = [c["val"] for c in principal.get("claims", []) if c["typ"] == "roles"]
        email = claims.get(
            "preferred_username", claims.get("emails", principal.get("userId", ""))
        )
        name = claims.get("name", email)
    except (ValueError, KeyError, TypeError) as exc:
        raise HTTPException(status_code=401, detail="Invalid principal") from exc
    return CurrentUser(
        id=principal.get("userId") or email,
        email=email,
        name=name,
        roles=roles,
        towers=[t.id for t in towers_for_roles(roles)],
    )


def _session_user(request: Request) -> CurrentUser:
    payload = read_session(request)
    if payload is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    roles = payload.get("roles", [])
    return CurrentUser(
        id=payload["id"],
        email=payload["email"],
        name=payload["name"],
        roles=roles,
        # Recomputed per request so role→tower changes apply without re-login.
        towers=[t.id for t in towers_for_roles(roles)],
    )


async def require_user(request: Request) -> CurrentUser:
    if settings.auth_mode == "dev":
        return _dev_user()
    if settings.auth_mode == "entra_oidc":
        return _session_user(request)
    return _entra_user(request)
