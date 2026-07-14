import sys
from pathlib import Path
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BACKEND_DIR / ".env", env_file_encoding="utf-8", extra="ignore"
    )

    llm_provider: Literal["claude", "gemini", "openai", "local"] = "claude"
    mcp_mode: Literal["mock", "real"] = "mock"

    # --- Auth ---
    # "dev"        injects a local user with the roles below (no login).
    # "entra"      trusts Azure EasyAuth headers (X-MS-CLIENT-PRINCIPAL) —
    #              only valid when the app sits behind App Service auth.
    # "entra_oidc" self-hosted OAuth2 auth-code flow against Entra ID (BFF
    #              pattern): the backend exchanges the code and issues a
    #              signed httpOnly session cookie; no tokens reach the SPA.
    auth_mode: Literal["dev", "entra", "entra_oidc"] = "dev"
    dev_user_email: str = "dev@jbs.com.br"
    dev_user_name: str = "Dev User"
    dev_user_roles: list[str] = ["admin"]

    # Entra ID app registration (entra_oidc mode).
    entra_tenant_id: str = ""
    entra_client_id: str = ""
    entra_client_secret: str = ""
    # Must be registered as a Web redirect URI on the app registration.
    entra_redirect_uri: str = "http://localhost:8000/api/auth/callback"
    # SPA origin to land on after login/logout. In dev the SPA and API run on
    # different ports; in production they share an origin and this can be "".
    frontend_base_url: str = "http://localhost:5173"

    # Session cookie signing key — REQUIRED in entra_oidc mode. Rotating it
    # invalidates every active session.
    session_secret: str = ""
    session_cookie_name: str = "jbs_session"
    session_max_age_seconds: int = 8 * 3600  # one working day
    # Set true when serving over HTTPS (always, outside local dev).
    session_cookie_secure: bool = False

    @property
    def entra_authority(self) -> str:
        return f"https://login.microsoftonline.com/{self.entra_tenant_id}"

    # --- Operational database (PostgreSQL) ---
    # Points at the bundled compose Postgres by default; override DATABASE_URL
    # per environment. Async driver (asyncpg) is required.
    database_url: str = "postgresql+asyncpg://jbs:jbs@localhost:5432/jbs_ai"
    # Create tables from ORM metadata on startup (dev/test). Turn OFF in
    # environments where Alembic migrations own the schema.
    db_create_all: bool = True

    # Comma-separated allowed CORS origins (frontend dev server by default).
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    # Claude
    anthropic_model: str = "claude-opus-4-8"
    # Read from .env/settings and injected into the client, so the key does
    # not have to be exported into the OS environment separately.
    anthropic_api_key: str = ""

    # Gemini (Google AI Studio key by default; set GOOGLE_GENAI_USE_VERTEXAI=true
    # + GOOGLE_CLOUD_PROJECT/GOOGLE_CLOUD_LOCATION env vars to use Vertex AI instead)
    gemini_model: str = "gemini-2.5-pro"
    gemini_api_key: str = ""

    # OpenAI, or any OpenAI-compatible cloud endpoint (Groq, Together, ...)
    openai_model: str = "gpt-4o"
    openai_base_url: str = ""
    openai_api_key: str = ""

    # Local model server speaking the OpenAI-compatible API — defaults to
    # Ollama; also works for LM Studio, vLLM, llama.cpp's server, etc.
    local_model: str = "llama3.1"
    local_base_url: str = "http://localhost:11434/v1"
    local_api_key: str = "ollama"

    # dbt MCP (real mode)
    dbt_host: str = "cloud.getdbt.com"
    dbt_prod_env_id: str = ""
    dbt_token: str = ""
    dbt_project_dir: str = ""
    dbt_path: str = "dbt"

    # Snowflake MCP (real mode)
    snowflake_mcp_config: str = ""
    snowflake_connection_name: str = "default"

    # --- Snowflake row-level security ---
    # App role -> Snowflake functional role. Queries for a user run under the
    # most-privileged Snowflake role their app roles map to; Snowflake's
    # grants + row access policies do the actual enforcement. JSON in env,
    # e.g. SNOWFLAKE_ROLE_MAP='{"admin":"CT_ADMIN","sales.user":"CT_SALES"}'
    snowflake_role_map: dict[str, str] = {
        "admin": "CT_ADMIN_R",
        "live.user": "CT_LIVE_R",
        "plant.user": "CT_PLANT_R",
        "sales.user": "CT_SALES_R",
    }
    # Hard cap on rows returned to the SPA per query.
    query_max_rows: int = 10_000

    def mcp_servers(self) -> dict[str, dict]:
        """Server name -> stdio launch spec. Names become tool prefixes."""
        if self.mcp_mode == "mock":
            mocks = BACKEND_DIR / "mocks"
            return {
                "dbt": {
                    "command": sys.executable,
                    "args": [str(mocks / "mock_dbt_mcp.py")],
                    "env": None,
                },
                "snowflake": {
                    "command": sys.executable,
                    "args": [str(mocks / "mock_snowflake_mcp.py")],
                    "env": None,
                },
            }
        return {
            "dbt": {
                "command": "uvx",
                "args": ["dbt-mcp"],
                "env": {
                    "DBT_HOST": self.dbt_host,
                    "DBT_PROD_ENV_ID": self.dbt_prod_env_id,
                    "DBT_TOKEN": self.dbt_token,
                    "DBT_PROJECT_DIR": self.dbt_project_dir,
                    "DBT_PATH": self.dbt_path,
                },
            },
            "snowflake": {
                "command": "uvx",
                "args": [
                    "snowflake-labs-mcp",
                    "--service-config-file",
                    self.snowflake_mcp_config,
                    "--connection-name",
                    self.snowflake_connection_name,
                ],
                "env": None,  # snowflake connector reads SNOWFLAKE_* from the process env
            },
        }


settings = Settings()
