import type { ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

import { radialOptions } from "@/components/ui/chart/chart-options";
import "@/components/ui/chart/chart-setup";
import { useChartTheme } from "@/components/ui/chart/chart-theme";
import { categoricalColor } from "@/components/ui/chart/chart-utils";
import { cn } from "@/lib/utils";

/**
 * Pie chart for part-to-whole composition of ≤8 categories. Beyond
 * that, pre-group with `groupIntoOthers` — never let the chart cycle
 * colors past the 8-hue palette.
 *
 *   <PieChart labels={plants} data={caseCounts} />
 */
function PieChart({
  labels,
  data,
  colors,
  height = 280,
  className,
}: {
  labels: string[];
  data: number[];
  /** Override automatic categorical assignment, e.g. for status-colored slices. */
  colors?: string[];
  height?: number;
  className?: string;
}) {
  const theme = useChartTheme();
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map((_, i) => colors?.[i] ?? categoricalColor(theme, i)),
        borderColor: theme.surface,
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };
  const options = radialOptions(theme, { legend: true }) as ChartOptions<"pie">;

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <Pie key={theme.mode} data={chartData} options={options} />
    </div>
  );
}

export { PieChart };
