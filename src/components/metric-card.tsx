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
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{label}</p>
          {trend && trend !== "neutral" ? (
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md border",
                positive && "border-emerald-400/25 bg-emerald-400/10 text-emerald-400",
                negative && "border-rose-300/25 bg-rose-300/10 text-rose-300",
              )}
            >
              {positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            </span>
          ) : null}
        </div>
        <p className="mt-5 font-mono text-3xl font-semibold text-slate-100">{value}</p>
        {detail ? <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
