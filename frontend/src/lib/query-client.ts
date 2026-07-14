import { QueryCache, QueryClient } from "@tanstack/react-query";

import { ApiError } from "@/lib/api";

/**
 * Session-expiry safety net: any query that comes back 401 mid-session kicks
 * the user to the login page (the router guard handles the initial load).
 */
function onAuthError(error: unknown) {
  if (
    error instanceof ApiError &&
    error.status === 401 &&
    window.location.pathname !== "/login"
  ) {
    const target = window.location.pathname + window.location.search;
    window.location.assign(`/login?redirect=${encodeURIComponent(target)}`);
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: onAuthError }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) => {
        // Retrying a 401/403 can't succeed — fail fast to the login redirect.
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          return false;
        }
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
    },
  },
});
