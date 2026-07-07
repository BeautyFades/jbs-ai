import { createFileRoute } from "@tanstack/react-router";

import { ModuleGrid } from "@/features/home/components/module-grid";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Control Tower</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          One place for JBS reports, tasks and alerts — with an AI companion on every
          screen. Press <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">Ctrl</kbd>
          +<kbd className="rounded bg-muted px-1.5 py-0.5 text-xs">K</kbd> anywhere to ask
          the assistant.
        </p>
      </section>
      <ModuleGrid />
    </main>
  );
}
