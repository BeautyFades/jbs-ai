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
  | { type: "error"; message: string }
  | { type: "done" };

export type ToolPart = {
  kind: "tool";
  id: string;
  name: string;
  input: Record<string, unknown>;
  result?: string;
  isError?: boolean;
};

export type TextPart = { kind: "text"; text: string };

export type AssistantPart = TextPart | ToolPart;

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
