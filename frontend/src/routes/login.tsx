import { createFileRoute, redirect } from "@tanstack/react-router";

import { currentUserQuery } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { queryClient } from "@/lib/query-client";

type LoginSearch = {
  redirect?: string;
  error?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    error: typeof search.error === "string" ? search.error : undefined,
  }),
  // Already signed in (or dev mode, which never needs a login) → skip the page.
  beforeLoad: async ({ search }) => {
    const user = await queryClient
      .ensureQueryData(currentUserQuery)
      .catch(() => undefined);
    if (user) {
      throw redirect({ to: search.redirect ?? "/" });
    }
  },
  component: LoginPage,
});

/** Microsoft's four-square logo, per their sign-in branding guidelines. */
function MicrosoftLogo() {
  return (
    <svg viewBox="0 0 21 21" className="size-4" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

function LoginPage() {
  const { redirect: redirectTo, error } = Route.useSearch();

  const signIn = () => {
    // Full-page navigation: the backend owns the OAuth dance and comes back
    // with an httpOnly session cookie. No tokens ever live in this SPA.
    const target = redirectTo && redirectTo.startsWith("/") ? redirectTo : "/";
    window.location.assign(`/api/auth/login?redirect=${encodeURIComponent(target)}`);
  };

  return (
    <main className="grid min-h-svh place-items-center bg-muted/30 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">JBS AI Control Tower</CardTitle>
          <CardDescription>
            Sign in with your JBS account to continue. Access is limited to authorized
            users.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              Sign-in failed. Please try again or contact IT support.
            </p>
          )}
          <Button onClick={signIn} className="w-full gap-2" size="lg">
            <MicrosoftLogo />
            Sign in with Microsoft
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-center text-xs text-muted-foreground">
            Single sign-on via Microsoft Entra ID. Your permissions are managed by your
            administrator.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
