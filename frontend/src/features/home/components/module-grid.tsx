import { Link } from "@tanstack/react-router";
import {
  BellRing,
  ChartNoAxesCombined,
  MessageSquare,
  SquareKanban,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Module = {
  title: string;
  description: string;
  icon: LucideIcon;
  to?: string;
};

const MODULES: Module[] = [
  {
    title: "AI Assistant",
    description:
      "Query JBS data in natural language — SQL over Snowflake via dbt MCP, with charts.",
    icon: MessageSquare,
    to: "/assistant",
  },
  {
    title: "Reports",
    description: "Custom reports and dashboards over governed dbt models.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Tasks",
    description: "Kanban board for operational follow-ups, creatable by the AI.",
    icon: SquareKanban,
  },
  {
    title: "Alerts",
    description: "Threshold alerts on metrics with e-mail notifications.",
    icon: BellRing,
  },
];

export function ModuleGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {MODULES.map((mod) => {
        const card = (
          <Card
            key={mod.title}
            className={
              mod.to
                ? "h-full transition-colors hover:border-primary/50"
                : "h-full opacity-70"
            }
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <mod.icon className="size-5 text-primary" />
                <CardTitle>{mod.title}</CardTitle>
                {!mod.to && <Badge variant="secondary">coming soon</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{mod.description}</CardDescription>
            </CardContent>
          </Card>
        );
        return mod.to ? (
          <Link key={mod.title} to={mod.to} className="focus-visible:outline-none">
            {card}
          </Link>
        ) : (
          card
        );
      })}
    </div>
  );
}
