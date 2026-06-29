import { cn } from "@/lib/utils";

const variants = {
  default: "border-slate-600 bg-slate-800 text-slate-200",
  positive: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  warning: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  danger: "border-rose-300/30 bg-rose-300/10 text-rose-200",
  info: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
};

export type BadgeVariant = keyof typeof variants;

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 font-mono text-xs font-medium uppercase tracking-[0.12em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
