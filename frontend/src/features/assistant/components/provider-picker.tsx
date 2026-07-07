import { useAssistant } from "@/ai/assistant-provider";
import { Input } from "@/components/ui/input";

const PROVIDER_LABELS: Record<string, string> = {
  claude: "Claude",
  gemini: "Gemini",
  openai: "OpenAI",
  local: "Local model",
};

export function ProviderPicker() {
  const { providers, provider, changeProvider, model, setModel, busy } = useAssistant();

  return (
    <div className="flex items-center gap-2">
      <select
        className="h-9 rounded-md border border-input bg-background px-2 text-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50"
        value={provider}
        disabled={busy}
        onChange={(e) => changeProvider(e.target.value)}
      >
        {providers.map((p) => (
          <option key={p} value={p}>
            {PROVIDER_LABELS[p] ?? p}
          </option>
        ))}
      </select>
      <Input
        className="w-56"
        value={model}
        disabled={busy}
        onChange={(e) => setModel(e.target.value)}
        placeholder="model (optional override)"
      />
    </div>
  );
}
