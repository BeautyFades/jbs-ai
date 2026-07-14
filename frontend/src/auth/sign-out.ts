import { apiFetch } from "@/lib/api";
import { queryClient } from "@/lib/query-client";

type LogoutResponse = {
  ok: boolean;
  /** Present in entra_oidc mode: ends the Microsoft session too. */
  entra_logout_url?: string;
};

export async function signOut(): Promise<void> {
  let logoutUrl: string | undefined;
  try {
    const res = await apiFetch<LogoutResponse>("/api/auth/logout", { method: "POST" });
    logoutUrl = res.entra_logout_url;
  } finally {
    // Drop every cached query — nothing fetched for this user may survive
    // into the next session on a shared machine.
    queryClient.clear();
    window.location.assign(logoutUrl ?? "/login");
  }
}
