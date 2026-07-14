import {
  createRootRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { useAiTool } from "@/ai/tool-registry";
import { canAccessTower, currentUserQuery, useCurrentUser } from "@/auth";
import { AppMenu } from "@/components/layout/app-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { AssistantDock } from "@/features/assistant";
import { ApiError } from "@/lib/api";
import { queryClient } from "@/lib/query-client";
import { cn } from "@/lib/utils";
import { TOWER_LIST } from "@/towers";

const PUBLIC_PATHS = new Set(["/login"]);

export const Route = createRootRoute({
  // Auth gate for the whole app: every route except /login requires a
  // resolved identity from the backend before it renders.
  beforeLoad: async ({ location }) => {
    if (PUBLIC_PATHS.has(location.pathname)) return;
    try {
      await queryClient.ensureQueryData(currentUserQuery);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        throw redirect({ to: "/login", search: { redirect: location.href } });
      }
      throw error;
    }
  },
  component: RootLayout,
});

function RootLayout() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // App-wide client tool: lets the agent move the user between modules.
  useAiTool({
    name: "app.navigate",
    description: "Navigate the user to a page of the control tower.",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string", description: "Route path, e.g. /assistant" },
      },
      required: ["to"],
    },
    execute: async (input) => {
      await navigate({ to: String(input.to) });
      return { navigated: true, to: input.to };
    },
  });

  // The login page stands alone — no app chrome before there's an identity.
  if (PUBLIC_PATHS.has(pathname)) {
    return (
      <>
        <Outlet />
        <Toaster position="bottom-right" />
      </>
    );
  }

  // Only towers this user was granted show up at all; the backend enforces
  // the same grants on every API route, this just keeps the UI honest.
  const navLinks = [
    { to: "/", label: "Home" },
    ...TOWER_LIST.filter((t) => canAccessTower(user, t.id)).map((t) => ({
      to: t.basePath,
      label: t.shortName,
    })),
    { to: "/assistant", label: "AI Assistant" },
    { to: "/design", label: "Design" },
  ];

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4">
          <AppMenu />
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-semibold tracking-tight">JBS AI Control Tower</span>
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                )}
                activeProps={{ className: "text-foreground bg-accent" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <span
                className="ml-3 hidden max-w-40 truncate text-xs text-muted-foreground md:inline"
                title={user.email}
              >
                {user.name}
              </span>
            )}
            <ThemeToggle className="ml-1" />
          </nav>
        </div>
      </header>

      <Outlet />

      <AssistantDock />
      <Toaster position="bottom-right" />

      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
    </div>
  );
}
