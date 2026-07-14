import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Compound KPI card. Compose exactly the pieces a metric needs:
 *
 *   <KpiCard>
 *     <KpiCardHeader>
 *       <KpiCardLabel>Orders shipped</KpiCardLabel>
 *       <KpiCardIcon><Truck /></KpiCardIcon>
 *     </KpiCardHeader>
 *     <KpiCardValue>12,480</KpiCardValue>
 *     <KpiCardDelta trend="up">+4.2% vs last week</KpiCardDelta>
 *   </KpiCard>
 *
 * `trend` is about direction; `sentiment` says whether that direction is
 * good — they're independent (e.g. costs going up is trend="up",
 * sentiment="bad").
 */
function KpiCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kpi-card"
      className={cn(
        "flex flex-col gap-1.5 rounded-xl border bg-card p-4 text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function KpiCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kpi-card-header"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

function KpiCardLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kpi-card-label"
      className={cn(
        "text-xs font-medium tracking-wide text-muted-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

function KpiCardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kpi-card-icon"
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function KpiCardValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kpi-card-value"
      className={cn("text-2xl font-bold tracking-tight tabular-nums", className)}
      {...props}
    />
  );
}

const TREND_ICON = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: Minus,
} as const;

function KpiCardDelta({
  className,
  trend = "flat",
  sentiment = "neutral",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  trend?: keyof typeof TREND_ICON;
  sentiment?: "good" | "bad" | "neutral";
}) {
  const Icon = TREND_ICON[trend];
  return (
    <div
      data-slot="kpi-card-delta"
      className={cn(
        "flex items-center gap-1 text-xs font-medium tabular-nums",
        sentiment === "good" && "text-success",
        sentiment === "bad" && "text-destructive",
        sentiment === "neutral" && "text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Icon className="size-3.5" />
      {children}
    </div>
  );
}

function KpiCardFootnote({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kpi-card-footnote"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  KpiCard,
  KpiCardDelta,
  KpiCardFootnote,
  KpiCardHeader,
  KpiCardIcon,
  KpiCardLabel,
  KpiCardValue,
};
