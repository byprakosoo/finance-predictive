import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  detail,
  trend,
}: {
  label: string;
  value: string;
  detail?: string;
  trend?: "up" | "down" | "neutral";
}) {
  const positive = trend === "up";
  const negative = trend === "down";

  return (
    <Card>
      <CardContent className="min-h-32">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-normal text-muted-foreground">{label}</p>
          {trend && trend !== "neutral" ? (
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md",
                positive && "bg-emerald-50 text-emerald-700",
                negative && "bg-rose-50 text-rose-700",
              )}
            >
              {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-2xl font-semibold text-slate-950">{value}</p>
        {detail ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
