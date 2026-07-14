import type { ChartOptions } from "chart.js";
import { Radar } from "react-chartjs-2";

import { radialOptions } from "@/components/ui/chart/chart-options";
import "@/components/ui/chart/chart-setup";
import { useChartTheme } from "@/components/ui/chart/chart-theme";
import { categoricalColor, withAlpha } from "@/components/ui/chart/chart-utils";
import type { ChartSeries } from "@/components/ui/chart/bar-chart";
import { cn } from "@/lib/utils";

/**
 * Radar chart for comparing a handful of series across shared
 * dimensions (e.g. plants scored on fill rate / quality / on-time).
 * Best for ≤3 overlapping series — more than that reads as a knot.
 */
function RadarChart({
  labels,
  series,
  height = 280,
  className,
}: {
  labels: string[];
  series: ChartSeries[];
  height?: number;
  className?: string;
}) {
  const theme = useChartTheme();
  const data = {
    labels,
    datasets: series.map((s, i) => {
      const color = s.color ?? categoricalColor(theme, i);
      return {
        label: s.label,
        data: s.data,
        borderColor: color,
        backgroundColor: withAlpha(color, 0.15),
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: color,
      };
    }),
  };
  const options = {
    ...radialOptions(theme, { legend: series.length > 1 }),
    scales: {
      r: {
        ticks: { display: false },
        grid: { color: theme.grid },
        angleLines: { color: theme.grid },
        pointLabels: { color: theme.inkMuted, font: { size: 11 } },
      },
    },
  } as unknown as ChartOptions<"radar">;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <Radar key={theme.mode} data={data} options={options} />
    </div>
  );
}

export { RadarChart };
