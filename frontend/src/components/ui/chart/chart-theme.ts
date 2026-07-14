import { useMemo } from "react";

import { useTheme } from "@/components/theme/theme-provider";

const CATEGORICAL_SLOTS = 8;

function cssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export interface ChartTheme {
  /** Pass as `key` on the underlying react-chartjs-2 element — Chart.js's
   * plugins (notably the legend) cache resolved styles on their internal
   * elements and don't reliably re-derive them from a partial
   * `chart.update()`, so a full remount on theme flip is the robust fix. */
  mode: string;
  /** 8 fixed-order categorical hues. Assign by index; never cycle past 8 — see groupIntoOthers. */
  categorical: string[];
  ink: string;
  inkMuted: string;
  grid: string;
  surface: string;
  popoverSurface: string;
  popoverInk: string;
  success: string;
  warning: string;
  destructive: string;
  info: string;
}

/**
 * Reads the app's current theme tokens as plain color strings Chart.js can
 * consume. Depends on `resolvedTheme` purely to force a re-read after the
 * `.dark` class toggles — the values themselves come straight from CSS.
 */
function useChartTheme(): ChartTheme {
  // The React Compiler treats getComputedStyle reads as dependency-free and
  // hoists them into once-per-mount cache slots, freezing the colors at
  // first render. Opt out so the manual useMemo below re-reads the CSS
  // variables whenever resolvedTheme flips.
  "use no memo";
  const { resolvedTheme } = useTheme();
  return useMemo(() => {
    return {
      mode: resolvedTheme,
      categorical: Array.from({ length: CATEGORICAL_SLOTS }, (_, i) =>
        cssVar(`--chart-${i + 1}`),
      ),
      ink: cssVar("--foreground"),
      inkMuted: cssVar("--muted-foreground"),
      grid: cssVar("--border"),
      surface: cssVar("--card"),
      popoverSurface: cssVar("--popover"),
      popoverInk: cssVar("--popover-foreground"),
      success: cssVar("--success"),
      warning: cssVar("--warning"),
      destructive: cssVar("--destructive"),
      info: cssVar("--info"),
    };
  }, [resolvedTheme]);
}

export { useChartTheme };
