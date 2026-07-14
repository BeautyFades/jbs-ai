import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import type { TowerDefinition } from "@/towers";
import { towerSummaryQuery } from "@/towers/api";

import { StatCard } from "./stat-card";

/** KPI header block shared by every tower's overview tab. */
export function TowerOverview({
  tower,
  children,
}: {
  tower: TowerDefinition;
  children?: ReactNode;
}) {
  const { data, isPending, isError } = useQuery(towerSummaryQuery(tower.id));

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-semibold">Key indicators</h2>
        {data && (
          <Badge variant="secondary">
            {data.source === "snowflake" ? "live data" : "placeholder data"}
          </Badge>
        )}
      </div>
      {isPending && (
        <div className="text-sm text-muted-foreground">Loading indicators…</div>
      )}
      {isError && (
        <div className="text-sm text-kpi-bad">
          Could not load indicators. Is the backend running?
        </div>
      )}
      {data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.kpis.map((kpi) => (
            <StatCard key={kpi.label} kpi={kpi} />
          ))}
        </div>
      )}
      {children && <div className="mt-8 grid gap-4 md:grid-cols-2">{children}</div>}
    </main>
  );
}
