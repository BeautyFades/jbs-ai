import { queryOptions, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api";
import type { TowerId } from "@/towers/types";

import type { CurrentUser } from "./types";

/**
 * The backend is the source of truth for identity and tower grants
 * (dev-mode stub today, Entra ID later). The UI only reflects it.
 */
export const currentUserQuery = queryOptions({
  queryKey: ["auth", "me"],
  queryFn: () => apiFetch<CurrentUser>("/api/me"),
  staleTime: 5 * 60_000,
});

export function useCurrentUser() {
  return useQuery(currentUserQuery);
}

export function canAccessTower(user: CurrentUser | undefined, towerId: TowerId): boolean {
  return user?.towers.includes(towerId) ?? false;
}
