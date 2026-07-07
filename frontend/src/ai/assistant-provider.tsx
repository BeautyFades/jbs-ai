/**
 * Global assistant state. Lives at the application root — not inside a route —
 * so the same conversation is reachable from the dedicated /assistant page and
 * from the dock on every other screen. This is the backbone of the
 * "AI everywhere" model: features talk to the assistant through this context
 * and expose capabilities through the tool registry.
 */
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { getHealth, streamChat } from "./api";
import { useAiToolRegistry } from "./tool-registry";
import type { AssistantPart, ChatItem } from "./types";

type AssistantContextValue = {
  items: ChatItem[];
  busy: boolean;
  providers: string[];
  provider: string;
  model: string;
  setModel: (model: string) => void;
  changeProvider: (provider: string) => void;
  send: (message: string) => Promise<void>;
  reset: () => void;
  dockOpen: boolean;
  setDockOpen: (open: boolean) => void;
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const registry = useAiToolRegistry();
  const [items, setItems] = useState<ChatItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [providerOverride, setProviderOverride] = useState<string | null>(null);
  const [model, setModel] = useState("");
  const [dockOpen, setDockOpen] = useState(false);
  const sessionId = useRef<string>(crypto.randomUUID());

  const health = useQuery({ queryKey: ["health"], queryFn: getHealth });
  const providers = health.data?.available_providers ?? ["claude"];
  // Backend default until the user explicitly picks one.
  const provider = providerOverride ?? health.data?.default_provider ?? "claude";

  // Ctrl/Cmd+K toggles the assistant dock from anywhere in the app.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setDockOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const reset = useCallback(() => {
    sessionId.current = crypto.randomUUID();
    setItems([]);
  }, []);

  // Changing provider mid-conversation starts a fresh session: each provider
  // keeps its own native message history server-side, so an existing
  // session_id can't be replayed onto a different backend.
  const changeProvider = useCallback(
    (next: string) => {
      setProviderOverride(next);
      reset();
    },
    [reset],
  );

  const send = useCallback(
    async (message: string) => {
      if (!message.trim() || busy) return;
      setBusy(true);
      setItems((prev) => [
        ...prev,
        { role: "user", text: message },
        { role: "assistant", parts: [] },
      ]);

      const updateParts = (fn: (parts: AssistantPart[]) => AssistantPart[]) =>
        setItems((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last.role === "assistant") {
            next[next.length - 1] = { role: "assistant", parts: fn(last.parts) };
          }
          return next;
        });

      try {
        for await (const ev of streamChat(sessionId.current, message, provider, model)) {
          if (ev.type === "text_delta") {
            updateParts((parts) => {
              const last = parts[parts.length - 1];
              if (last?.kind === "text") {
                return [
                  ...parts.slice(0, -1),
                  { kind: "text", text: last.text + ev.text },
                ];
              }
              return [...parts, { kind: "text", text: ev.text }];
            });
          } else if (ev.type === "tool_call") {
            updateParts((parts) => [
              ...parts,
              { kind: "tool", id: ev.id, name: ev.name, input: ev.input },
            ]);
          } else if (ev.type === "tool_result") {
            updateParts((parts) =>
              parts.map((p) =>
                p.kind === "tool" && p.id === ev.id
                  ? { ...p, result: ev.content, isError: ev.is_error }
                  : p,
              ),
            );
          } else if (ev.type === "client_tool_call") {
            // The agent asked the *browser* to act (navigate, open a report…).
            // Resolve against whatever tools the mounted features registered.
            const tool = registry.getTool(ev.name);
            updateParts((parts) => [
              ...parts,
              { kind: "tool", id: ev.id, name: ev.name, input: ev.input },
            ]);
            let content: string;
            let isError = false;
            if (!tool) {
              content = `Client tool "${ev.name}" is not available on this screen.`;
              isError = true;
            } else {
              try {
                const result = await tool.execute(ev.input);
                content = result === undefined ? "ok" : JSON.stringify(result);
              } catch (err) {
                content = String(err);
                isError = true;
              }
            }
            updateParts((parts) =>
              parts.map((p) =>
                p.kind === "tool" && p.id === ev.id
                  ? { ...p, result: content, isError }
                  : p,
              ),
            );
          } else if (ev.type === "chart") {
            updateParts((parts) => [
              ...parts,
              {
                kind: "chart",
                id: ev.id,
                chartType: ev.chart_type,
                title: ev.title,
                labels: ev.labels,
                datasets: ev.datasets,
                yAxisLabel: ev.y_axis_label,
              },
            ]);
          } else if (ev.type === "error") {
            setItems((prev) => [...prev, { role: "system", text: ev.message }]);
          }
        }
      } catch (err) {
        setItems((prev) => [...prev, { role: "system", text: String(err) }]);
      } finally {
        setBusy(false);
      }
    },
    [busy, provider, model, registry],
  );

  return (
    <AssistantContext
      value={{
        items,
        busy,
        providers,
        provider,
        model,
        setModel,
        changeProvider,
        send,
        reset,
        dockOpen,
        setDockOpen,
      }}
    >
      {children}
    </AssistantContext>
  );
}

export function useAssistant(): AssistantContextValue {
  const ctx = use(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used within AssistantProvider");
  return ctx;
}
