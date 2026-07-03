"""Smoke test: start the MCP host and exercise the dbt metadata -> SQL -> data
flow without Claude. Run: uv run python scripts/smoke_mcp.py"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from app.config import settings  # noqa: E402
from app.mcp_host import MCPHost  # noqa: E402


async def main() -> None:
    host = MCPHost()
    await host.start(settings.mcp_servers())
    try:
        print("tools:", [t["name"] for t in host.tools])

        out, err = await host.call_tool("dbt__list_models", {})
        print("\n-- dbt__list_models (error=%s) --\n%s" % (err, out[:400]))

        out, err = await host.call_tool(
            "dbt__get_model_details", {"model_name": "fct_sales_orders"}
        )
        print("\n-- dbt__get_model_details (error=%s) --\n%s" % (err, out[:400]))

        sql = (
            "SELECT p.protein, ROUND(SUM(o.revenue_usd)/1e6, 2) AS revenue_musd "
            "FROM ANALYTICS.MARTS.FCT_SALES_ORDERS o "
            "JOIN ANALYTICS.MARTS.DIM_PLANTS p ON o.plant_id = p.plant_id "
            "GROUP BY 1 ORDER BY 2 DESC"
        )
        out, err = await host.call_tool("snowflake__run_query", {"query": sql})
        print("\n-- snowflake__run_query (error=%s) --\n%s" % (err, out))
    finally:
        await host.stop()


if __name__ == "__main__":
    asyncio.run(main())
