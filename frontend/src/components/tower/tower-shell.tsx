import { Link, Outlet } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";

import { useAiPageContext } from "@/ai/tool-registry";
import { canAccessTower, useCurrentUser } from "@/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TowerDefinition } from "@/towers";

/**
 * Shared layout for every control tower: access guard, accent-tinted header
 * with the tower's tab nav, and an Outlet for the active tab. The data-tower
 * attribute retints all tower-accent utilities inside (see globals.css).
 */
export function TowerShell({ tower }: { tower: TowerDefinition }) {
  const { data: user, isPending, isError } = useCurrentUser();

  // The tower is always visible to the agent while the user is inside it.
  useAiPageContext({
    key: `tower.${tower.id}`,
    description: "Which control tower (business lane) the user is currently in.",
    getValue: () => ({ tower: tower.id, name: tower.name }),
  });

  if (isPending) {
    return (
      <main className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Checking access…
      </main>
    );
  }

  if (isError || !canAccessTower(user, tower.id)) {
    return <NoAccess tower={tower} />;
  }

  return (
    <div data-tower={tower.id} className="flex flex-1 flex-col">
      <div className="border-b bg-tower-accent/5">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex items-center gap-3 pt-6 pb-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-tower-accent text-white">
              <tower.icon className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{tower.name}</h1>
              <p className="text-sm text-muted-foreground">{tower.tagline}</p>
            </div>
            {tower.logo && (
              <img src={tower.logo} alt="" className="ml-auto hidden h-9 sm:block" />
            )}
          </div>
          <nav className="flex gap-1">
            {tower.tabs.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                activeOptions={{ exact: tab.exact ?? false }}
                className="rounded-t-md border-b-2 border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{
                  className: cn("border-tower-accent font-medium text-foreground"),
                }}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

function NoAccess({ tower }: { tower: TowerDefinition }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
      <ShieldAlert className="size-10 text-muted-foreground" />
      <h1 className="text-lg font-semibold">No access to {tower.name}</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Your account is not granted this control tower. Ask an administrator to add you to
        the {tower.shortName} lane.
      </p>
      <Button asChild variant="outline" className="mt-2">
        <Link to="/">Back to home</Link>
      </Button>
    </main>
  );
}
