import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/**
 * Accessible fallback for any chart: a plain data table behind a
 * disclosure. This is the "table view" relief the dataviz skill requires
 * wherever a categorical color sits below 3:1 contrast (our teal and
 * amber slots do, on the light surface) — screen readers and anyone who
 * can't distinguish the fill still get the exact values.
 *
 *   <ChartDataTable labels={weeks} series={[{ label: "Cases", data }]} />
 */
function ChartDataTable({
  labels,
  series,
  className,
}: {
  labels: string[];
  series: { label: string; data: number[] }[];
  className?: string;
}) {
  return (
    <details className={cn("group text-sm", className)}>
      <summary className="cursor-pointer text-xs font-medium text-muted-foreground transition-colors select-none hover:text-foreground">
        View as table
      </summary>
      <div className="mt-2 overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead />
              {series.map((s) => (
                <TableHead key={s.label}>{s.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {labels.map((label, rowIndex) => (
              <TableRow key={label}>
                <TableCell className="font-medium">{label}</TableCell>
                {series.map((s) => (
                  <TableCell key={s.label} className="tabular-nums">
                    {s.data[rowIndex]?.toLocaleString() ?? "—"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </details>
  );
}

export { ChartDataTable };
