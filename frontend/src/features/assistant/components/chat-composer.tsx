import { SendHorizontal } from "lucide-react";
import { useState } from "react";

import { useAssistant } from "@/ai/assistant-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ChatComposer({ className }: { className?: string }) {
  const { busy, send } = useAssistant();
  const [input, setInput] = useState("");

  return (
    <form
      className={cn("flex gap-2 border-t p-3", className)}
      onSubmit={(e) => {
        e.preventDefault();
        void send(input);
        setInput("");
      }}
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about sales, plants, prices…"
        disabled={busy}
      />
      <Button type="submit" size="icon" disabled={busy || !input.trim()}>
        <SendHorizontal />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}
