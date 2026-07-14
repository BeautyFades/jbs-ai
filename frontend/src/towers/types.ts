import type { LucideIcon } from "lucide-react";

export type TowerId = "live" | "plant" | "sales";

export type TowerTab = {
  to: string;
  label: string;
  exact?: boolean;
};

export type TowerDefinition = {
  id: TowerId;
  name: string;
  /** Short label for nav chips. */
  shortName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  /** Optional brand image shown in the tower header (path under /public). */
  logo?: string;
  basePath: string;
  tabs: TowerTab[];
};

// API shapes served by /api/towers/*
export type Kpi = {
  label: string;
  value: string;
  unit?: string | null;
  delta?: number | null;
};

export type TowerSummary = {
  tower: TowerId;
  kpis: Kpi[];
  source: "snowflake" | "placeholder";
};
