import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Download,
  Eye,
  Flag,
  Inbox,
  Info,
  Package,
  Pencil,
  Plus,
  Trash2,
  TrendingUp,
  TriangleAlert,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  ChartDataTable,
  DoughnutChart,
  groupIntoOthers,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
} from "@/components/ui/chart";
import { Combobox, MultiCombobox } from "@/components/ui/combobox";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/components/ui/empty-state";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  ChartCard,
  ChartCardAction,
  ChartCardContent,
  ChartCardFooter,
  ChartCardHeader,
  ChartCardSubtitle,
  ChartCardTitle,
} from "@/components/ui/chart-card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DataTable,
  DataTableBulkActions,
  DataTableColumnHeader,
  DataTableContent,
  DataTablePagination,
  DataTableRowActions,
  DataTableSearch,
  DataTableToolbar,
  selectionColumn,
  useDataTable,
} from "@/components/ui/data-table";
import {
  EditableNumberCell,
  EditableSelectCell,
} from "@/components/ui/data-table-editable";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  KpiCard,
  KpiCardDelta,
  KpiCardFootnote,
  KpiCardHeader,
  KpiCardIcon,
  KpiCardLabel,
  KpiCardValue,
} from "@/components/ui/kpi-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Footnote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Lead,
  Muted,
  Text,
} from "@/components/ui/typography";

export const Route = createFileRoute("/design")({
  component: DesignPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <H2>{title}</H2>
      {children}
    </section>
  );
}

function DesignPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10">
      <header className="flex flex-col gap-2">
        <H1>Component library</H1>
        <Lead>
          JBS / Pilgrim&apos;s design system — brand blue and red, light and dark. Flip
          the theme toggle in the header to check both modes.
        </Lead>
      </header>

      <Section title="Typography">
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
          <H1>H1 — Page title</H1>
          <H2>H2 — Section title</H2>
          <H3>H3 — Subsection</H3>
          <H4>H4 — Card heading</H4>
          <Lead>Lead — introductory copy under a page title.</Lead>
          <Text>
            Body — standard paragraph text. Use <InlineCode>InlineCode</InlineCode> for
            identifiers and values.
          </Text>
          <Muted>Muted — secondary explanations.</Muted>
          <Footnote>Footnote — sources, timestamps, fine print.</Footnote>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button>
            <Plus /> With icon
          </Button>
          <Button variant="outline">
            <Download /> Export
          </Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Edit">
            <Pencil />
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Flag">
            <Flag />
          </Button>
        </div>
      </Section>

      <Section title="Badges & severity">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Critical</Badge>
          <Badge variant="info">Info</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success-soft">On track</Badge>
          <Badge variant="warning-soft">At risk</Badge>
          <Badge variant="danger-soft">Late</Badge>
          <Badge variant="info-soft">Scheduled</Badge>
        </div>
      </Section>

      <Section title="Form controls">
        <div className="grid gap-6 rounded-xl border bg-card p-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="demo-name">Plant name</Label>
            <Input id="demo-name" placeholder="e.g. Mt. Pleasant" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="demo-notes">Notes</Label>
            <Textarea id="demo-notes" placeholder="Add context for the team…" />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Alert frequency</Label>
            <RadioGroup defaultValue="daily">
              <Label className="font-normal">
                <RadioGroupItem value="realtime" /> Real-time
              </Label>
              <Label className="font-normal">
                <RadioGroupItem value="daily" /> Daily digest
              </Label>
              <Label className="font-normal">
                <RadioGroupItem value="weekly" /> Weekly summary
              </Label>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <Label className="font-normal">
              <Switch defaultChecked /> Auto-refresh dashboards
            </Label>
            <Label className="font-normal">
              <Checkbox defaultChecked /> Include weekends
            </Label>
          </div>
        </div>
      </Section>

      <Section title="Alerts / message boxes">
        <div className="flex flex-col gap-3">
          <Alert>
            <Info />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Neutral informational message.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info />
            <AlertTitle>Refresh scheduled</AlertTitle>
            <AlertDescription>Snowflake refresh runs at 06:00 CT.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 />
            <AlertTitle>Forecast published</AlertTitle>
            <AlertDescription>All 14 plants received the new plan.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <TriangleAlert />
            <AlertTitle>Forecast stale</AlertTitle>
            <AlertDescription>Last refresh was 6 hours ago.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertTitle>Pipeline failed</AlertTitle>
            <AlertDescription>dbt run failed on model `fct_orders`.</AlertDescription>
          </Alert>
        </div>
      </Section>

      <Section title="Modal & toasts">
        <div className="flex flex-wrap items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publish forecast?</DialogTitle>
                <DialogDescription>
                  This pushes the current plan to all plant dashboards. It can be rolled
                  back within 24 hours.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={() => toast.success("Forecast published")}>
                    Publish
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => toast("Plain notification")}>
            Toast
          </Button>
          <Button variant="outline" onClick={() => toast.success("Saved")}>
            Success toast
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Forecast is stale")}>
            Warning toast
          </Button>
          <Button variant="outline" onClick={() => toast.error("Pipeline failed")}>
            Error toast
          </Button>
        </div>
      </Section>

      <Section title="Navigation & structure">
        <div className="flex flex-col gap-6 rounded-xl border bg-card p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/plant">Plant Ops</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Mt. Pleasant</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Muted>Overview tab content.</Muted>
            </TabsContent>
            <TabsContent value="orders">
              <Muted>Orders tab content.</Muted>
            </TabsContent>
            <TabsContent value="quality">
              <Muted>Quality tab content.</Muted>
            </TabsContent>
          </Tabs>
        </div>
      </Section>

      <Section title="Pickers">
        <PickersDemo />
      </Section>

      <Section title="Status & feedback">
        <div className="grid gap-6 rounded-xl border bg-card p-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Label>Tooltip</Label>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Refresh info">
                    <Info />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Data refreshes every 15 minutes.</TooltipContent>
              </Tooltip>
            </div>
            <Label>Avatar</Label>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/nonexistent.jpg" alt="" />
                <AvatarFallback>DU</AvatarFallback>
              </Avatar>
              <Avatar className="size-10">
                <AvatarFallback className="bg-tower-plant">MP</AvatarFallback>
              </Avatar>
            </div>
            <Label>Confirm dialog</Label>
            <div>
              <ConfirmDialog
                trigger={<Button variant="destructive">Delete plant</Button>}
                title="Delete Mt. Pleasant?"
                description="This removes the plant and all of its mappings. This cannot be undone."
                confirmLabel="Delete"
                destructive
                onConfirm={async () => {
                  await new Promise((r) => setTimeout(r, 800));
                  toast.error("Plant deleted");
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Progress</Label>
            <Progress value={72} />
            <Progress value={94} indicatorClassName="bg-success" />
            <Label>Loading</Label>
            <div className="flex items-center gap-3">
              <Spinner />
              <Button disabled variant="outline">
                <Spinner /> Loading…
              </Button>
            </div>
            <Label>Skeleton</Label>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
        <EmptyState>
          <EmptyStateIcon>
            <Inbox />
          </EmptyStateIcon>
          <EmptyStateTitle>No alerts</EmptyStateTitle>
          <EmptyStateDescription>
            New alerts appear here as they fire. Configure thresholds to start monitoring.
          </EmptyStateDescription>
          <EmptyStateAction>
            <Button variant="outline">Configure alerts</Button>
          </EmptyStateAction>
        </EmptyState>
      </Section>

      <Section title="KPI cards">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Orders shipped</KpiCardLabel>
              <KpiCardIcon>
                <Truck />
              </KpiCardIcon>
            </KpiCardHeader>
            <KpiCardValue>12,480</KpiCardValue>
            <KpiCardDelta trend="up" sentiment="good">
              +4.2% vs last week
            </KpiCardDelta>
          </KpiCard>
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Fill rate</KpiCardLabel>
              <KpiCardIcon>
                <Package />
              </KpiCardIcon>
            </KpiCardHeader>
            <KpiCardValue>96.8%</KpiCardValue>
            <KpiCardDelta trend="down" sentiment="bad">
              −0.6 pts vs target
            </KpiCardDelta>
          </KpiCard>
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Freight cost / lb</KpiCardLabel>
              <KpiCardIcon>
                <TrendingUp />
              </KpiCardIcon>
            </KpiCardHeader>
            <KpiCardValue>$0.142</KpiCardValue>
            <KpiCardDelta trend="flat">unchanged</KpiCardDelta>
          </KpiCard>
          <KpiCard>
            <KpiCardHeader>
              <KpiCardLabel>Open alerts</KpiCardLabel>
            </KpiCardHeader>
            <KpiCardValue>7</KpiCardValue>
            <KpiCardFootnote>3 critical · 4 warning</KpiCardFootnote>
          </KpiCard>
        </div>
      </Section>

      <Section title="Chart card">
        <ChartCard>
          <ChartCardHeader>
            <div className="flex flex-col gap-1">
              <ChartCardTitle>Weekly volume</ChartCardTitle>
              <ChartCardSubtitle>
                Cases shipped per plant, trailing 12 weeks
              </ChartCardSubtitle>
            </div>
            <ChartCardAction>
              <Button variant="outline" size="sm">
                Last 12 weeks
              </Button>
              <DataTableRowActions label="Chart options">
                <DropdownMenuItem onClick={() => toast.info("Exporting…")}>
                  <Download /> Export PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Opening query…")}>
                  <Eye /> View query
                </DropdownMenuItem>
              </DataTableRowActions>
            </ChartCardAction>
          </ChartCardHeader>
          <ChartCardContent>
            <BarChart labels={WEEKS} series={[{ label: "Cases", data: WEEKLY_CASES }]} />
            <ChartDataTable
              className="mt-2"
              labels={WEEKS}
              series={[{ label: "Cases", data: WEEKLY_CASES }]}
            />
          </ChartCardContent>
          <ChartCardFooter>
            <span>Source: Snowflake · fct_shipments</span>
            <span>Refreshed 5 min ago</span>
          </ChartCardFooter>
        </ChartCard>
      </Section>

      <Section title="Charts">
        <Muted>
          Chart.js + react-chartjs-2, themed to the 8-slot categorical palette validated
          against both surfaces (see globals.css). Colors are assigned by fixed slot
          order.
        </Muted>
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard>
            <ChartCardHeader>
              <div className="flex flex-col gap-1">
                <ChartCardTitle>Volume by plant</ChartCardTitle>
                <ChartCardSubtitle>Grouped bar, 3 series</ChartCardSubtitle>
              </div>
            </ChartCardHeader>
            <ChartCardContent>
              <BarChart
                labels={PLANTS.slice(0, 5)}
                series={PLANT_SERIES}
                yLabel="Cases"
              />
            </ChartCardContent>
          </ChartCard>

          <ChartCard>
            <ChartCardHeader>
              <div className="flex flex-col gap-1">
                <ChartCardTitle>Fill rate trend</ChartCardTitle>
                <ChartCardSubtitle>
                  Area chart, single series, semantic color override
                </ChartCardSubtitle>
              </div>
            </ChartCardHeader>
            <ChartCardContent>
              {/* `color` accepts semantic tokens ("success", "chart-3", …) or literal colors */}
              <LineChart
                labels={WEEKS}
                series={[{ label: "Fill rate", data: FILL_RATE, color: "success" }]}
                area
              />
            </ChartCardContent>
          </ChartCard>

          <ChartCard>
            <ChartCardHeader>
              <div className="flex flex-col gap-1">
                <ChartCardTitle>Orders by customer</ChartCardTitle>
                <ChartCardSubtitle>Pie, top 5 + Other</ChartCardSubtitle>
              </div>
            </ChartCardHeader>
            <ChartCardContent>
              <PieChart
                labels={customerSlices.map((s) => s.label)}
                data={customerSlices.map((s) => s.value)}
              />
            </ChartCardContent>
          </ChartCard>

          <ChartCard>
            <ChartCardHeader>
              <div className="flex flex-col gap-1">
                <ChartCardTitle>Case mix</ChartCardTitle>
                <ChartCardSubtitle>Doughnut, with center total</ChartCardSubtitle>
              </div>
            </ChartCardHeader>
            <ChartCardContent>
              <DoughnutChart
                labels={PLANTS.slice(0, 4)}
                data={[820, 640, 510, 390]}
                centerLabel={
                  <div className="text-center">
                    <div className="text-xl font-bold tabular-nums">2,360</div>
                    <div className="text-xs text-muted-foreground">total cases</div>
                  </div>
                }
              />
            </ChartCardContent>
          </ChartCard>

          <ChartCard>
            <ChartCardHeader>
              <div className="flex flex-col gap-1">
                <ChartCardTitle>Plant scorecard</ChartCardTitle>
                <ChartCardSubtitle>Radar, 2 series</ChartCardSubtitle>
              </div>
            </ChartCardHeader>
            <ChartCardContent>
              <RadarChart
                labels={["Fill rate", "On-time", "Quality", "Cost", "Safety"]}
                series={[
                  { label: "Mt. Pleasant", data: [92, 88, 95, 74, 90] },
                  { label: "Sanford", data: [85, 91, 88, 82, 86] },
                ]}
              />
            </ChartCardContent>
          </ChartCard>

          <ChartCard>
            <ChartCardHeader>
              <div className="flex flex-col gap-1">
                <ChartCardTitle>Cost vs. cases</ChartCardTitle>
                <ChartCardSubtitle>Scatter, one series</ChartCardSubtitle>
              </div>
            </ChartCardHeader>
            <ChartCardContent>
              <ScatterChart
                series={[{ label: "Orders", data: scatterPoints }]}
                xLabel="Cases"
                yLabel="Freight cost ($)"
              />
            </ChartCardContent>
          </ChartCard>
        </div>
      </Section>

      <Section title="Data table">
        <OrdersTableDemo />
      </Section>

      <Separator />
      <Footnote>
        Tokens live in <InlineCode>src/styles/globals.css</InlineCode>; components in{" "}
        <InlineCode>src/components/ui</InlineCode>.
      </Footnote>
    </main>
  );
}

