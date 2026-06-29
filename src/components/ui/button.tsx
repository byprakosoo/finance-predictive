import { cn } from "@/lib/utils";

const variants = {
  primary: "border border-cyan-200/20 bg-cyan-500 text-slate-100 shadow-[0_0_28px_rgba(6,182,212,0.18)] hover:bg-cyan-300",
  secondary: "border border-slate-600 bg-slate-800 text-slate-100 hover:border-cyan-300 hover:text-cyan-300",
  ghost: "text-slate-300 hover:bg-slate-800 hover:text-cyan-300",
  danger: "border border-rose-300/30 bg-rose-300/10 text-rose-200 hover:bg-rose-300/20",
};

export function Button({
  children,
  variant = "primary",
  size = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: "default" | "sm" | "icon";
}) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-md font-mono font-bold transition",
        size === "default" && "h-10 px-4 text-sm",
        size === "sm" && "h-8 px-3 text-xs",
        size === "icon" && "h-9 w-9",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
