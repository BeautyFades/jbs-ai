import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { ToolPart } from "@/ai/types";
import { cn } from "@/lib/utils";

type QueryResult = {
  columns: string[];
  rows: (string | null)[][];
  row_count: number;
  truncated: boolean;
};

function tryParseTable(content?: string): QueryResult | null {
  if (!content) return null;
  try {
    const parsed: unknown = JSON.parse(content);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      Array.isArray((parsed as QueryResult).columns) &&
      Array.isArray((parsed as QueryResult).rows)
    ) {
      return parsed as QueryResult;
    }
  } catch {
    /* not JSON */
  }
  return null;
}

export function ToolCard({ part }: { part: ToolPart }) {
  const [open, setOpen] = useState(false);
  const table = tryParseTable(part.result);
  const pending = part.result === undefined;
  const sql = typeof part.input.query === "string" ? part.input.query : null;

  return (
    <div
      className={cn(
        "my-2 overflow-hidden rounded-lg border bg-card text-sm",
        part.isError && "border-destructive/50",
      )}
    >
      <button
        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-accent"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        <span className="font-mono text-xs">{part.name}</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {pending ? "running…" : part.isError ? "error" : "done"}
        </span>
      </button>
      {open && (
        <div className="border-t px-3 py-2">
          <pre className="overflow-x-auto rounded bg-muted p-2 font-mono text-xs">
            {sql ?? JSON.stringify(part.input, null, 2)}
          </pre>
          {table ? (
            <div className="mt-2 overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    {table.columns.map((c) => (
                      <th key={c} className="border-b px-2 py-1 text-left font-medium">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.slice(0, 50).map((row, i) => (
                    <tr key={i}>
                      {row.map((v, j) => (
                        <td key={j} className="border-b px-2 py-1">
                          {v ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {(table.truncated || table.rows.length > 50) && (
                <div className="mt-1 text-xs text-muted-foreground">
                  showing first rows only
                </div>
              )}
            </div>
          ) : (
            part.result && (
              <pre className="mt-2 overflow-x-auto rounded bg-muted p-2 font-mono text-xs whitespace-pre-wrap">
                {part.result.slice(0, 4000)}
              </pre>
            )
          )}
        </div>
      )}
    </div>
  );
}
