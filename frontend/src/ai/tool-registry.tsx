/**
 * Client-side AI tool + context registry — the seam that makes AI "native"
 * across the app instead of confined to a chat tab.
 *
 * Any feature can, while mounted, expose:
 *  - tools   — actions the agent may execute in the browser (navigate, open a
 *              report, prefill a task form…), via `useAiTool`
 *  - context — a live description of what the user is currently looking at
 *              (active filters, selected rows, visible report…), via
 *              `useAiPageContext`
 *
 * The registry is intentionally protocol-agnostic: today the assistant reads
 * it to resolve `client_tool_call` events streamed from the backend; later it
 * can be projected onto webMCP / MCP-UI or sent alongside chat requests so the
 * server-side agent knows what the client can do. Registration is tied to the
 * component lifecycle, so tools appear and disappear with the screens that own
 * them.
 */
import { createContext, use, useEffect, useMemo, useRef, type ReactNode } from "react";

export type AiToolDefinition = {
  /** Unique name, `feature.action` style, e.g. `"reports.open"`. */
  name: string;
  /** What the tool does — written for the model, not the user. */
  description: string;
  /** JSON Schema for the input object. */
  inputSchema?: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => unknown | Promise<unknown>;
};

export type AiContextEntry = {
  /** Unique key, e.g. `"reports.active-filters"`. */
  key: string;
  /** What this context describes — written for the model. */
  description: string;
  /** Snapshot of the current value; called lazily when the agent needs it. */
  getValue: () => unknown;
};

export class AiToolRegistry {
  private tools = new Map<string, AiToolDefinition>();
  private contexts = new Map<string, AiContextEntry>();

  registerTool(tool: AiToolDefinition): () => void {
    this.tools.set(tool.name, tool);
    return () => {
      if (this.tools.get(tool.name) === tool) this.tools.delete(tool.name);
    };
  }

  registerContext(entry: AiContextEntry): () => void {
    this.contexts.set(entry.key, entry);
    return () => {
      if (this.contexts.get(entry.key) === entry) this.contexts.delete(entry.key);
    };
  }

  getTool(name: string): AiToolDefinition | undefined {
    return this.tools.get(name);
  }

  listTools(): AiToolDefinition[] {
    return [...this.tools.values()];
  }

  /** Materialized view of everything the client currently exposes. */
  snapshot() {
    return {
      tools: this.listTools().map(({ name, description, inputSchema }) => ({
        name,
        description,
        inputSchema,
      })),
      context: [...this.contexts.values()].map(({ key, description, getValue }) => ({
        key,
        description,
        value: getValue(),
      })),
    };
  }
}

const AiToolRegistryContext = createContext<AiToolRegistry | null>(null);

export function AiToolRegistryProvider({ children }: { children: ReactNode }) {
  const registry = useMemo(() => new AiToolRegistry(), []);
  return <AiToolRegistryContext value={registry}>{children}</AiToolRegistryContext>;
}

export function useAiToolRegistry(): AiToolRegistry {
  const registry = use(AiToolRegistryContext);
  if (!registry) {
    throw new Error("useAiToolRegistry must be used within AiToolRegistryProvider");
  }
  return registry;
}

/** Expose a browser-side tool to the agent for as long as the caller is mounted. */
export function useAiTool(tool: AiToolDefinition) {
  const registry = useAiToolRegistry();
  const ref = useRef(tool);

  useEffect(() => {
    ref.current = tool;
  });

  useEffect(() => {
    // Registered once per (registry, name); always delegates to the latest
    // definition so callers can pass inline closures without re-registering.
    return registry.registerTool({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      execute: (input) => ref.current.execute(input),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registry, tool.name]);
}

/** Expose live screen context to the agent for as long as the caller is mounted. */
export function useAiPageContext(entry: AiContextEntry) {
  const registry = useAiToolRegistry();
  const ref = useRef(entry);

  useEffect(() => {
    ref.current = entry;
  });

  useEffect(() => {
    return registry.registerContext({
      key: entry.key,
      description: entry.description,
      getValue: () => ref.current.getValue(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registry, entry.key]);
}
