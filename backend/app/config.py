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
    # "dev" injects a local user with the roles below; "entra" requires Azure
    # EasyAuth headers (X-MS-CLIENT-PRINCIPAL) and rejects anonymous requests.
    auth_mode: Literal["dev", "entra"] = "dev"
    dev_user_email: str = "dev@jbs.com.br"
    dev_user_name: str = "Dev User"
    dev_user_roles: list[str] = ["admin"]

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
