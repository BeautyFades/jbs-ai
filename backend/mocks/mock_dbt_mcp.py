"""Mock dbt MCP server (stdio). Mirrors the discovery tools of the official
dbt-mcp server (list_models / get_model_details) over a hardcoded catalog that
matches the tables served by the mock Snowflake MCP server."""

import json

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("mock-dbt")

MODELS = {
    "dim_plants": {
        "name": "dim_plants",
        "description": "Dimension of JBS processing plants: location and primary protein.",
        "database": "ANALYTICS",
        "schema": "MARTS",
        "relation": "ANALYTICS.MARTS.DIM_PLANTS",
        "materialization": "table",
        "columns": {
            "plant_id": "integer — surrogate key",
            "plant_name": "varchar — plant display name",
            "country": "varchar — plant country (USA, Brazil, UK, Australia)",
            "region": "varchar — macro region",
            "protein": "varchar — primary protein processed (Beef, Pork, Poultry, Lamb)",
        },
    },
    "fct_sales_orders": {
        "name": "fct_sales_orders",
        "description": "Fact table of sales orders, one row per order. 2026 H1 data. Join to dim_plants on plant_id.",
        "database": "ANALYTICS",
        "schema": "MARTS",
        "relation": "ANALYTICS.MARTS.FCT_SALES_ORDERS",
        "materialization": "incremental",
        "columns": {
            "order_id": "integer — primary key",
            "order_date": "date",
            "plant_id": "integer — FK to dim_plants.plant_id",
            "protein": "varchar — protein sold",
            "customer_region": "varchar — destination region",
            "volume_lbs": "double — shipped volume in pounds",
            "revenue_usd": "double — order revenue in USD",
        },
    },
    "fct_protein_prices": {
        "name": "fct_protein_prices",
        "description": "Weekly protein spot prices (USD/lb), 2026 H1.",
        "database": "ANALYTICS",
        "schema": "MARTS",
        "relation": "ANALYTICS.MARTS.FCT_PROTEIN_PRICES",
        "materialization": "table",
        "columns": {
            "price_date": "date — week start",
            "protein": "varchar",
            "usd_per_lb": "double — spot price",
        },
    },
}


@mcp.tool()
def list_models() -> str:
    """List all dbt models in the production environment with their descriptions.
    Use this first to discover what data is available."""
    summary = [
        {"name": m["name"], "description": m["description"], "relation": m["relation"]}
        for m in MODELS.values()
    ]
    return json.dumps(summary, indent=2)


@mcp.tool()
def get_model_details(model_name: str) -> str:
    """Get full details for a dbt model: columns, types/descriptions, and the
    fully-qualified Snowflake relation to query. Call before writing SQL."""
    model = MODELS.get(model_name.lower())
    if model is None:
        return json.dumps(
            {"error": f"Unknown model '{model_name}'. Known: {list(MODELS)}"}
        )
    return json.dumps(model, indent=2)


if __name__ == "__main__":
    mcp.run(transport="stdio")
