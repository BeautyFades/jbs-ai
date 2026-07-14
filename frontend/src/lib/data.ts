import { apiFetch } from "@/lib/api";

export type WarehouseResult = {
  columns: string[];
  rows: (string | number | null)[][];
  row_count: number;
  truncated: boolean;
};

/**
 * The only path from the SPA to Snowflake. The backend authenticates the
 * session, rejects non-read SQL, and runs the query under the Snowflake role
 * mapped to the user — so two users issuing the same SQL can legitimately get
 * different rows back (row access policies).
 */
export function runWarehouseQuery(sql: string): Promise<WarehouseResult> {
  return apiFetch<WarehouseResult>("/api/data/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sql }),
  });
}
