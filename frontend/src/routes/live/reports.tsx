import { createFileRoute } from "@tanstack/react-router";
import { ChartNoAxesCombined } from "lucide-react";

import { PlaceholderPanel } from "@/components/tower/placeholder-panel";

export const Route = createFileRoute("/live/reports")({
  component: LiveReportsPage,
});

function LiveReportsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <PlaceholderPanel
        icon={ChartNoAxesCombined}
        title="LIVE reports"
        items={[
          "Complex trend reports (cost and KPI trends)",
          "Flock history with Excel export",
          "Breeder egg cost",
          "Weekly feed mill production",
        ]}
      />
    </main>
  );
}
