import { Badge } from "@/components/ui/badge";
import type { BadgeVariant } from "@/components/ui/badge";
import type { MacroStatus, MarketStatus, PortfolioSignalType, RiskLevel } from "@/lib/types";

export function SignalBadge({ signal }: { signal: PortfolioSignalType }) {
  const labels: Record<PortfolioSignalType, string> = {
    BUY_ZONE: "Potential buy zone",
    HOLD: "Hold",
    TAKE_PROFIT: "Profit review",
    RISK_WARNING: "Risk warning",
    NO_DATA: "No data",
  };
  const variants: Record<PortfolioSignalType, BadgeVariant> = {
    BUY_ZONE: "info",
    HOLD: "default",
    TAKE_PROFIT: "positive",
    RISK_WARNING: "danger",
    NO_DATA: "warning",
  };

  return <Badge variant={variants[signal]}>{labels[signal]}</Badge>;
}

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return <Badge variant={risk === "HIGH" ? "danger" : risk === "MEDIUM" ? "warning" : "positive"}>{risk}</Badge>;
}

export function MacroBadge({ status }: { status: MacroStatus }) {
  const label = status.replace("_", "-");
  return <Badge variant={status === "RISK_ON" ? "positive" : status === "RISK_OFF" ? "danger" : "warning"}>{label}</Badge>;
}

export function MarketBadge({ status }: { status: MarketStatus }) {
  return <Badge variant={status === "BULLISH" ? "positive" : status === "BEARISH" ? "danger" : "warning"}>{status}</Badge>;
}
