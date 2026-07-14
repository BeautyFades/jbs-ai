import { createFileRoute } from "@tanstack/react-router";
import { ChartNoAxesCombined } from "lucide-react";

import { PlaceholderPanel } from "@/components/tower/placeholder-panel";

export const Route = createFileRoute("/plant/reports")({
  component: PlantReportsPage,
});

function PlantReportsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <PlaceholderPanel
        icon={ChartNoAxesCombined}
        title="PLANT reports"
        items={[
          "Weekly plant scorecards",
          "Yield vs standard by plant and line",
          "Cost per head trends",
        ]}
      />
    </main>
  );
}
