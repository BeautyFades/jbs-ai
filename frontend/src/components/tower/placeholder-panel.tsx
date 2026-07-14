import type { LucideIcon } from "lucide-react";

/** Stub panel for tower features that are scoped but not built yet. */
export function PlaceholderPanel({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-dashed bg-card/50 p-6">
      <div className="flex items-center gap-2">
        <Icon className="size-5 text-tower-accent" />
        <h2 className="font-semibold">{title}</h2>
      </div>
      <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-tower-accent/60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
