import type { CellContext, RowData } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

/*
 * Editable cells for the data table. A column opts in by rendering one of
 * these in its `cell`, and the table owner receives edits through the
 * `onUpdateData` callback on `useDataTable`:
 *
 *   const table = useDataTable({
 *     data, columns,
 *     onUpdateData: (rowIndex, columnId, value) =>
 *       setData(prev => prev.map((row, i) =>
 *         i === rowIndex ? { ...row, [columnId]: value } : row)),
 *   });
 *
 *   { accessorKey: "cases", cell: (ctx) => <EditableNumberCell {...ctx} /> }
 *
 * Editing is uncontrolled while focused; Enter/blur commits, Escape reverts.
 */

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const editableCellClass =
  "h-8 w-full min-w-24 rounded-md border border-transparent bg-transparent px-2 text-sm transition-colors hover:border-input focus-visible:border-input focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none";

function useCellDraft<T>(initialValue: T) {
  const [draft, setDraft] = useState(initialValue);
  const [seed, setSeed] = useState(initialValue);
  // Re-seed during render when the underlying data changes
  // (e.g. bulk update, refetch) — no effect needed.
  if (seed !== initialValue) {
    setSeed(initialValue);
    setDraft(initialValue);
  }
  return [draft, setDraft] as const;
}

function commit<TData>(
  ctx: CellContext<TData, unknown>,
  value: unknown,
  original: unknown,
) {
  if (value !== original) {
    ctx.table.options.meta?.updateData?.(ctx.row.index, ctx.column.id, value);
  }
}

function EditableTextCell<TData>(ctx: CellContext<TData, unknown>) {
  const initial = String(ctx.getValue() ?? "");
  const [draft, setDraft] = useCellDraft(initial);
  // Escape blurs before the state reset lands, so flag the cancel for onBlur.
  const cancelled = useRef(false);
  return (
    <input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (cancelled.current) {
          cancelled.current = false;
          return;
        }
        commit(ctx, draft, initial);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") {
          cancelled.current = true;
          setDraft(initial);
          e.currentTarget.blur();
        }
      }}
      onClick={(e) => e.stopPropagation()}
      aria-label={`Edit ${ctx.column.id}`}
      className={editableCellClass}
    />
  );
}

function EditableNumberCell<TData>(ctx: CellContext<TData, unknown>) {
  const initial = Number(ctx.getValue());
  const [draft, setDraft] = useCellDraft(String(initial));
  // Escape blurs before the state reset lands, so flag the cancel for onBlur.
  const cancelled = useRef(false);
  return (
    <input
      type="number"
      inputMode="numeric"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (cancelled.current) {
          cancelled.current = false;
          setDraft(String(initial));
          return;
        }
        const parsed = Number(draft);
        if (draft.trim() === "" || Number.isNaN(parsed)) {
          setDraft(String(initial)); // reject non-numeric input
        } else {
          commit(ctx, parsed, initial);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") {
          cancelled.current = true;
          setDraft(String(initial));
          e.currentTarget.blur();
        }
      }}
      onClick={(e) => e.stopPropagation()}
      aria-label={`Edit ${ctx.column.id}`}
      className={cn(editableCellClass, "tabular-nums")}
    />
  );
}

function EditableSelectCell<TData>({
  options,
  ...ctx
}: CellContext<TData, unknown> & {
  options: { value: string; label: string }[] | string[];
}) {
  const initial = String(ctx.getValue() ?? "");
  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  return (
    <div className="relative">
      <select
        value={initial}
        onChange={(e) => commit(ctx, e.target.value, initial)}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Edit ${ctx.column.id}`}
        className={cn(editableCellClass, "appearance-none pr-7")}
      >
        {normalized.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export { EditableNumberCell, EditableSelectCell, EditableTextCell };
