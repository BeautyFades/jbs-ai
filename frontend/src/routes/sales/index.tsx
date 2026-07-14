import { createFileRoute } from "@tanstack/react-router";
import { Database, HandCoins } from "lucide-react";

import { PlaceholderPanel } from "@/components/tower/placeholder-panel";
import { TowerOverview } from "@/components/tower/tower-overview";
import { TOWERS } from "@/towers";

export const Route = createFileRoute("/sales/")({
  component: SalesOverviewPage,
});

function SalesOverviewPage() {
  return (
    <TowerOverview tower={TOWERS.sales}>
      <PlaceholderPanel
        icon={HandCoins}
        title="Sales modules"
        items={[
          "Customer sales and SMD (store market data) sell-out",
          "US market sales (Circana and NPD)",
          "Historical sales (SAP, redistributor, operator)",
          "Pipeline / CRM and Prepared Foods P&L",
        ]}
      />
      <PlaceholderPanel
        icon={Database}
        title="Data fronts"
        items={[
          "Gold/mart dbt layer as the governed source",
          "Master data alignment across retailers",
        ]}
      />
    </TowerOverview>
  );
}
