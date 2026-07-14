import type { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { radialOptions } from "@/components/ui/chart/chart-options";
import "@/components/ui/chart/chart-setup";
import { useChartTheme } from "@/components/ui/chart/chart-theme";
import {
  categoricalColor,
  resolveChartColor,
  type ChartColor,
} from "@/components/ui/chart/chart-utils";
import { cn } from "@/lib/utils";

/**
 * Doughnut chart — same composition use case as Pie, with a center hole
 * that leaves room for a total or headline figure via `centerLabel`.
 */
function DoughnutChart({
  labels,
  data,
  colors,
  centerLabel,
  height = 280,
  className,
}: {
  labels: string[];
  data: number[];
  /** Per-slice override (parallel to `labels`) — semantic tokens or
   * literal CSS colors; sparse entries fall back to the categorical slot. */
  colors?: (ChartColor | undefined)[];
  centerLabel?: React.ReactNode;
  height?: number;
  className?: string;
}) {
  const theme = useChartTheme();
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map((_, i) => {
          const override = colors?.[i];
          return override
            ? resolveChartColor(theme, override)
            : categoricalColor(theme, i);
        }),
        borderColor: theme.surface,
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };
  const options = {
    ...radialOptions(theme, { legend: true }),
    cutout: "65%",
  } as unknown as ChartOptions<"doughnut">;

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      <Doughnut key={theme.mode} data={chartData} options={options} />
      {centerLabel && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-8">
          {centerLabel}
        </div>
      )}
    </div>
  );
}

export { DoughnutChart };
