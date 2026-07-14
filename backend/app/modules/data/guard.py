"""Read-only SQL guard for the /api/data/query endpoint.

Defense in depth only — the real enforcement lives in Snowflake: the role a
query runs under must hold SELECT-only grants, and row access policies decide
which rows that role can see. This guard just refuses obviously-mutating SQL
before it ever leaves the app, so a bug (or a prompt-injected agent) can't
turn the query endpoint into a write path.
"""

from __future__ import annotations

import re

ALLOWED_LEADING_KEYWORDS = {"select", "with", "show", "describe", "desc", "explain"}

# Statement-level keywords that indicate mutation or session tampering. Session
# tampering matters because RLS context (role, session tags) is set by the app;
# user SQL must not be able to override it.
FORBIDDEN_KEYWORDS = re.compile(
    r"\b(insert|update|delete|merge|truncate|create|drop|alter|grant|revoke"
    r"|call|copy|put|remove|undrop|use|set|unset|execute|begin|commit|rollback)\b",
    re.IGNORECASE,
)

_LINE_COMMENT = re.compile(r"--[^\n]*|//[^\n]*")
_BLOCK_COMMENT = re.compile(r"/\*.*?\*/", re.DOTALL)
_STRING_LITERAL = re.compile(r"'(?:[^']|'')*'")


class UnsafeSqlError(ValueError):
    pass


def assert_read_only(sql: str) -> None:
    """Raise UnsafeSqlError unless sql is a single read-only statement."""
    stripped = _BLOCK_COMMENT.sub(" ", _LINE_COMMENT.sub(" ", sql)).strip()
    if not stripped:
        raise UnsafeSqlError("Empty query")

    # One statement per request: no piggybacking a second statement after ';'.
    if stripped.rstrip(";").count(";") > 0:
        raise UnsafeSqlError("Multiple statements are not allowed")

    leading = stripped.split(None, 1)[0].lower()
    if leading not in ALLOWED_LEADING_KEYWORDS:
        raise UnsafeSqlError(f"Only read statements are allowed (got '{leading}')")

    # Scan with string literals blanked so 'DROP' inside a value doesn't trip it.
    scannable = _STRING_LITERAL.sub("''", stripped)
    match = FORBIDDEN_KEYWORDS.search(scannable)
    if match:
        raise UnsafeSqlError(f"Forbidden keyword in query: {match.group(0).upper()}")
