import { useState } from "react";
import type { ToolPart } from "../types";

type QueryResult = {
  columns: string[];
  rows: (string | null)[][];
  row_count: number;
  truncated: boolean;
};

function tryParseTable(content?: string): QueryResult | null {
  if (!content) return null;
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed?.columns) && Array.isArray(parsed?.rows)) {
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
    <div className={`tool-card ${part.isError ? "tool-error" : ""}`}>
      <button className="tool-header" onClick={() => setOpen(!open)}>
        <span className="tool-chevron">{open ? "▾" : "▸"}</span>
        <span className="tool-name">{part.name}</span>
        <span className="tool-status">
          {pending ? "running…" : part.isError ? "error" : "done"}
        </span>
      </button>
      {open && (
        <div className="tool-body">
          {sql ? (
            <pre className="tool-sql">{sql}</pre>
          ) : (
            <pre className="tool-sql">{JSON.stringify(part.input, null, 2)}</pre>
          )}
          {table ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {table.columns.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.slice(0, 50).map((row, i) => (
                    <tr key={i}>
                      {row.map((v, j) => (
                        <td key={j}>{v ?? ""}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {(table.truncated || table.rows.length > 50) && (
                <div className="table-note">showing first rows only</div>
              )}
            </div>
          ) : (
            part.result && <pre className="tool-result">{part.result.slice(0, 4000)}</pre>
          )}
        </div>
      )}
    </div>
  );
}
