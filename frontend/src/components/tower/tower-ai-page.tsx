import { ChatComposer, ChatThread, ProviderPicker } from "@/features/assistant";
import type { TowerDefinition } from "@/towers";

/**
 * Per-tower AI page. Reuses the global assistant surface; the TowerShell
 * already publishes the current tower as page context, so the agent knows
 * which lane the conversation is about.
 */
export function TowerAiPage({ tower }: { tower: TowerDefinition }) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
      <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
        <h2 className="text-lg font-semibold tracking-tight">{tower.shortName} AI</h2>
        <ProviderPicker />
      </div>
      <ChatThread className="flex-1" />
      <ChatComposer />
    </main>
  );
}