/* ---------------------------------------------------------------- */

const SNOWFLAKE_ITEMS = [
  { value: "ITM-0041", label: "Boneless Skinless Breast", hint: "ITM-0041" },
  { value: "ITM-0042", label: "Breast Fillet, Portioned", hint: "ITM-0042" },
  { value: "ITM-0107", label: "Whole Wing, Jumbo", hint: "ITM-0107" },
  { value: "ITM-0113", label: "Wing Portion, 1st & 2nd", hint: "ITM-0113" },
  { value: "ITM-0230", label: "Leg Quarter, Export", hint: "ITM-0230" },
  { value: "ITM-0288", label: "Thigh Meat, Boneless", hint: "ITM-0288" },
  { value: "ITM-0301", label: "Tenderloin, Clipped", hint: "ITM-0301" },
];

function PickersDemo() {
  const [plant, setPlant] = useState<string>("");
  const [mappedItem, setMappedItem] = useState<string | null>(null);
  const [customers, setCustomers] = useState<string[]>([]);
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="grid gap-6 rounded-xl border bg-card p-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-2">
        <Label>Select</Label>
        <Select value={plant} onValueChange={setPlant}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a plant" />
          </SelectTrigger>
          <SelectContent>
            {PLANTS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Footnote>Fixed option list.</Footnote>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Combobox</Label>
        <Combobox
          options={SNOWFLAKE_ITEMS}
          value={mappedItem}
          onValueChange={setMappedItem}
          placeholder="Map to item…"
          searchPlaceholder="Search items…"
        />
        <Footnote>Searchable — the MDM mapping picker.</Footnote>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Multi combobox</Label>
        <MultiCombobox
          options={CUSTOMERS.map((c) => ({ value: c, label: c }))}
          values={customers}
          onValuesChange={setCustomers}
          placeholder="Filter customers…"
          searchPlaceholder="Search customers…"
        />
        <Footnote>Toggle many; stays open while picking.</Footnote>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Date range</Label>
        <DateRangePicker value={range} onValueChange={setRange} />
        <Footnote>For report filters.</Footnote>
      </div>
    </div>
  );
}

