import { createFileRoute } from "@tanstack/react-router";

import { ChatComposer, ChatThread, ProviderPicker } from "@/features/assistant";

export const Route = createFileRoute("/assistant")({
  component: AssistantPage,
});

function AssistantPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
      <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
        <h1 className="text-lg font-semibold tracking-tight">AI Assistant</h1>
        <ProviderPicker />
      </div>
      <ChatThread className="flex-1" />
      <ChatComposer />
    </main>
  );
}
