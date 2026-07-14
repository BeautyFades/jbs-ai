import type { ChartOptions } from "chart.js";

import type { ChartTheme } from "@/components/ui/chart/chart-theme";

const legendLabels = (theme: ChartTheme) => ({
  color: theme.ink,
  usePointStyle: true,
  boxHeight: 8,
  boxWidth: 8,
  padding: 16,
  font: { size: 12 },
});

const tooltipBase = (theme: ChartTheme) => ({
  backgroundColor: theme.popoverSurface,
  titleColor: theme.popoverInk,
  bodyColor: theme.popoverInk,
  borderColor: theme.grid,
  borderWidth: 1,
  padding: 10,
  cornerRadius: 6,
  boxPadding: 4,
  usePointStyle: true,
});

/**
 * Shared options for cartesian charts (bar/line/scatter/area): a single
 * y-axis only — never a second — recessive gridlines, an always-visible
 * legend for 2+ series (pass `legend: false` for a lone series; the
 * title names it instead), and an index-mode hover with a crosshair.
 */
function cartesianOptions(
  theme: ChartTheme,
  {
    legend = true,
    yLabel,
    stacked = false,
  }: { legend?: boolean; yLabel?: string; stacked?: boolean } = {},
): ChartOptions<"bar" | "line"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: legend, position: "bottom", labels: legendLabels(theme) },
      tooltip: tooltipBase(theme),
      crosshair: { color: theme.grid },
    } as ChartOptions<"bar" | "line">["plugins"],
    scales: {
      x: {
        stacked,
        ticks: { color: theme.inkMuted, maxRotation: 0, autoSkip: true },
        grid: { display: false },
        border: { color: theme.grid },
      },
      y: {
        stacked,
        beginAtZero: true,
        ticks: { color: theme.inkMuted },
        grid: { color: theme.grid },
        border: { display: false },
        title: yLabel
          ? { display: true, text: yLabel, color: theme.inkMuted }
          : { display: false },
      },
    },
  };
}

/** Shared options for radial charts (pie/doughnut/radar). */
function radialOptions(
  theme: ChartTheme,
  { legend = true }: { legend?: boolean } = {},
): ChartOptions<"pie" | "doughnut" | "radar"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: legend, position: "bottom", labels: legendLabels(theme) },
      tooltip: tooltipBase(theme),
    },
  };
}

export { cartesianOptions, radialOptions };