type Order = {
  id: string;
  plant: string;
  customer: string;
  status: "on-track" | "at-risk" | "late" | "delivered";
  cases: number;
  ship: string;
};

const STATUS_BADGE: Record<Order["status"], React.ReactNode> = {
  "on-track": <Badge variant="success-soft">On track</Badge>,
  "at-risk": <Badge variant="warning-soft">At risk</Badge>,
  late: <Badge variant="danger-soft">Late</Badge>,
  delivered: <Badge variant="info-soft">Delivered</Badge>,
};

const PLANTS = ["Mt. Pleasant", "Sanford", "Lufkin", "Waco", "Athens"];
const CUSTOMERS = ["Walmart", "Kroger", "Costco", "US Foods", "Sysco", "HEB"];
const STATUSES: Order["status"][] = ["on-track", "at-risk", "late", "delivered"];

const WEEKS = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"];
const WEEKLY_CASES = [3120, 3340, 2980, 3510, 3690, 3405, 3820, 3960];
const FILL_RATE = [94.2, 95.1, 93.8, 96.4, 97.0, 95.8, 96.9, 96.8];
const PLANT_SERIES = [
  { label: "This year", data: [1240, 980, 860, 720, 610] },
  { label: "Last year", data: [1080, 1020, 790, 680, 640] },
];

