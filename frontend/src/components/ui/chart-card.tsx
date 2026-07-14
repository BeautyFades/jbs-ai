import type * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Explicit variant of Card for chart panels: title, subtitle, an action
 * slot (e.g. a range picker or an overflow menu), content that will hold
 * the chart, and a footer for source/refresh notes.
 *
 *   <ChartCard>
 *     <ChartCardHeader>
 *       <div>
 *         <ChartCardTitle>Weekly volume</ChartCardTitle>
 *         <ChartCardSubtitle>Cases shipped per plant</ChartCardSubtitle>
 *       </div>
 *       <ChartCardAction>…menu/toolbar…</ChartCardAction>
 *     </ChartCardHeader>
 *     <ChartCardContent>…chart…</ChartCardContent>
 *     <ChartCardFooter>Source: Snowflake · refreshed 5m ago</ChartCardFooter>
 *   </ChartCard>
 */
function ChartCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return <Card data-slot="chart-card" className={cn("gap-3", className)} {...props} />;
}

function ChartCardHeader({
  className,
  ...props
}: React.ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader
      data-slot="chart-card-header"
      className={cn("flex-row items-start justify-between gap-2", className)}
      {...props}
    />
  );
}

const ChartCardTitle = CardTitle;
const ChartCardSubtitle = CardDescription;

function ChartCardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chart-card-action"
      className={cn("flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  );
}

function ChartCardContent({
  className,
  ...props
}: React.ComponentProps<typeof CardContent>) {
  return (
    <CardContent
      data-slot="chart-card-content"
      className={cn("min-h-48", className)}
      {...props}
    />
  );
}

function ChartCardFooter({
  className,
  ...props
}: React.ComponentProps<typeof CardFooter>) {
  return (
    <CardFooter
      data-slot="chart-card-footer"
      className={cn(
        "justify-between gap-2 border-t pt-3 text-xs text-muted-foreground [.border-t]:pt-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  ChartCard,
  ChartCardAction,
  ChartCardContent,
  ChartCardFooter,
  ChartCardHeader,
  ChartCardSubtitle,
  ChartCardTitle,
};
