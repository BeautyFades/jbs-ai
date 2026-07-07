import { marked } from "marked";
import { useEffect, useRef } from "react";

import { useAssistant } from "@/ai/assistant-provider";
import { cn } from "@/lib/utils";

import { ChartCard } from "./chart-card";
import { ToolCard } from "./tool-card";

const SUGGESTIONS = [
  "What data is available to query?",
  "Total revenue by protein for 2026 H1, with volume",
  "Which plant had the highest revenue in Q2 2026?",
  "How did beef spot prices trend through H1 2026?",
];

export function ChatThread({ className }: { className?: string }) {
  const { items, busy, send } = useAssistant();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items]);

  return (
    <div className={cn("flex flex-col gap-3 overflow-y-auto p-4", className)}>
      {items.length === 0 && (
        <div className="m-auto flex max-w-md flex-col gap-4 text-center text-muted-foreground">
          <p>Ask a question about JBS sales, plants, or protein prices.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => void send(s)}
                className="rounded-full border px-3 py-1.5 text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {items.map((item, i) => {
        if (item.role === "user") {
          return (
            <div
              key={i}
              className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
              {item.text}
            </div>
          );
        }
        if (item.role === "system") {
          return (
            <div
              key={i}
              className="rounded-lg border border-destructive/50 px-3 py-2 text-sm text-destructive"
            >
              ⚠ {item.text}
            </div>
          );
        }
        return (
          <div key={i} className="max-w-full">
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
              <div className="animate-pulse text-sm text-muted-foreground">thinking…</div>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
