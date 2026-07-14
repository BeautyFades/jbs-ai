import { createFileRoute } from "@tanstack/react-router";
import { Egg, Map } from "lucide-react";

import { PlaceholderPanel } from "@/components/tower/placeholder-panel";
import { TowerOverview } from "@/components/tower/tower-overview";
import { TOWERS } from "@/towers";

export const Route = createFileRoute("/live/")({
  component: LiveOverviewPage,
});

function LiveOverviewPage() {
  return (
    <TowerOverview tower={TOWERS.live}>
      <PlaceholderPanel
        icon={Egg}
        title="Live operations modules"
        items={[
          "Scorecard: corporation, business unit and complex drill-down",
          "Broiler, breeder and hatchery performance",
          "Feed mills and BinSentry feed-on-hand",
          "Kill schedule optimizer",
        ]}
      />
      <PlaceholderPanel
        icon={Map}
        title="Geography"
        items={[
          "Location map with complexes, farms and mills",
          "Weather radar and HPAI overlays",
        ]}
      />
    </TowerOverview>
  );
}
