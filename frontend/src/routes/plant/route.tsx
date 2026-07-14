import { createFileRoute } from "@tanstack/react-router";

import { TowerShell } from "@/components/tower/tower-shell";
import { TOWERS } from "@/towers";

export const Route = createFileRoute("/plant")({
  component: () => <TowerShell tower={TOWERS.plant} />,
});
