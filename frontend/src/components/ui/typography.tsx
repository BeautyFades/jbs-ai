import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Typography scale for the app. Each level is an explicit component
 * (H1…H4, Lead, Text, Muted, Footnote, InlineCode) so usage reads as
 * intent, not configuration. Pass `asChild` to change the rendered tag
 * while keeping the styles (e.g. an H1-styled <p>).
 */
const typographyVariants = cva("", {
  variants: {
    level: {
      h1: "scroll-m-20 text-3xl font-bold tracking-tight text-balance lg:text-4xl",
      h2: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-base font-semibold tracking-tight",
      lead: "text-lg text-muted-foreground",
      body: "text-sm leading-relaxed",
      muted: "text-sm text-muted-foreground",
      footnote: "text-xs text-muted-foreground",
      code: "rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-medium",
    },
  },
});

type TypographyLevel = NonNullable<VariantProps<typeof typographyVariants>["level"]>;

type TypographyProps<Tag extends React.ElementType> = React.ComponentProps<Tag> & {
  asChild?: boolean;
};

function styled(level: TypographyLevel, className?: string) {
  return cn(typographyVariants({ level }), className);
}

function H1({ className, asChild = false, ...props }: TypographyProps<"h1">) {
  const Comp = asChild ? Slot : "h1";
  return (
    <Comp data-slot="typography-h1" className={styled("h1", className)} {...props} />
  );
}

function H2({ className, asChild = false, ...props }: TypographyProps<"h2">) {
  const Comp = asChild ? Slot : "h2";
  return (
    <Comp data-slot="typography-h2" className={styled("h2", className)} {...props} />
  );
}

function H3({ className, asChild = false, ...props }: TypographyProps<"h3">) {
  const Comp = asChild ? Slot : "h3";
  return (
    <Comp data-slot="typography-h3" className={styled("h3", className)} {...props} />
  );
}

function H4({ className, asChild = false, ...props }: TypographyProps<"h4">) {
  const Comp = asChild ? Slot : "h4";
  return (
    <Comp data-slot="typography-h4" className={styled("h4", className)} {...props} />
  );
}

function Lead({ className, asChild = false, ...props }: TypographyProps<"p">) {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp data-slot="typography-lead" className={styled("lead", className)} {...props} />
  );
}

function Text({ className, asChild = false, ...props }: TypographyProps<"p">) {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp data-slot="typography-body" className={styled("body", className)} {...props} />
  );
}

function Muted({ className, asChild = false, ...props }: TypographyProps<"p">) {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      data-slot="typography-muted"
      className={styled("muted", className)}
      {...props}
    />
  );
}

function Footnote({ className, asChild = false, ...props }: TypographyProps<"p">) {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      data-slot="typography-footnote"
      className={styled("footnote", className)}
      {...props}
    />
  );
}

function InlineCode({ className, asChild = false, ...props }: TypographyProps<"code">) {
  const Comp = asChild ? Slot : "code";
  return (
    <Comp data-slot="typography-code" className={styled("code", className)} {...props} />
  );
}

export { Footnote, H1, H2, H3, H4, InlineCode, Lead, Muted, Text, typographyVariants };
