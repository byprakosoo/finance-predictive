import { Badge } from "@/components/ui/badge";
import type { Chain, ConfidenceLevel, LabelSourceType } from "@/lib/types";

export function ChainBadge({ chain }: { chain: Chain }) {
  return <Badge variant={chain === "BITCOIN" ? "warning" : "info"}>{chain}</Badge>;
}

export function ConfidenceBadge({ confidence }: { confidence: ConfidenceLevel }) {
  return (
    <Badge variant={confidence === "HIGH" ? "positive" : confidence === "MEDIUM" ? "warning" : "default"}>
      {confidence} confidence
    </Badge>
  );
}

export function SourceBadge({ source }: { source: LabelSourceType }) {
  const variant = source === "USER_SUBMITTED" || source === "ADMIN_REVIEWED" ? "positive" : source === "HEURISTIC" ? "warning" : "default";
  return <Badge variant={variant}>{source.replaceAll("_", " ")}</Badge>;
}