const CUSTOMER_VOLUMES = [
  { name: "Walmart", cases: 4820 },
  { name: "Kroger", cases: 3160 },
  { name: "Costco", cases: 2540 },
  { name: "US Foods", cases: 1890 },
  { name: "Sysco", cases: 1420 },
  { name: "HEB", cases: 980 },
  { name: "Publix", cases: 640 },
  { name: "Meijer", cases: 410 },
];
const customerSlices = groupIntoOthers(CUSTOMER_VOLUMES, {
  max: 5,
  getLabel: (c) => c.name,
  getValue: (c) => c.cases,
});

const scatterPoints = Array.from({ length: 16 }, (_, i) => ({
  x: 300 + i * 210 + ((i * 47) % 90),
  y: 420 + i * 38 + ((i * 73) % 160),
}));

function makeOrders(): Order[] {
  return Array.from({ length: 57 }, (_, i) => ({
    id: `SO-${(48210 + i * 7).toString()}`,
    plant: PLANTS[i % PLANTS.length],
    customer: CUSTOMERS[(i * 3) % CUSTOMERS.length],
    status: STATUSES[(i * 5) % STATUSES.length],
    cases: 240 + ((i * 137) % 4200),
    ship: `2026-07-${String((i % 28) + 1).padStart(2, "0")}`,
  }));
}

function OrdersTableDemo() {
  "use no memo"; // required for useDataTable (TanStack Table × React Compiler)
  const [data, setData] = useState<Order[]>(makeOrders);

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      selectionColumn<Order>(),
      {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order" />,
        cell: ({ getValue }) => (
          <span className="font-medium tabular-nums">{getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "plant",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Plant" />,
        cell: (ctx) => <EditableSelectCell {...ctx} options={PLANTS} />,
      },
      {
        accessorKey: "customer",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Customer" />
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ getValue }) => STATUS_BADGE[getValue<Order["status"]>()],
      },
      {
        accessorKey: "cases",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Cases" />,
        cell: (ctx) => <EditableNumberCell {...ctx} />,
      },
      {
        accessorKey: "ship",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ship date" />
        ),
        cell: ({ getValue }) => (
          <span className="tabular-nums">{getValue<string>()}</span>
        ),
      },
      {
        id: "actions",
        size: 40,
        enableSorting: false,
        enableGlobalFilter: false,
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <DataTableRowActions>
            <DropdownMenuItem onClick={() => toast.info(`Viewing ${row.original.id}`)}>
              <Eye /> View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info(`Flagged ${row.original.id}`)}>
              <Flag /> Flag for review
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setData((prev) => prev.filter((o) => o.id !== row.original.id));
                toast.error(`Deleted ${row.original.id}`);
              }}
            >
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DataTableRowActions>
        ),
      },
    ],
    [],
  );

  const table = useDataTable({
    data,
    columns,
    enableRowSelection: true,
    onUpdateData: (rowIndex, columnId, value) =>
      setData((prev) =>
        prev.map((row, i) => (i === rowIndex ? { ...row, [columnId]: value } : row)),
      ),
  });

  return (
    <DataTable table={table}>
      <Muted>
        Plant and Cases are editable — click a cell, Enter commits, Esc reverts.
      </Muted>
      <DataTableToolbar>
        <DataTableSearch placeholder="Search orders…" />
        <Button variant="outline" size="sm" className="ml-auto">
          <Download /> Export
        </Button>
      </DataTableToolbar>
      <DataTableContent onRowClick={(row) => row.toggleSelected()} />
      <DataTablePagination />
      <DataTableBulkActions<Order>>
        {(rows) => (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                toast.success(`Approved ${rows.length} order(s)`);
                table.resetRowSelection();
              }}
            >
              <CheckCircle2 /> Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                const ids = new Set(rows.map((r) => r.original.id));
                setData((prev) => prev.filter((o) => !ids.has(o.id)));
                table.resetRowSelection();
                toast.error(`Deleted ${ids.size} order(s)`);
              }}
            >
              <Trash2 /> Delete
            </Button>
          </>
        )}
      </DataTableBulkActions>
    </DataTable>
  );
}
