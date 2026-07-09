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
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
          {trend && trend !== "neutral" ? (
            <span
              aria-label={positive ? "Trending up" : "Trending down"}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md border",
                positive && "border-success/25 bg-success/10 text-success",
                negative && "border-danger/25 bg-danger/10 text-danger",
              )}
            >
              {positive ? <ArrowUpRight className="h-4 w-4" aria-hidden /> : <ArrowDownRight className="h-4 w-4" aria-hidden />}
            </span>
          ) : null}
        </div>
        <p className="mt-5 font-mono text-3xl font-semibold text-foreground">{value}</p>
        {detail ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
