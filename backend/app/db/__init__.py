"""Operational database layer (PostgreSQL).

This is the app's *operational* store — auth, conversations, tasks, alerts,
usage/audit — deliberately separate from Snowflake, which remains the
analytical system of record. See docs/ARCHITECTURE.md.
"""

from .base import Base
from .session import SessionLocal, engine, get_session

__all__ = ["Base", "SessionLocal", "engine", "get_session"]
