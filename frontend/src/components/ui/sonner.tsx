import { Toaster as Sonner, toast, type ToasterProps } from "sonner";

import { useTheme } from "@/components/theme/theme-provider";

/**
 * App-level toast outlet. Mount once (root layout); fire notifications from
 * anywhere with `toast(...)`, `toast.success(...)`, `toast.warning(...)`,
 * `toast.error(...)`, `toast.info(...)`, or `toast.promise(...)`.
 */
function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:!bg-card group-[.toaster]:!text-card-foreground group-[.toaster]:!border-border group-[.toaster]:!shadow-lg",
          description: "group-[.toast]:!text-muted-foreground",
          actionButton:
            "group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground",
          cancelButton: "group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground",
          success: "[&_[data-icon]]:!text-success",
          warning: "[&_[data-icon]]:!text-warning",
          error: "[&_[data-icon]]:!text-destructive",
          info: "[&_[data-icon]]:!text-info",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
