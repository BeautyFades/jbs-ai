import { createFileRoute } from "@tanstack/react-router";
import { ChartNoAxesCombined } from "lucide-react";

import { PlaceholderPanel } from "@/components/tower/placeholder-panel";

export const Route = createFileRoute("/sales/reports")({
  component: SalesReportsPage,
});

function SalesReportsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
      <PlaceholderPanel
        icon={ChartNoAxesCombined}
        title="SALES reports"
        items={[
          "Revenue and volume by protein, region and customer",
          "Retailer sell-out vs sell-in",
          "Price realization vs market (spot)",
        ]}
      />
    </main>
  );
}
