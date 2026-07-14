import { Bird, Factory, HandCoins } from "lucide-react";

import type { TowerDefinition, TowerId } from "./types";

/**
 * One entry per business lane. Mirrors backend app/modules/towers/registry.py:
 * the backend decides who can enter a tower; this file decides what a tower
 * looks like (routes, tabs, branding). Towers share the shell and UI kit but
 * own their tabs, data sources and features.
 */
export const TOWERS: Record<TowerId, TowerDefinition> = {
  live: {
    id: "live",
    name: "LIVE Operations",
    shortName: "LIVE",
    tagline: "From placement to the plant gate",
    description:
      "Pilgrim's live operations: breeders, hatcheries, broiler farms and feed mills.",
    icon: Bird,
    logo: "/towers/pilgrims-logo.png",
    basePath: "/live",
    tabs: [
      { to: "/live", label: "Overview", exact: true },
      { to: "/live/reports", label: "Reports" },
      { to: "/live/ai", label: "AI" },
    ],
  },
  plant: {
    id: "plant",
    name: "Plant Operations",
    shortName: "PLANT",
    tagline: "Slaughter, processing and cost",
    description: "Production side: slaughter, processing, yields and plant costs.",
    icon: Factory,
    basePath: "/plant",
    tabs: [
      { to: "/plant", label: "Overview", exact: true },
      { to: "/plant/reports", label: "Reports" },
      { to: "/plant/ai", label: "AI" },
    ],
  },
  sales: {
    id: "sales",
    name: "Sales",
    shortName: "SALES",
    tagline: "Commercial performance across every channel",
    description: "Customer sales, market data, historical sales, pipeline and P&L.",
    icon: HandCoins,
    basePath: "/sales",
    tabs: [
      { to: "/sales", label: "Overview", exact: true },
      { to: "/sales/reports", label: "Reports" },
      { to: "/sales/ai", label: "AI" },
    ],
  },
};

export const TOWER_LIST: TowerDefinition[] = Object.values(TOWERS);
