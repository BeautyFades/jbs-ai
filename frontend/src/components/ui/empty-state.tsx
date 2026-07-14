import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Empty screens are an invitation to act. Compose:
 *
 *   <EmptyState>
 *     <EmptyStateIcon><Inbox /></EmptyStateIcon>
 *     <EmptyStateTitle>No alerts</EmptyStateTitle>
 *     <EmptyStateDescription>New alerts will appear here as they fire.</EmptyStateDescription>
 *     <EmptyStateAction><Button>Configure alerts</Button></EmptyStateAction>
 *   </EmptyState>
 */
function EmptyState({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-12 text-center",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-icon"
      className={cn(
        "mb-1 grid size-12 place-items-center rounded-full bg-muted text-muted-foreground [&_svg]:size-6",
        className,
      )}
      {...props}
    />
  );
}

function EmptyStateTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-title"
      className={cn("text-sm font-semibold", className)}
      {...props}
    />
  );
}

function EmptyStateDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-description"
      className={cn("max-w-sm text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function EmptyStateAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-action"
      className={cn("mt-3 flex items-center gap-2", className)}
      {...props}
    />
  );
}

export {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
};
