# JBS AI Control Tower — Frontend

SPA for the JBS control tower: reports, tasks, alerts, and an AI companion on every
screen. Internal tool — no SEO, no SSR.

## Stack

| Concern      | Choice                                                                   |
| ------------ | ------------------------------------------------------------------------ |
| Runtime      | React 19 + **React Compiler** (no manual `useMemo`/`memo`)               |
| Build        | Vite 8 (rolldown) + pnpm                                                 |
| Routing      | TanStack Router, file-based (`src/routes/`), code-split                  |
| Server state | TanStack Query                                                           |
| Styling      | Tailwind CSS v4 (CSS-first config) + shadcn/ui (`new-york`)              |
| Charts       | Chart.js via react-chartjs-2                                             |
| Lint/format  | ESLint 9 flat config (incl. React Compiler rules) + Prettier             |
| Commit hooks | husky + lint-staged (`pnpm install` wires hooks; `.husky/` at repo root) |

Data tables will use TanStack Table (or AG Grid if live-updating volume demands it);
virtualization via TanStack Virtual. Access control lands as CASL once RBAC/ABAC is
defined.

## Commands

```sh
pnpm install
pnpm dev          # http://localhost:5173, proxies /api → 127.0.0.1:8000
pnpm build        # vite build + typecheck
pnpm lint         # eslint
pnpm typecheck    # tsc -b
pnpm format       # prettier --write
pnpm check        # lint + typecheck + format:check (CI gate)
```

Add shadcn components with `pnpm dlx shadcn@latest add <component>` (configured via
`components.json`).

## Structure — feature folders

```
src/
  routes/            # TanStack Router file routes (thin: compose features)
    __root.tsx       #   app shell: nav, assistant dock, devtools
    index.tsx        #   homepage (module grid)
    assistant.tsx    #   full-page assistant
  features/          # one folder per product module; screens live here
    assistant/       #   chat thread, composer, tool/chart cards, dock
    home/            #   module grid
    reports/         #   (planned) custom reports, filter panel
    tasks/           #   (planned) kanban board
    alerts/          #   (planned) threshold alerts
  ai/                # AI platform layer (feature-agnostic)
    assistant-provider.tsx   # global conversation state + streaming
    tool-registry.tsx        # client tool/context registry (see below)
    api.ts / types.ts        # SSE client, agent event types
  components/ui/     # shadcn/ui primitives (owned, editable)
  lib/               # cn(), query client, cross-cutting utils
  styles/globals.css # Tailwind v4 theme tokens (light + dark)
```

Rules of thumb:

- **Features own their screens**; routes only wire features to URLs.
- Features may import from `ai/`, `components/`, `lib/` — never from other features.
  Anything shared by two features moves down a layer.
- `components/ui/` is vendored shadcn code: edit freely, keep generic.

## AI-native architecture

AI is not a tab — every module gets the assistant, and the assistant can act on every
module. Three pieces make that work:

1. **`AssistantProvider`** (mounted above the router) holds the conversation, so the
   full-page `/assistant` view and the floating dock share one session.
2. **`AssistantDock`** is rendered once in `__root.tsx`, so any current or future route
   has the assistant available (`Ctrl+K` from anywhere).
3. **The client tool registry** (`src/ai/tool-registry.tsx`) is the seam between
   features and the agent. While mounted, a feature can expose:

   ```tsx
   // an action the agent may perform in the browser
   useAiTool({
     name: "tasks.create",
     description: "Create a task on the kanban board.",
     inputSchema: { type: "object", properties: { title: { type: "string" } } },
     execute: (input) => createTask(input),
   });

   // live context about what the user is looking at
   useAiPageContext({
     key: "reports.active-filters",
     description: "Filters currently applied to the visible report",
     getValue: () => filters,
   });
   ```

   The assistant resolves `client_tool_call` SSE events against this registry (a
   working example is `app.navigate`, registered in `__root.tsx`). The registry is
   protocol-agnostic on purpose: `registry.snapshot()` is the projection point for
   sending client capabilities alongside chat requests, or for adopting
   [webMCP](https://github.com/webmachinelearning/webmcp) once it matures — feature
   code won't change either way.

New module checklist: add `src/features/<name>/`, a route file that composes it, and
register its `<name>.*` AI tools — the module is then AI-native by construction.

## Conventions

- React Compiler is on — write plain components, no `useMemo`/`useCallback`/`memo`
  for performance (the compiler handles it; `useCallback` for stable identities in
  context values is still fine). Lint enforces compiler-safe code via
  `eslint-plugin-react-hooks` latest rules.
- Compose UIs from small compound components; prefer props-down/events-up over
  reaching into feature internals.
- `src/routeTree.gen.ts` is generated by the router plugin — never edit (ignored by
  lint/format).
- Pre-commit runs eslint + prettier on staged frontend files (husky installed from `frontend/`, hooks live in repo-root `.husky/`).
