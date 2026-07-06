"""Host-level tools handled by the backend (not MCP). These are merged into the
agent's tool list alongside dbt/Snowflake MCP tools."""

from __future__ import annotations

from typing import Any

HOST_TOOLS: list[dict[str, Any]] = [
    {
        "name": "render_chart",
        "description": (
            "Render an interactive Chart.js chart in the chat UI. Use when the user "
            "asks for a chart/graph/plot, or when a visual trend or comparison clearly "
            "helps the answer. Pass query results as labels + dataset values."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "description": "Short chart title shown above the chart.",
                },
                "type": {
                    "type": "string",
                    "enum": ["line", "bar", "pie", "doughnut", "scatter"],
                    "description": "Chart.js chart type.",
                },
                "labels": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Category labels (x-axis for line/bar, slice names for pie).",
                },
                "datasets": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "label": {"type": "string"},
                            "data": {
                                "type": "array",
                                "items": {"type": "number"},
                            },
                        },
                        "required": ["label", "data"],
                    },
                    "description": "One or more data series.",
                },
                "y_axis_label": {
                    "type": "string",
                    "description": "Y-axis title for line/bar/scatter charts.",
                },
            },
            "required": ["type", "labels", "datasets"],
        },
    }
]

_CHART_TYPES = {"line", "bar", "pie", "doughnut", "scatter"}
_PALETTE = [
    "rgb(211, 63, 46)",
    "rgb(127, 180, 230)",
    "rgb(224, 163, 58)",
    "rgb(111, 207, 151)",
    "rgb(180, 130, 220)",
]


def is_host_tool(name: str) -> bool:
    return name == "render_chart"


def _chart_colors(index: int) -> dict[str, str]:
    color = _PALETTE[index % len(_PALETTE)]
    rgba = color.replace("rgb(", "rgba(").replace(")", ", 0.35)")
    return {"borderColor": color, "backgroundColor": rgba}


def handle_host_tool(name: str, arguments: dict[str, Any]) -> tuple[str, bool, dict[str, Any] | None]:
    """Returns (tool_result_text, is_error, optional_chart_event_payload)."""
    if name != "render_chart":
        return f"Unknown host tool '{name}'", True, None

    chart_type = arguments.get("type")
    labels = arguments.get("labels")
    datasets = arguments.get("datasets")

    if chart_type not in _CHART_TYPES:
        return f"Invalid chart type '{chart_type}'", True, None
    if not isinstance(labels, list) or not labels:
        return "labels must be a non-empty array of strings", True, None
    if not isinstance(datasets, list) or not datasets:
        return "datasets must be a non-empty array", True, None

    normalized_datasets: list[dict[str, Any]] = []
    for i, ds in enumerate(datasets):
        if not isinstance(ds, dict):
            return f"datasets[{i}] must be an object", True, None
        label = ds.get("label")
        data = ds.get("data")
        if not isinstance(label, str) or not label:
            return f"datasets[{i}].label must be a non-empty string", True, None
        if not isinstance(data, list) or not data:
            return f"datasets[{i}].data must be a non-empty array of numbers", True, None
        try:
            values = [float(v) for v in data]
        except (TypeError, ValueError):
            return f"datasets[{i}].data must contain numbers", True, None
        if len(values) != len(labels) and chart_type not in ("pie", "doughnut"):
            return (
                f"datasets[{i}].data length ({len(values)}) must match "
                f"labels length ({len(labels)})",
                True,
                None,
            )

        entry: dict[str, Any] = {"label": label, "data": values}
        if chart_type == "line":
            entry.update(_chart_colors(i))
            entry["fill"] = False
            entry["tension"] = 0.15
        elif chart_type == "bar":
            entry.update(_chart_colors(i))
        elif chart_type in ("pie", "doughnut"):
            entry["backgroundColor"] = [_PALETTE[j % len(_PALETTE)] for j in range(len(values))]
            entry["borderColor"] = "rgb(16, 20, 24)"
            entry["borderWidth"] = 1
        elif chart_type == "scatter":
            entry.update(_chart_colors(i))
        normalized_datasets.append(entry)

    title = arguments.get("title")
    y_axis_label = arguments.get("y_axis_label")

    chart_event = {
        "chart_type": chart_type,
        "title": title if isinstance(title, str) else None,
        "labels": [str(label) for label in labels],
        "datasets": normalized_datasets,
        "y_axis_label": y_axis_label if isinstance(y_axis_label, str) else None,
    }
    return "Chart rendered in the chat UI.", False, chart_event
