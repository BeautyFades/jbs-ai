"""Deterministic seed data shared by the mock dbt and Snowflake MCP servers.
Models a slice of a meat-industry analytics mart."""

import datetime as dt
import random

PLANTS = [
    # (plant_id, plant_name, country, region, protein)
    (1, "Greeley Beef", "USA", "North America", "Beef"),
    (2, "Grand Island Beef", "USA", "North America", "Beef"),
    (3, "Marshalltown Pork", "USA", "North America", "Pork"),
    (4, "Ottumwa Pork", "USA", "North America", "Pork"),
    (5, "Moy Park Craigavon", "UK", "Europe", "Poultry"),
    (6, "Seara Itajai", "Brazil", "South America", "Poultry"),
    (7, "Friboi Barretos", "Brazil", "South America", "Beef"),
    (8, "Dinmore Beef", "Australia", "Oceania", "Beef"),
    (9, "Bordertown Lamb", "Australia", "Oceania", "Lamb"),
    (10, "Pilgrim's Mount Pleasant", "USA", "North America", "Poultry"),
]

CUSTOMER_REGIONS = ["North America", "South America", "Europe", "Asia", "Oceania"]

BASE_PRICE_PER_LB = {"Beef": 3.10, "Pork": 1.45, "Poultry": 1.10, "Lamb": 4.20}


def generate_orders(n: int = 600) -> list[tuple]:
    """(order_id, order_date, plant_id, protein, customer_region, volume_lbs, revenue_usd)"""
    rng = random.Random(42)
    start = dt.date(2026, 1, 1)
    rows = []
    for order_id in range(1, n + 1):
        plant = rng.choice(PLANTS)
        order_date = start + dt.timedelta(days=rng.randrange(180))
        protein = plant[4]
        volume = round(rng.uniform(5_000, 80_000), 0)
        price = BASE_PRICE_PER_LB[protein] * rng.uniform(0.85, 1.25)
        rows.append(
            (
                order_id,
                order_date.isoformat(),
                plant[0],
                protein,
                rng.choice(CUSTOMER_REGIONS),
                volume,
                round(volume * price, 2),
            )
        )
    return rows


def generate_prices() -> list[tuple]:
    """(price_date, protein, usd_per_lb) — weekly spot prices for 2026 H1."""
    rng = random.Random(7)
    rows = []
    for protein, base in BASE_PRICE_PER_LB.items():
        price = base
        d = dt.date(2026, 1, 5)
        while d < dt.date(2026, 7, 1):
            price = max(0.5, price * rng.uniform(0.97, 1.035))
            rows.append((d.isoformat(), protein, round(price, 4)))
            d += dt.timedelta(days=7)
    return rows
