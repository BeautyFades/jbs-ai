import { queryOptions } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api";

import type { TowerId, TowerSummary } from "./types";

/**
 * Shared endpoint shape every tower implements (/api/towers/{id}/summary).
 * Tower-specific endpoints live in that tower's feature folder instead.
 */
export function towerSummaryQuery(towerId: TowerId) {
  return queryOptions({
    queryKey: ["towers", towerId, "summary"],
    queryFn: () => apiFetch<TowerSummary>(`/api/towers/${towerId}/summary`),
  });
}
