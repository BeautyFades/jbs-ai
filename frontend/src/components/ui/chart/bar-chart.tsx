import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

import { cartesianOptions } from "@/components/ui/chart/chart-options";
import "@/components/ui/chart/chart-setup";
import { useChartTheme } from "@/components/ui/chart/chart-theme";
import {
  categoricalColor,
  resolveChartColor,
  type ChartColor,
} from "@/components/ui/chart/chart-utils";
import { cn } from "@/lib/utils";

export interface ChartSeries {
  label: string;
  data: number[];
  /** Override the automatic categorical color: a semantic token
   * (`"destructive"`, `"success"`, `"chart-3"`, …) or any literal CSS
   * color. Reach for this when the series carries status meaning or a
   * fixed brand identity — not to freestyle a palette. Never `var(--x)`;
   * it doesn't resolve on canvas. */
  color?: ChartColor;
}

/**
 * Grouped or stacked bar chart. One y-axis; for a second measure at a
 * different scale, render a second BarChart rather than a dual axis.
 *
 *   <BarChart labels={weeks} series={[{ label: "Cases", data }]} />
 */
function BarChart({
  labels,
  series,
  height = 280,
  yLabel,
  stacked = false,
  className,
}: {
  labels: string[];
  series: ChartSeries[];
  height?: number;
  yLabel?: string;
  stacked?: boolean;
  className?: string;
}) {
  const theme = useChartTheme();
  const data = {
    labels,
    datasets: series.map((s, i) => {
      const color = s.color
        ? resolveChartColor(theme, s.color)
        : categoricalColor(theme, i);
      return {
        label: s.label,
        data: s.data,
        backgroundColor: color,
        borderColor: theme.surface,
        borderWidth: stacked ? 2 : 0,
        borderRadius: 4,
        borderSkipped: false,
        maxBarThickness: 28,
        categoryPercentage: 0.7,
        barPercentage: 0.9,
      };
    }),
  };
  const options = cartesianOptions(theme, {
    legend: series.length > 1,
    yLabel,
    stacked,
  }) as ChartOptions<"bar">;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <Bar key={theme.mode} data={data} options={options} />
    </div>
  );
}

export { BarChart };
