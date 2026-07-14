import type { ChartTheme } from "@/components/ui/chart/chart-theme";

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

/** Applies alpha to a hex color, e.g. for area-chart fills. */
function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return hex;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
 */
function sequentialColor(t: number): string {
  const pct = Math.round(15 + Math.min(1, Math.max(0, t)) * 85);
  return `color-mix(in oklch, var(--chart-1) ${pct}%, var(--card))`;
}

/**
 * Diverging color for a polarity value (e.g. variance from target).
 * `t` is -1 (fully negative pole) to 1 (fully positive pole); 0 reads as
 * the neutral midpoint. Poles are the brand blue/red categorical slots.
 */
function divergingColor(t: number): string {
  const clamped = Math.min(1, Math.max(-1, t));
  if (clamped === 0) return "var(--muted)";
  const pole = clamped > 0 ? "var(--chart-1)" : "var(--chart-6)";
  const pct = Math.round(Math.abs(clamped) * 100);
  return `color-mix(in oklch, ${pole} ${pct}%, var(--muted))`;
}

export { categoricalColor, divergingColor, groupIntoOthers, sequentialColor, withAlpha };
