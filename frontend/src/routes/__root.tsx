import { createRootRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { useAiTool } from "@/ai/tool-registry";
import { AssistantDock } from "@/features/assistant";
import { cn } from "@/lib/utils";

export const Route = createRootRoute({
  component: RootLayout,
});

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/assistant", label: "AI Assistant" },
] as const;

function RootLayout() {
  const navigate = useNavigate();

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
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4">
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
          </nav>
        </div>
      </header>

      <Outlet />

      <AssistantDock />

      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-left" />}
    </div>
  );
}
