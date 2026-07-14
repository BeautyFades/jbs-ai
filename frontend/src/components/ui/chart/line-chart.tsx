import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

import { cartesianOptions } from "@/components/ui/chart/chart-options";
import "@/components/ui/chart/chart-setup";
import { useChartTheme } from "@/components/ui/chart/chart-theme";
import {
  categoricalColor,
  resolveChartColor,
  withAlpha,
} from "@/components/ui/chart/chart-utils";
import type { ChartSeries } from "@/components/ui/chart/bar-chart";
import { cn } from "@/lib/utils";

/**
 * Line chart. Pass `area` to fill under the line (still one y-axis, thin
 * 2px stroke, translucent fill so overlapping series stay legible).
 *
 *   <LineChart labels={days} series={[{ label: "Fill rate", data }]} area />
 */
function LineChart({
  labels,
  series,
  height = 280,
  yLabel,
  area = false,
  className,
}: {
  labels: string[];
  series: ChartSeries[];
  height?: number;
  yLabel?: string;
  area?: boolean;
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
        borderColor: color,
        backgroundColor: area ? withAlpha(color, 0.15) : color,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: color,
        pointBorderColor: theme.surface,
        pointBorderWidth: 1.5,
        tension: 0.3,
        fill: area ? "origin" : false,
      };
    }),
  };
  const options = cartesianOptions(theme, {
    legend: series.length > 1,
    yLabel,
  }) as unknown as ChartOptions<"line">;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <Line key={theme.mode} data={data} options={options} />
    </div>
  );
}

export { LineChart };
