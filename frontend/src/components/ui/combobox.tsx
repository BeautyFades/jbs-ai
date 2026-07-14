import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { useId, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
  /** Extra text shown muted after the label; also searchable. */
  hint?: string;
}

const triggerClass =
  "flex min-h-9 w-full min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Shared search-and-pick panel used by both Combobox and MultiCombobox.
 * Owns the query + keyboard navigation; the variant owns selection state
 * and whether picking closes the popover.
 */
function ComboboxPanel({
  options,
  selectedValues,
  onPick,
  searchPlaceholder,
  emptyMessage,
  listLabel,
  listboxId,
  multiselectable = false,
}: {
  options: ComboboxOption[];
  selectedValues: ReadonlySet<string>;
  onPick: (option: ComboboxOption) => void;
  searchPlaceholder: string;
  emptyMessage: string;
  listLabel: string;
  listboxId: string;
  multiselectable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(q) ||
          (o.hint?.toLowerCase().includes(q) ?? false),
      )
    : options;

  return (
    <>
      <div className="flex items-center gap-2 border-b px-3">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        {/* Opening a search popover should focus its input. */}
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              const option = filtered[activeIndex];
              if (option) onPick(option);
            }
          }}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <ul
        id={listboxId}
        role="listbox"
        aria-label={listLabel}
        aria-multiselectable={multiselectable || undefined}
        className="max-h-64 overflow-y-auto p-1"
      >
        {filtered.length === 0 && (
          <li className="px-2 py-3 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </li>
        )}
        {filtered.map((option, index) => (
          <li
            key={option.value}
            role="option"
            aria-selected={selectedValues.has(option.value)}
            onClick={() => onPick(option)}
            onMouseMove={() => setActiveIndex(index)}
            className={cn(
              "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm select-none",
              index === activeIndex && "bg-accent text-accent-foreground",
            )}
          >
            <Check
              className={cn(
                "size-4 shrink-0",
                selectedValues.has(option.value) ? "opacity-100" : "opacity-0",
              )}
            />
            <span className="truncate">{option.label}</span>
            {option.hint && (
              <span className="ml-auto truncate text-xs text-muted-foreground">
                {option.hint}
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Searchable single select. Built for pick-one-of-many flows (e.g. mapping
 * a source record to a Snowflake dimension value in the MDM screens).
 * Controlled only — the parent owns `value`. Picking again clears.
 */
function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyMessage = "No matches.",
  disabled = false,
  className,
}: {
  options: ComboboxOption[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          disabled={disabled}
          className={cn(triggerClass, !selected && "text-muted-foreground", className)}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-56 p-0"
      >
        <ComboboxPanel
          options={options}
          selectedValues={new Set(value === null ? [] : [value])}
          onPick={(option) => {
            onValueChange(option.value === value ? null : option.value);
            setOpen(false);
          }}
          searchPlaceholder={searchPlaceholder}
          emptyMessage={emptyMessage}
          listLabel={placeholder}
          listboxId={listboxId}
        />
      </PopoverContent>
    </Popover>
  );
}

/**
 * Searchable multi select. Picking toggles and keeps the popover open;
 * selected options show as badges in the trigger (overflow collapses to
 * "+n"). Controlled only — the parent owns `values`.
 *
 *   <MultiCombobox
 *     options={customers}
 *     values={selected}
 *     onValuesChange={setSelected}
 *     placeholder="Filter customers…"
 *   />
 */
function MultiCombobox({
  options,
  values,
  onValuesChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyMessage = "No matches.",
  maxBadges = 3,
  disabled = false,
  className,
}: {
  options: ComboboxOption[];
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  /** Selected badges shown before collapsing into a "+n" badge. */
  maxBadges?: number;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const selectedSet = new Set(values);
  const selectedOptions = options.filter((o) => selectedSet.has(o.value));
  const shown = selectedOptions.slice(0, maxBadges);
  const overflow = selectedOptions.length - shown.length;

  const toggle = (option: ComboboxOption) => {
    onValuesChange(
      selectedSet.has(option.value)
        ? values.filter((v) => v !== option.value)
        : [...values, option.value],
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          disabled={disabled}
          className={cn(triggerClass, "h-auto", className)}
        >
          {selectedOptions.length === 0 ? (
            <span className="truncate text-muted-foreground">{placeholder}</span>
          ) : (
            <span className="flex flex-wrap items-center gap-1">
              {shown.map((option) => (
                <Badge key={option.value} variant="secondary" className="font-normal">
                  {option.label}
                  {/* span, not button: nested buttons are invalid HTML */}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${option.label}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(option);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        toggle(option);
                      }
                    }}
                    className="-mr-0.5 ml-0.5 rounded-sm opacity-60 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <X className="size-3" />
                  </span>
                </Badge>
              ))}
              {overflow > 0 && (
                <Badge variant="secondary" className="font-normal">
                  +{overflow}
                </Badge>
              )}
            </span>
          )}
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-56 p-0"
      >
        <ComboboxPanel
          options={options}
          selectedValues={selectedSet}
          onPick={toggle}
          searchPlaceholder={searchPlaceholder}
          emptyMessage={emptyMessage}
          listLabel={placeholder}
          listboxId={listboxId}
          multiselectable
        />
        {selectedOptions.length > 0 && (
          <div className="flex items-center justify-between border-t px-3 py-1.5 text-xs text-muted-foreground">
            <span className="tabular-nums">{selectedOptions.length} selected</span>
            <button
              type="button"
              onClick={() => onValuesChange([])}
              className="rounded-sm font-medium transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Clear all
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, MultiCombobox };
