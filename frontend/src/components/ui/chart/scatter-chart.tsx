import type { ChartOptions } from "chart.js";
import { Scatter } from "react-chartjs-2";

import { cartesianOptions } from "@/components/ui/chart/chart-options";
import "@/components/ui/chart/chart-setup";
import { useChartTheme } from "@/components/ui/chart/chart-theme";
import { categoricalColor } from "@/components/ui/chart/chart-utils";
import { cn } from "@/lib/utils";

export interface ScatterSeries {
  label: string;
  data: { x: number; y: number }[];
  color?: string;
}

/** Scatter chart for correlating two measures across points (no line). */
function ScatterChart({
  series,
  height = 280,
  xLabel,
  yLabel,
  className,
}: {
  series: ScatterSeries[];
  height?: number;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}) {
  const theme = useChartTheme();
  const data = {
    datasets: series.map((s, i) => {
      const color = s.color ?? categoricalColor(theme, i);
      return {
        label: s.label,
        data: s.data,
        backgroundColor: color,
        borderColor: theme.surface,
        borderWidth: 1,
        pointRadius: 5,
        pointHoverRadius: 7,
        showLine: false,
      };
    }),
  };
  const { plugins } = cartesianOptions(theme, { legend: series.length > 1, yLabel });
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins,
    interaction: { mode: "nearest" as const, intersect: true },
    scales: {
      x: {
        type: "linear" as const,
        ticks: { color: theme.inkMuted },
        grid: { color: theme.grid },
        border: { color: theme.grid },
        title: xLabel
          ? { display: true, text: xLabel, color: theme.inkMuted }
          : { display: false },
      },
      y: {
        ticks: { color: theme.inkMuted },
        grid: { color: theme.grid },
        border: { display: false },
        title: yLabel
          ? { display: true, text: yLabel, color: theme.inkMuted }
          : { display: false },
      },
    },
  } as unknown as ChartOptions<"scatter">;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <Scatter key={theme.mode} data={data} options={options} />
    </div>
  );
}

export { ScatterChart };
