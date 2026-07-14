import type { ChartTheme } from "@/components/ui/chart/chart-theme";

/**
 * A color for a chart series: a semantic token resolved against the current
 * theme, or any literal CSS color (hex/oklch/rgb). Do NOT pass `var(--x)` —
 * Chart.js paints to canvas, where CSS custom properties never resolve.
 */
export type ChartColor =
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  | "chart-6"
  | "chart-7"
  | "chart-8"
  | (string & {});

/**
 * Resolves a ChartColor to a canvas-safe color string. Semantic tokens map
 * to the theme's current (light/dark) values; anything else passes through.
 */
function resolveChartColor(theme: ChartTheme, color: ChartColor): string {
  switch (color) {
    case "success":
      return theme.success;
    case "warning":
      return theme.warning;
    case "destructive":
      return theme.destructive;
    case "info":
      return theme.info;
  }
  const slot = /^chart-([1-8])$/.exec(color);
  if (slot) return theme.categorical[Number(slot[1]) - 1];
  if (import.meta.env.DEV && color.includes("var(")) {
    console.warn(
      `[chart] "${color}" contains var(), which never resolves on canvas — ` +
        'use a semantic token ("success", "chart-3", …) or a literal color.',
    );
  }
  return color;
}

/**
 * Categorical color by fixed slot order. Never cycles past 8 — a 9th
 * series is a sign the data should be pre-grouped (see groupIntoOthers)
 * rather than reusing a hue for two different identities.
 */
function categoricalColor(theme: ChartTheme, index: number): string {
  if (index >= theme.categorical.length) {
    if (import.meta.env.DEV) {
      console.warn(
        `[chart] series index ${index} exceeds the 8-hue categorical palette; ` +
          'group extra series into an "Other" bucket instead of cycling colors (see groupIntoOthers).',
      );
    }
    return theme.categorical[theme.categorical.length - 1];
  }
  return theme.categorical[index];
}

/** Applies alpha to any color, e.g. for area-chart fills. */
function withAlpha(color: string, alpha: number): string {
  const clean = color.replace("#", "");
  if (color.startsWith("#") && clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // Non-hex (e.g. oklch status tokens): canvas accepts color-mix as a
  // resolved <color> in all browsers this app targets (same baseline as
  // the oklch theme vars already painted onto canvases).
  return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}

/**
 * Collapses items beyond `max` into a single "Other" bucket (values
 * summed), so a chart never spends more than 8 categorical hues on
 * identity. Sort by value descending before calling if "top N" is the intent.
 */
function groupIntoOthers<T>(
  items: T[],
  {
    max,
    getLabel,
    getValue,
    otherLabel = "Other",
  }: {
    max: number;
    getLabel: (item: T) => string;
    getValue: (item: T) => number;
    otherLabel?: string;
  },
): { label: string; value: number; item?: T }[] {
  const kept = items
    .slice(0, max)
    .map((item) => ({ label: getLabel(item), value: getValue(item), item }));
  const overflow = items.slice(max);
  if (overflow.length === 0) return kept;
  const otherValue = overflow.reduce((sum, item) => sum + getValue(item), 0);
  return [...kept, { label: otherLabel, value: otherValue }];
}

/**
 * A single-hue sequential ramp (magnitude, light→dark) derived from
 * chart slot 1, theme-reactive via CSS `color-mix`. `t` is 0 (faint) to
 * 1 (full intensity) — pass a value normalized against the series' max.
 *
 * DOM-only: the returned string contains `var()`, which resolves in CSS
 * (e.g. heat-shaded table cells) but never on canvas — don't pass it to
 * a chart series.
 */
function sequentialColor(t: number): string {
  const pct = Math.round(15 + Math.min(1, Math.max(0, t)) * 85);
  return `color-mix(in oklch, var(--chart-1) ${pct}%, var(--card))`;
}

/**
 * Diverging color for a polarity value (e.g. variance from target).
 * `t` is -1 (fully negative pole) to 1 (fully positive pole); 0 reads as
 * the neutral midpoint. Poles are the brand blue/red categorical slots.
 *
 * DOM-only, like sequentialColor — contains `var()`, so not for canvas.
 */
function divergingColor(t: number): string {
  const clamped = Math.min(1, Math.max(-1, t));
  if (clamped === 0) return "var(--muted)";
  const pole = clamped > 0 ? "var(--chart-1)" : "var(--chart-6)";
  const pct = Math.round(Math.abs(clamped) * 100);
  return `color-mix(in oklch, ${pole} ${pct}%, var(--muted))`;
}

export {
  categoricalColor,
  divergingColor,
  groupIntoOthers,
  resolveChartColor,
  sequentialColor,
  withAlpha,
};
