import { ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Themed react-day-picker v9. Used directly or inside DateRangePicker. */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4 relative",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center items-center h-8",
        caption_label: "text-sm font-medium",
        nav: "absolute inset-x-1 top-0 flex items-center justify-between z-10",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "size-7 bg-transparent p-0 opacity-60 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "size-7 bg-transparent p-0 opacity-60 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-1",
        day: "relative size-8 p-0 text-center text-sm text-foreground focus-within:relative focus-within:z-20",
        day_button: cn(
          "flex size-8 items-center justify-center rounded-md p-0 font-normal transition-colors select-none",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        ),
        /*
         * Range days carry BOTH `selected` and a range_* class, so the
         * middle-day overrides must win with !important — otherwise
         * `selected`'s primary-foreground text paints white-on-white in
         * light mode. The accent band lives on the <td>; endpoint pills
         * live on the button.
         */
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary",
        range_start: "rounded-l-md bg-accent",
        range_end: "rounded-r-md bg-accent",
        range_middle: "bg-accent [&>button]:!bg-transparent [&>button]:!text-foreground",
        today:
          "[&>button]:font-semibold [&>button]:underline [&>button]:underline-offset-2",
        outside: "text-muted-foreground/50 aria-selected:text-muted-foreground/50",
        disabled: "text-muted-foreground/50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" {...chevronProps} />
          ) : (
            <ChevronRight className="size-4" {...chevronProps} />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
