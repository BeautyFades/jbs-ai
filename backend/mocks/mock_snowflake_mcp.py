"""Mock Snowflake MCP server (stdio). Exposes run_query against an in-memory
DuckDB seeded with the tables described by the mock dbt catalog. DuckDB's SQL
dialect is close enough to Snowflake for PoC purposes."""

import json
import sys
from pathlib import Path

import duckdb
from mcp.server.fastmcp import FastMCP

sys.path.insert(0, str(Path(__file__).parent))
from sample_data import PLANTS, generate_orders, generate_prices  # noqa: E402

mcp = FastMCP("mock-snowflake")

MAX_ROWS = 200

con = duckdb.connect(":memory:")
con.execute("CREATE SCHEMA IF NOT EXISTS analytics_marts")
con.execute(
    "CREATE TABLE analytics_marts.dim_plants "
    "(plant_id INTEGER, plant_name VARCHAR, country VARCHAR, region VARCHAR, protein VARCHAR)"
)
con.executemany("INSERT INTO analytics_marts.dim_plants VALUES (?,?,?,?,?)", PLANTS)
con.execute(
    "CREATE TABLE analytics_marts.fct_sales_orders "
    "(order_id INTEGER, order_date DATE, plant_id INTEGER, protein VARCHAR, "
    "customer_region VARCHAR, volume_lbs DOUBLE, revenue_usd DOUBLE)"
)
con.executemany(
    "INSERT INTO analytics_marts.fct_sales_orders VALUES (?,?,?,?,?,?,?)",
    generate_orders(),
)
con.execute(
    "CREATE TABLE analytics_marts.fct_protein_prices "
    "(price_date DATE, protein VARCHAR, usd_per_lb DOUBLE)"
)
con.executemany(
    "INSERT INTO analytics_marts.fct_protein_prices VALUES (?,?,?)", generate_prices()
)


def _normalize(sql: str) -> str:
    # The dbt catalog advertises ANALYTICS.MARTS.<table>; map to the local schema.
    return (
        sql.replace("ANALYTICS.MARTS.", "analytics_marts.")
        .replace("analytics.marts.", "analytics_marts.")
        .replace("Analytics.Marts.", "analytics_marts.")
    )


@mcp.tool()
def run_query(query: str) -> str:
    """Execute a SQL query against Snowflake and return the result rows as JSON.
    Read-only SELECT statements only. Results are capped at 200 rows."""
    stripped = query.strip().rstrip(";").strip()
    if not stripped.lower().startswith(("select", "with", "show", "describe")):
        return json.dumps({"error": "Only read-only SELECT queries are allowed."})
    try:
        cursor = con.execute(_normalize(stripped))
        columns = [d[0] for d in cursor.description]
        rows = cursor.fetchmany(MAX_ROWS + 1)
    except Exception as exc:
        return json.dumps({"error": f"Query failed: {exc}"})

    truncated = len(rows) > MAX_ROWS
    rows = rows[:MAX_ROWS]
    payload = {
        "columns": columns,
        "rows": [[str(v) if v is not None else None for v in row] for row in rows],
        "row_count": len(rows),
        "truncated": truncated,
    }
    return json.dumps(payload, default=str)


@mcp.tool()
def list_tables() -> str:
    """List the tables available in the ANALYTICS.MARTS schema."""
    rows = con.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'analytics_marts'"
    ).fetchall()
    return json.dumps([f"ANALYTICS.MARTS.{r[0].upper()}" for r in rows])


if __name__ == "__main__":
    mcp.run(transport="stdio")
