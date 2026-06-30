import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-slate-700 bg-slate-950/35 text-slate-100 shadow-[0_0_45px_rgba(34,211,238,0.04)]", className)}>
      {children}
    </section>
  );
}

export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-16 flex-wrap items-start justify-between gap-3 border-b border-slate-700 px-5 py-5">
      <div>
        <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-5", className)}>{children}</div>;
}
