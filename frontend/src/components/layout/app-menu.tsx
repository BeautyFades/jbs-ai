import { Bell, KeyRound, LogOut, Menu, UserRound } from "lucide-react";
import { useState } from "react";

import { useCurrentUser } from "@/auth";
import { ThemeModePicker } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MenuLink({
  icon,
  children,
  onClick,
  destructive = false,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none " +
        (destructive
          ? "text-destructive hover:bg-destructive/10"
          : "text-foreground hover:bg-accent hover:text-accent-foreground")
      }
    >
      <span className="[&_svg]:size-4 [&_svg]:shrink-0">{icon}</span>
      {children}
    </button>
  );
}

/** Left-side hamburger menu holding the user's settings. */
export function AppMenu() {
  const { data: user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" aria-describedby={undefined}>
        <SheetHeader className="border-b">
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription className="sr-only">
            User settings and preferences
          </SheetDescription>
          <div className="flex items-center gap-3 pt-2">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {user ? initials(user.name) : "?"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user?.name ?? "Signed out"}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email ?? "—"}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-muted-foreground uppercase">Appearance</Label>
            <ThemeModePicker />
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="email-alerts" className="font-normal">
              <Bell className="size-4 text-muted-foreground" />
              Email alerts
            </Label>
            <Switch
              id="email-alerts"
              checked={emailAlerts}
              onCheckedChange={(checked) => {
                setEmailAlerts(checked);
                toast.success(checked ? "Email alerts enabled" : "Email alerts disabled");
              }}
            />
          </div>

          <Separator />

          <nav className="-mx-3 flex flex-col gap-0.5">
            <MenuLink
              icon={<UserRound />}
              onClick={() => toast.info("Profile page is on the roadmap")}
            >
              Profile
            </MenuLink>
            <MenuLink
              icon={<KeyRound />}
              onClick={() => toast.info("API keys are managed by your admin")}
            >
              API keys
            </MenuLink>
          </nav>
        </div>

        <SheetFooter className="border-t">
          <MenuLink
            icon={<LogOut />}
            destructive
            onClick={() => toast.info("Sign-out will be wired to auth")}
          >
            Sign out
          </MenuLink>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
