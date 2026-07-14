"""Signed-cookie session for entra_oidc mode.

The BFF pattern: after the backend completes the OAuth code exchange, the
browser gets a signed httpOnly cookie carrying the user's identity claims.
Access/refresh tokens from Entra never leave the backend (and are not stored
at all — we only need identity + roles, not downstream API access yet).

Stateless by design: signature + max_age gate validity, so there is no session
table to manage. Trade-off: sign-out only clears the cookie; a stolen cookie
stays valid until it expires. If instant revocation becomes a requirement,
swap the payload for a session id looked up in Postgres/Redis.
"""

from __future__ import annotations

from fastapi import Request, Response
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

from ...config import settings
from .schemas import CurrentUser

_SALT = "jbs-ai-session"


def _serializer() -> URLSafeTimedSerializer:
    if not settings.session_secret:
        raise RuntimeError("SESSION_SECRET must be set in entra_oidc mode")
    return URLSafeTimedSerializer(settings.session_secret, salt=_SALT)


def issue_session_cookie(response: Response, user: CurrentUser) -> None:
    # towers is derived from roles on every request, so persist only identity.
    token = _serializer().dumps(
        {"id": user.id, "email": user.email, "name": user.name, "roles": user.roles}
    )
    response.set_cookie(
        key=settings.session_cookie_name,
        value=token,
        max_age=settings.session_max_age_seconds,
        httponly=True,
        secure=settings.session_cookie_secure,
        samesite="lax",
        path="/",
    )


def clear_session_cookie(response: Response) -> None:
    response.delete_cookie(key=settings.session_cookie_name, path="/")


def read_session(request: Request) -> dict | None:
    """Return the verified session payload, or None if absent/invalid/expired."""
    token = request.cookies.get(settings.session_cookie_name)
    if not token:
        return None
    try:
        return _serializer().loads(token, max_age=settings.session_max_age_seconds)
    except (SignatureExpired, BadSignature):
        return None
