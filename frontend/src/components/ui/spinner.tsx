import { Loader2 } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

/** Inline loading indicator. Drop into buttons, cards, or full-page centers. */
function Spinner({ className, ...props }: React.ComponentProps<typeof Loader2>) {
  return (
    <Loader2
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
