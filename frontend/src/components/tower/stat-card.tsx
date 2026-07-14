import { cn } from "@/lib/utils";
import type { Kpi } from "@/towers";

/** KPI stat card in the style of the Pilgrim's control tower trend cards. */
export function StatCard({ kpi }: { kpi: Kpi }) {
  const delta = kpi.delta ?? null;
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {kpi.label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-tower-accent">{kpi.value}</span>
        {kpi.unit && <span className="text-sm text-muted-foreground">{kpi.unit}</span>}
      </div>
      {delta !== null && (
        <div
          className={cn(
            "mt-1 text-xs font-medium",
            delta >= 0 ? "text-kpi-good" : "text-kpi-bad",
          )}
        >
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}% vs prior period
        </div>
      )}
    </div>
  );
}
