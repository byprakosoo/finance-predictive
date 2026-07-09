import { Plus, Star } from "lucide-react";
import { RiskBadge } from "@/components/status-badges";
import { Button } from "@/components/ui/button";
import type { AlphaCandidate } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function AlphaTable({ candidates }: { candidates: AlphaCandidate[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="responsive-table w-full min-w-[960px] text-left text-sm">
        <thead className="border-b border-border bg-muted text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Rank</th>
            <th className="px-4 py-3 font-medium">Asset</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">24h</th>
            <th className="px-4 py-3 font-medium">7d</th>
            <th className="px-4 py-3 font-medium">Vol / Cap</th>
            <th className="px-4 py-3 font-medium">Score</th>
            <th className="px-4 py-3 font-medium">Risk</th>
            <th className="px-4 py-3 font-medium">Reason</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card/40">
          {candidates.map((candidate) => (
            <tr key={candidate.assetId}>
              <td data-label="Rank" className="px-4 py-4 font-semibold text-foreground">#{candidate.rank}</td>
              <td data-label="Asset" className="px-4 py-4">
                <div className="font-medium text-foreground">{candidate.name}</div>
                <div className="text-xs text-muted-foreground">{candidate.symbol}</div>
              </td>
              <td data-label="Price" className="px-4 py-4">{formatCurrency(candidate.priceUsd)}</td>
              <td data-label="24h" className={candidate.priceChange24h >= 0 ? "px-4 py-4 text-success" : "px-4 py-4 text-danger"}>
                {formatPercent(candidate.priceChange24h)}
              </td>
              <td data-label="7d" className={candidate.priceChange7d >= 0 ? "px-4 py-4 text-success" : "px-4 py-4 text-danger"}>
                {formatPercent(candidate.priceChange7d)}
              </td>
              <td data-label="Vol / Cap" className="px-4 py-4">{candidate.volumeToMarketCap.toFixed(1)}%</td>
              <td data-label="Score" className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${candidate.alphaScore}%` }} />
                  </div>
                  <span className="font-medium">{candidate.alphaScore}</span>
                </div>
              </td>
              <td data-label="Risk" className="px-4 py-4">
                <RiskBadge risk={candidate.riskLevel} />
              </td>
              <td data-label="Reason" data-full className="max-w-xs px-4 py-4 text-xs leading-5 text-muted-foreground">{candidate.rationale}</td>
              <td data-label="Action" className="px-4 py-4">
                <Button size="sm" variant={candidate.watched ? "secondary" : "primary"}>
                  {candidate.watched ? <Star className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {candidate.watched ? "Watching" : "Watch"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
