// TanStack Table v8 mutates a stable `table` instance, which the React
// Compiler cannot track — memoized JSX goes stale (documented incompatibility;
// fixed in Table v9). Opt this file out, and add "use no memo" to any
// component that calls useDataTable().
"use no memo";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type Row,
  type Table as TanStackTable,
  type TableOptions,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react";
import { createContext, use } from "react";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/*
 * Compound data table on top of TanStack Table. The provider owns the table
 * instance; every subcomponent reads it from context, so consumers compose
 * only what a given screen needs:
 *
 *   const table = useDataTable({ data, columns });
 *   <DataTable table={table}>
 *     <DataTableToolbar>
 *       <DataTableSearch placeholder="Search orders…" />
 *     </DataTableToolbar>
 *     <DataTableContent />
 *     <DataTablePagination />
 *     <DataTableBulkActions>
 *       {(rows) => <Button onClick={() => approve(rows)}>Approve</Button>}
 *     </DataTableBulkActions>
 *   </DataTable>
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = createContext<TanStackTable<any> | null>(null);

function useDataTableContext<TData>(): TanStackTable<TData> {
  const table = use(DataTableContext);
  if (!table) throw new Error("DataTable.* must be used within a <DataTable>");
  return table as TanStackTable<TData>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyColumnDef<TData> = ColumnDef<TData, any>;

/** Creates a table instance with pagination, sorting, global search and row selection wired up. */
function useDataTable<TData>({
  data,
  columns,
  pageSize = 10,
  onUpdateData,
  ...options
}: {
  data: TData[];
  columns: AnyColumnDef<TData>[];
  pageSize?: number;
  /** Receives edits from editable cells (see data-table-editable.tsx). */
  onUpdateData?: (rowIndex: number, columnId: string, value: unknown) => void;
} & Partial<TableOptions<TData>>) {
  // eslint-disable-next-line react-hooks/incompatible-library -- intentional: this file is "use no memo" (see header)
  return useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    initialState: { pagination: { pageSize }, ...options.initialState },
    ...options,
    meta: { updateData: onUpdateData, ...options.meta },
  });
}

function DataTable<TData>({
  table,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { table: TanStackTable<TData> }) {
  return (
    <DataTableContext value={table}>
      <div
        data-slot="data-table"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </DataTableContext>
  );
}

function DataTableToolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  );
}

/** Global search box bound to the table's global filter. */
function DataTableSearch({
  className,
  placeholder = "Search…",
  ...props
}: React.ComponentProps<typeof Input>) {
  const table = useDataTableContext();
  const value = (table.getState().globalFilter as string) ?? "";
  return (
    <div className={cn("relative w-full max-w-64", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        data-slot="data-table-search"
        value={value}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        placeholder={placeholder}
        className="pl-8"
        {...props}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => table.setGlobalFilter("")}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}

/** The table itself: headers, rows, selection state and an empty state. */
function DataTableContent({
  className,
  emptyMessage = "No results.",
  onRowClick,
  ...props
}: React.ComponentProps<"div"> & {
  emptyMessage?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (row: Row<any>) => void;
}) {
  const table = useDataTableContext();
  const columnCount = table.getAllLeafColumns().length;
  return (
    <div
      data-slot="data-table-content"
      className={cn("overflow-hidden rounded-lg border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{
                    width: header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer")}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnCount}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const PAGE_SIZES = [10, 20, 50, 100];

/** Pagination footer: selection summary, page-size picker and page controls. */
function DataTablePagination({ className, ...props }: React.ComponentProps<"div">) {
  const table = useDataTableContext();
  const { pageIndex, pageSize } = table.getState().pagination;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  return (
    <div
      data-slot="data-table-pagination"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 text-sm",
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground">
        {selectedCount > 0
          ? `${selectedCount} of ${table.getFilteredRowModel().rows.length} row(s) selected`
          : `${table.getFilteredRowModel().rows.length} row(s)`}
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Rows per page
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground shadow-xs focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <span className="text-xs text-muted-foreground">
          Page {pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="First page"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Last page"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Floating bar shown while rows are selected. Children receive the selected
 * rows so bulk actions can act on them.
 */
function DataTableBulkActions<TData>({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  children: (rows: Row<TData>[]) => React.ReactNode;
}) {
  const table = useDataTableContext<TData>();
  const rows = table.getFilteredSelectedRowModel().rows;
  if (rows.length === 0) return null;
  return (
    <div
      data-slot="data-table-bulk-actions"
      role="toolbar"
      aria-label="Bulk actions"
      className={cn(
        "fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-lg border bg-card px-3 py-2 text-card-foreground shadow-lg",
        className,
      )}
      {...props}
    >
      <span className="text-sm font-medium tabular-nums">{rows.length} selected</span>
      <div className="mx-1 h-4 w-px bg-border" />
      {children(rows)}
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Clear selection"
        onClick={() => table.resetRowSelection()}
      >
        <X />
      </Button>
    </div>
  );
}

/** Column def for a row-selection checkbox column. Spread into your columns array. */
function selectionColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    size: 32,
    enableSorting: false,
    enableGlobalFilter: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows on this page"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
      />
    ),
  };
}

/** Sortable column header. Use inside a column def's `header`. */
function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}) {
  if (!column.getCanSort()) return <span className={className}>{title}</span>;
  const sorted = column.getIsSorted();
  return (
    <button
      type="button"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className={cn(
        "-ml-1 inline-flex items-center gap-1 rounded-sm px-1 py-0.5 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        sorted && "text-foreground",
        className,
      )}
    >
      {title}
      {sorted === "asc" ? (
        <ArrowUp className="size-3.5" />
      ) : sorted === "desc" ? (
        <ArrowDown className="size-3.5" />
      ) : (
        <ChevronsUpDown className="size-3.5 opacity-50" />
      )}
    </button>
  );
}

/** Per-row overflow menu ("…"). Pass DropdownMenuItem children. */
function DataTableRowActions({
  className,
  children,
  label = "Open row actions",
}: {
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          className={cn("data-[state=open]:bg-accent", className)}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  DataTable,
  DataTableBulkActions,
  DataTableColumnHeader,
  DataTableContent,
  DataTablePagination,
  DataTableRowActions,
  DataTableSearch,
  DataTableToolbar,
  selectionColumn,
  useDataTable,
  useDataTableContext,
};
