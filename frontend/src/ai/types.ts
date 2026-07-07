/** Server-sent events streamed from the agent backend (`POST /api/chat`). */
export type AgentEvent =
  | { type: "text_delta"; text: string }
  | { type: "tool_call"; id: string; name: string; input: Record<string, unknown> }
  | {
      type: "tool_result";
      id: string;
      name: string;
      content: string;
      is_error: boolean;
    }
  | {
      type: "chart";
      id: string;
      chart_type: ChartType;
      title?: string | null;
      labels: string[];
      datasets: ChartDataset[];
      y_axis_label?: string | null;
    }
  | {
      /**
       * A tool the agent wants executed *in the browser* (navigation, opening a
       * report, creating a task from the current screen…). Resolved against the
       * client tool registry — see `tool-registry.tsx`. Not emitted by the
       * backend yet; the frontend plumbing is already in place.
       */
      type: "client_tool_call";
      id: string;
      name: string;
      input: Record<string, unknown>;
    }
  | { type: "error"; message: string }
  | { type: "done" };

export type ChartType = "line" | "bar" | "pie" | "doughnut" | "scatter";

export type ChartDataset = {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string | string[];
  fill?: boolean;
  tension?: number;
  borderWidth?: number;
};

export type ChartPart = {
  kind: "chart";
  id: string;
  chartType: ChartType;
  title?: string | null;
  labels: string[];
  datasets: ChartDataset[];
  yAxisLabel?: string | null;
};

export type ToolPart = {
  kind: "tool";
  id: string;
  name: string;
  input: Record<string, unknown>;
  result?: string;
  isError?: boolean;
};

export type TextPart = { kind: "text"; text: string };

export type AssistantPart = TextPart | ToolPart | ChartPart;

export type ChatItem =
  | { role: "user"; text: string }
  | { role: "assistant"; parts: AssistantPart[] }
  | { role: "system"; text: string };

export type HealthInfo = {
  status: string;
  mcp_mode: string;
  mcp_servers: string[];
  tools: string[];
  default_provider: string;
  available_providers: string[];
};
