import { createFileRoute } from "@tanstack/react-router";

import { TowerAiPage } from "@/components/tower/tower-ai-page";
import { TOWERS } from "@/towers";

export const Route = createFileRoute("/plant/ai")({
  component: () => <TowerAiPage tower={TOWERS.plant} />,
});
