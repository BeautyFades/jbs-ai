import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";

import { canAccessTower, useCurrentUser } from "@/auth";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TOWER_LIST } from "@/towers";

/** Entry cards for each control tower, locked when the user has no grant. */
export function TowerGrid() {
  const { data: user } = useCurrentUser();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {TOWER_LIST.map((tower) => {
        const allowed = canAccessTower(user, tower.id);
        const card = (
          <Card
            data-tower={tower.id}
            className={cn(
              "h-full border-t-4 transition-shadow",
              allowed ? "hover:shadow-md" : "opacity-60",
            )}
            style={{ borderTopColor: "var(--tower-accent)" }}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-tower-accent text-white">
                  <tower.icon className="size-5" />
                </div>
                <div>
                  <CardTitle>{tower.name}</CardTitle>
                  <span className="text-xs text-muted-foreground">{tower.tagline}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between gap-4">
              <CardDescription>{tower.description}</CardDescription>
              {allowed ? (
                <span className="inline-flex items-center gap-1 text-sm font-medium text-tower-accent">
                  Enter tower <ArrowRight className="size-4" />
                </span>
              ) : (
                <Badge variant="secondary" className="w-fit">
                  <Lock className="mr-1 size-3" /> no access
                </Badge>
              )}
            </CardContent>
          </Card>
        );
        return allowed ? (
          <Link key={tower.id} to={tower.basePath} className="focus-visible:outline-none">
            {card}
          </Link>
        ) : (
          <div key={tower.id}>{card}</div>
        );
      })}
    </div>
  );
}
