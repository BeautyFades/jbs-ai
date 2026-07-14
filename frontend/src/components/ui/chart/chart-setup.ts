import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  type Chart,
  type Plugin,
} from "chart.js";

/**
 * One-time Chart.js registration for the whole app. Import this module
 * (for its side effect) before rendering any chart — every wrapper in
 * this folder does so already. Registering the same element twice is a
 * no-op in Chart.js, so other consumers (e.g. the assistant's ad-hoc
 * message charts) can safely register on top of this.
 */

/** Draws a vertical line at the hovered index — opt in via `plugins.crosshair`. */
const crosshairPlugin: Plugin<"line" | "bar"> = {
  id: "crosshair",
  afterDraw(chart: Chart) {
    const options = chart.options.plugins as { crosshair?: { color?: string } };
    const color = options?.crosshair?.color;
    const active = chart.tooltip?.getActiveElements?.() ?? [];
    if (!color || active.length === 0) return;
    const { x } = active[0].element as unknown as { x: number };
    const { top, bottom } = chart.chartArea;
    const ctx = chart.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.restore();
  },
};

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
  crosshairPlugin,
);

ChartJS.defaults.font.family = "system-ui, -apple-system, 'Segoe UI', sans-serif";
ChartJS.defaults.font.size = 12;

export { ChartJS };
