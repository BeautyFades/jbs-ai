import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import { getHealth, streamChat } from "./api";
import { ChartCard } from "./components/ChartCard";
import { ToolCard } from "./components/ToolCard";
import type { AssistantPart, ChatItem } from "./types";

const PROVIDER_LABELS: Record<string, string> = {
  claude: "Claude",
  gemini: "Gemini",
  openai: "OpenAI",
  local: "Local model",
};

const SUGGESTIONS = [
  "What data is available to query?",
  "Total revenue by protein for 2026 H1, with volume",
  "Which plant had the highest revenue in Q2 2026?",
  "How did beef spot prices trend through H1 2026?",
];

export default function App() {
  const [items, setItems] = useState<ChatItem[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [providers, setProviders] = useState<string[]>(["claude"]);
  const [provider, setProvider] = useState("claude");
  const [model, setModel] = useState("");
  const sessionId = useRef(crypto.randomUUID());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items]);

  useEffect(() => {
    getHealth()
      .then((h) => {
        setProviders(h.available_providers);
        setProvider(h.default_provider);
      })
      .catch(() => {
        /* backend not up yet — keep the Claude-only default */
      });
  }, []);

  // Changing provider mid-conversation starts a fresh session: each
  // provider keeps its own native message history server-side, so an
  // existing session_id can't be replayed onto a different backend.
  function changeProvider(next: string) {
    setProvider(next);
    sessionId.current = crypto.randomUUID();
    setItems([]);
  }

  async function send(message: string) {
    if (!message.trim() || busy) return;
    setBusy(true);
    setInput("");
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
              return [...parts.slice(0, -1), { kind: "text", text: last.text + ev.text }];
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
  }

  return (
    <div className="app">
      <header>
        <h1>JBS AI Control Tower</h1>
        <span className="subtitle">dbt MCP · Snowflake MCP — PoC</span>
        <div className="provider-picker">
          <select
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
          <input
            className="model-override"
            value={model}
            disabled={busy}
            onChange={(e) => setModel(e.target.value)}
            placeholder="model (optional override)"
          />
        </div>
      </header>

      <main>
        {items.length === 0 && (
          <div className="empty">
            <p>Ask a question about JBS sales, plants, or protein prices.</p>
            <div className="suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {items.map((item, i) => {
          if (item.role === "user") {
            return (
              <div key={i} className="msg user">
                {item.text}
              </div>
            );
          }
          if (item.role === "system") {
            return (
              <div key={i} className="msg system">
                ⚠ {item.text}
              </div>
            );
          }
          return (
            <div key={i} className="msg assistant">
              {item.parts.map((part, j) => {
                if (part.kind === "text") {
                  return (
                    <div
                      key={j}
                      className="markdown"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(part.text) as string,
                      }}
                    />
                  );
                }
                if (part.kind === "chart") {
                  return <ChartCard key={part.id} part={part} />;
                }
                if (part.name === "render_chart") {
                  return null;
                }
                return <ToolCard key={part.id} part={part} />;
              })}
              {busy && i === items.length - 1 && item.parts.length === 0 && (
                <div className="thinking">thinking…</div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </main>

      <footer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about sales, plants, prices…"
            disabled={busy}
          />
          <button type="submit" disabled={busy || !input.trim()}>
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
