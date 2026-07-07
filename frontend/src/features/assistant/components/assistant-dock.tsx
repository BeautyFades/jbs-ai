/**
 * The floating assistant dock — the "AI everywhere" entry point. Rendered once
 * in the root layout, so every current and future module (reports, tasks,
 * alerts…) gets the assistant for free. Shares conversation state with the
 * full-page /assistant view through AssistantProvider.
 */
import { Link, useRouterState } from "@tanstack/react-router";
import { Expand, MessageSquare, X } from "lucide-react";

import { useAssistant } from "@/ai/assistant-provider";
import { Button } from "@/components/ui/button";

import { ChatComposer } from "./chat-composer";
import { ChatThread } from "./chat-thread";

export function AssistantDock() {
  const { dockOpen, setDockOpen } = useAssistant();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // The dedicated assistant page already shows the conversation full-screen.
  if (pathname.startsWith("/assistant")) return null;

  if (!dockOpen) {
    return (
      <Button
        className="fixed right-5 bottom-5 z-50 size-12 rounded-full shadow-lg"
        size="icon"
        onClick={() => setDockOpen(true)}
        aria-label="Open AI assistant (Ctrl+K)"
        title="Open AI assistant (Ctrl+K)"
      >
        <MessageSquare className="size-5" />
      </Button>
    );
  }

  return (
    <div className="fixed right-5 bottom-5 z-50 flex h-[min(600px,80vh)] w-[min(420px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border bg-card shadow-2xl">
      <header className="flex items-center gap-1 border-b px-3 py-2">
        <span className="text-sm font-semibold">AI Assistant</span>
        <span className="ml-1 text-xs text-muted-foreground">Ctrl+K</span>
        <div className="ml-auto flex items-center">
          <Button variant="ghost" size="icon" asChild aria-label="Open full page">
            <Link to="/assistant" onClick={() => setDockOpen(false)}>
              <Expand />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDockOpen(false)}
            aria-label="Close assistant"
          >
            <X />
          </Button>
        </div>
      </header>
      <ChatThread className="flex-1" />
      <ChatComposer />
    </div>
  );
}
