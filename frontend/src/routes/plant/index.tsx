import { createFileRoute } from "@tanstack/react-router";
import { Factory } from "lucide-react";

import { PlaceholderPanel } from "@/components/tower/placeholder-panel";
import { TowerOverview } from "@/components/tower/tower-overview";
import { TOWERS } from "@/towers";

export const Route = createFileRoute("/plant/")({
  component: PlantOverviewPage,
});

function PlantOverviewPage() {
  return (
    <TowerOverview tower={TOWERS.plant}>
      <PlaceholderPanel
        icon={Factory}
        title="Plant operations modules"
        items={[
          "Slaughter and processing throughput",
          "Yield and giveaway tracking",
          "Plant cost breakdown",
          "Lane scope is TBD on the JBS side; structure is ready to grow",
        ]}
      />
    </TowerOverview>
  );
}
