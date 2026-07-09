import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex items-start gap-3 border-t border-border bg-card/80 px-4 py-3 text-xs leading-5 text-muted-foreground md:px-6">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden />
      <p>
        This product provides market data and educational analysis only. It does not provide financial advice.
        Always do your own research before making investment decisions.
      </p>
    </div>
  );
}
