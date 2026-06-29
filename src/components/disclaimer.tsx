import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex items-start gap-3 border-t border-slate-700 bg-slate-900/80 px-4 py-3 text-xs leading-5 text-slate-400 md:px-6">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
      <p>
        This product provides market data and educational analysis only. It does not provide financial advice.
        Always do your own research before making investment decisions.
      </p>
    </div>
  );
}
