"use client";

import type { Holding, PortfolioSignal } from "@/lib/types";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { SignalBadge } from "@/components/status-badges";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export function HoldingsTable({
  holdings,
  signals,
  onEdit,
  onDelete,
}: {
  holdings: Holding[];
  signals: PortfolioSignal[];
  onEdit?: (holding: Holding) => void;
  onDelete?: (holding: Holding) => void;
}) {
  if (holdings.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center">
        <p className="font-medium text-slate-950">No holdings yet</p>
        <p className="mt-2 text-sm text-muted-foreground">Add your first crypto holding to calculate value and signals.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] text-left text-sm">
        <thead className="border-b border-border bg-slate-50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Asset</th>
            <th className="px-4 py-3 font-medium">Quantity</th>
            <th className="px-4 py-3 font-medium">Avg Buy</th>
            <th className="px-4 py-3 font-medium">Current</th>
            <th className="px-4 py-3 font-medium">Value</th>
            <th className="px-4 py-3 font-medium">P/L</th>
            <th className="px-4 py-3 font-medium">P/L %</th>
            <th className="px-4 py-3 font-medium">Signal</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {holdings.map((holding) => {
            const currentValue = holding.quantity * holding.currentPrice;
            const invested = holding.quantity * holding.averageBuyPrice;
            const pl = currentValue - invested;
            const plPercent = (pl / invested) * 100;
            const signal = signals.find((item) => item.assetId === holding.assetId);

            return (
              <tr key={holding.id}>
                <td className="px-4 py-4">
                  <div className="font-medium text-slate-950">{holding.name}</div>
                  <div className="text-xs text-muted-foreground">{holding.symbol}</div>
                </td>
                <td className="px-4 py-4">{formatNumber(holding.quantity)}</td>
                <td className="px-4 py-4">{formatCurrency(holding.averageBuyPrice)}</td>
                <td className="px-4 py-4">{formatCurrency(holding.currentPrice)}</td>
                <td className="px-4 py-4 font-medium">{formatCurrency(currentValue)}</td>
                <td className={pl >= 0 ? "px-4 py-4 text-emerald-700" : "px-4 py-4 text-rose-700"}>{formatCurrency(pl)}</td>
                <td className={plPercent >= 0 ? "px-4 py-4 text-emerald-700" : "px-4 py-4 text-rose-700"}>
                  {formatPercent(plPercent)}
                </td>
                <td className="px-4 py-4">{signal ? <SignalBadge signal={signal.signal} /> : null}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" aria-label={`Edit ${holding.symbol}`} onClick={() => onEdit?.(holding)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label={`Delete ${holding.symbol}`} onClick={() => onDelete?.(holding)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
