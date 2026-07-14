import { createRootRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { useAiTool } from "@/ai/tool-registry";
import { useCurrentUser } from "@/auth";
import { AppMenu } from "@/components/layout/app-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { AssistantDock } from "@/features/assistant";
import { cn } from "@/lib/utils";
import { TOWER_LIST } from "@/towers";

export const Route = createRootRoute({
  component: RootLayout,
});

const NAV_LINKS = [
  { to: "/", label: "Home" },
  ...TOWER_LIST.map((t) => ({ to: t.basePath, label: t.shortName })),
  { to: "/assistant", label: "AI Assistant" },
  { to: "/design", label: "Design" },
] as const;

function RootLayout() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

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

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4">
          <AppMenu />
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-semibold tracking-tight">JBS AI Control Tower</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              dbt MCP · Snowflake MCP — PoC
            </span>
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            {NAV_LINKS.map((link) => (
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
