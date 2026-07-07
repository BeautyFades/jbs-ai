import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

import type { ChartPart } from "@/ai/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const GRID = "rgba(139, 152, 165, 0.2)";
const TICK = "#8b98a5";
const TEXT = "#e6ebf0";

function baseData(part: ChartPart) {
  return {
    labels: part.labels,
    datasets: part.datasets.map((ds) => ({
      ...ds,
      backgroundColor: ds.backgroundColor ?? "rgba(211, 63, 46, 0.25)",
      borderColor: ds.borderColor ?? "rgb(211, 63, 46)",
    })),
  };
}

function cartesianOptions(part: ChartPart) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.2,
    plugins: {
      legend: { labels: { color: TEXT } },
      title: {
        display: Boolean(part.title),
        text: part.title ?? "",
        color: TEXT,
        font: { size: 14 },
      },
    },
    scales: {
      x: {
        ticks: { color: TICK, maxRotation: 45, autoSkip: true, maxTicksLimit: 12 },
        grid: { color: GRID },
      },
      y: {
        beginAtZero: false,
        ticks: { color: TICK },
        grid: { color: GRID },
        title: {
          display: Boolean(part.yAxisLabel),
          text: part.yAxisLabel ?? "",
          color: TICK,
        },
      },
    },
  };
}

function radialOptions(part: ChartPart) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.6,
    plugins: {
      legend: { labels: { color: TEXT } },
      title: {
        display: Boolean(part.title),
        text: part.title ?? "",
        color: TEXT,
        font: { size: 14 },
      },
    },
  };
}

export function ChartCard({ part }: { part: ChartPart }) {
  const data = baseData(part);

  return (
    <div className="my-2 rounded-lg border bg-card p-3">
      {part.chartType === "bar" && <Bar data={data} options={cartesianOptions(part)} />}
      {part.chartType === "pie" && <Pie data={data} options={radialOptions(part)} />}
      {part.chartType === "doughnut" && (
        <Doughnut data={data} options={radialOptions(part)} />
      )}
      {(part.chartType === "line" || part.chartType === "scatter") && (
        <Line data={data} options={cartesianOptions(part)} />
      )}
    </div>
  );
}
