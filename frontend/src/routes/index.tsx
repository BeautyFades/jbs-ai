import { Link, createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";

import { useCurrentUser } from "@/auth";
import { TowerGrid } from "@/features/home/components/tower-grid";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data: user } = useCurrentUser();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome{user ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Pick a control tower to get started. Each lane has its own reports, data and AI,
          and the assistant is one{" "}
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">Ctrl</kbd>+
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">K</kbd> away on every
          screen.
        </p>
      </section>
      <TowerGrid />
      <section className="mt-10 border-t pt-6">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <MessageSquare className="size-4" />
          Or go straight to the cross-tower AI Assistant
        </Link>
      </section>
    </main>
  );
}
