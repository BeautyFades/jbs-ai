"""Unit tests for the auth session cookie, SQL guard, and RLS role mapping."""

from __future__ import annotations

import pytest

from app.config import settings
from app.modules.auth.router import _safe_redirect
from app.modules.auth.schemas import CurrentUser
from app.modules.data.guard import UnsafeSqlError, assert_read_only
from app.modules.data.service import NoWarehouseAccessError, snowflake_role_for


def _user(roles: list[str]) -> CurrentUser:
    return CurrentUser(id="u1", email="exec@jbs.com.br", name="Exec", roles=roles)


# --- SQL guard -------------------------------------------------------------


@pytest.mark.parametrize(
    "sql",
    [
        "SELECT * FROM marts.fct_sales_orders",
        "with t as (select 1) select * from t",
        "SHOW TABLES",
        "DESCRIBE TABLE marts.dim_plants",
        "EXPLAIN SELECT 1",
        "SELECT 1;",  # trailing semicolon ok
        "-- comment\nSELECT 1",
        "SELECT 'drop table users' AS note",  # forbidden word inside a literal
        "SELECT * FROM t; -- trailing comment",  # one statement + comment
    ],
)
def test_guard_allows_read_statements(sql: str):
    assert_read_only(sql)


@pytest.mark.parametrize(
    "sql",
    [
        "DROP TABLE marts.fct_sales_orders",
        "DELETE FROM marts.fct_sales_orders",
        "INSERT INTO t VALUES (1)",
        "SELECT 1; DROP TABLE t",  # piggybacked second statement
        "USE ROLE ACCOUNTADMIN",
        "SET my_var = 'x'",  # session tampering
        "select 1; delete from t",
        "/* hidden */ TRUNCATE TABLE t",
        "",
        "   ",
    ],
)
def test_guard_rejects_unsafe_statements(sql: str):
    with pytest.raises(UnsafeSqlError):
        assert_read_only(sql)


# --- Snowflake role mapping -------------------------------------------------


def test_admin_maps_to_admin_role():
    assert snowflake_role_for(_user(["admin", "sales.user"])) == "CT_ADMIN_R"


def test_single_role_maps():
    assert snowflake_role_for(_user(["sales.user"])) == "CT_SALES_R"


def test_unmapped_roles_are_denied():
    with pytest.raises(NoWarehouseAccessError):
        snowflake_role_for(_user(["some.other.role"]))


def test_no_roles_denied():
    with pytest.raises(NoWarehouseAccessError):
        snowflake_role_for(_user([]))


# --- Session cookie roundtrip ------------------------------------------------


def test_session_cookie_roundtrip(monkeypatch):
    monkeypatch.setattr(settings, "session_secret", "test-secret")
    from app.modules.auth import session as session_mod

    class FakeResponse:
        def __init__(self):
            self.cookies: dict = {}

        def set_cookie(self, key, value, **kwargs):
            self.cookies[key] = (value, kwargs)

    class FakeRequest:
        def __init__(self, cookies):
            self.cookies = cookies

    response = FakeResponse()
    session_mod.issue_session_cookie(response, _user(["sales.user"]))
    token, kwargs = response.cookies[settings.session_cookie_name]
    assert kwargs["httponly"] is True
    assert kwargs["samesite"] == "lax"

    payload = session_mod.read_session(
        FakeRequest({settings.session_cookie_name: token})
    )
    assert payload is not None
    assert payload["email"] == "exec@jbs.com.br"
    assert payload["roles"] == ["sales.user"]


def test_tampered_session_rejected(monkeypatch):
    monkeypatch.setattr(settings, "session_secret", "test-secret")
    from app.modules.auth import session as session_mod

    class FakeRequest:
        def __init__(self, cookies):
            self.cookies = cookies

    assert (
        session_mod.read_session(
            FakeRequest({settings.session_cookie_name: "forged.token.value"})
        )
        is None
    )


# --- Open-redirect protection -------------------------------------------------


@pytest.mark.parametrize(
    ("target", "expected"),
    [
        ("/sales", "/sales"),
        ("/", "/"),
        ("//evil.com", "/"),
        ("https://evil.com", "/"),
        ("javascript:alert(1)", "/"),
    ],
)
def test_safe_redirect(target: str, expected: str):
    assert _safe_redirect(target) == expected
