import { cn } from "@/lib/utils";

const variants = {
  primary: "border border-accent/20 bg-primary text-primary-foreground shadow-glow hover:bg-accent",
  secondary: "border border-border bg-secondary text-secondary-foreground hover:border-accent hover:text-accent",
  ghost: "text-muted-foreground hover:bg-secondary hover:text-accent",
  danger: "border border-danger/30 bg-danger/10 text-danger hover:bg-danger/20",
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
