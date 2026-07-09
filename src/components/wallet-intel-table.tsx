import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ChainBadge, ConfidenceBadge } from "@/components/chain-badges";
import { Button } from "@/components/ui/button";
import type { EntityCluster, WalletIntelligence } from "@/lib/types";
import { formatCurrency, formatPercent, shortAddress } from "@/lib/utils";

export function WalletIntelTable({ wallets }: { wallets: WalletIntelligence[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="responsive-table w-full min-w-[920px] text-left text-sm">
        <thead className="border-b border-border bg-muted text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Wallet / Address</th>
            <th className="px-4 py-3 font-medium">Chain</th>
            <th className="px-4 py-3 font-medium">Entity</th>
            <th className="px-4 py-3 font-medium">Balance</th>
            <th className="px-4 py-3 font-medium">24h Flow</th>
            <th className="px-4 py-3 font-medium">Smart Flow</th>
            <th className="px-4 py-3 font-medium">Primary Label</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card/40">
          {wallets.map((wallet) => {
            const primaryLabel = wallet.labels[0];

            return (
              <tr key={`${wallet.chain}-${wallet.address}`}>
                <td data-label="Wallet / Address" className="px-4 py-4">
                  <div className="font-medium text-foreground">{shortAddress(wallet.address)}</div>
                  <div className="text-xs text-muted-foreground">{wallet.addressType}</div>
                </td>
                <td data-label="Chain" className="px-4 py-4">
                  <ChainBadge chain={wallet.chain} />
                </td>
                <td data-label="Entity" className="px-4 py-4">{wallet.entityName ?? "Unclustered"}</td>
                <td data-label="Balance" className="px-4 py-4 font-medium">{formatCurrency(wallet.balanceUsd, true)}</td>
                <td data-label="24h Flow" className={wallet.netFlow24hUsd >= 0 ? "px-4 py-4 text-success" : "px-4 py-4 text-danger"}>
                  {formatCurrency(wallet.netFlow24hUsd, true)}
                </td>
                <td data-label="Smart Flow" className="px-4 py-4">{wallet.smartFlowScore}/100</td>
                <td data-label="Primary Label" className="px-4 py-4">
                  <div className="space-y-1">
                    <div>{primaryLabel.label}</div>
                    <ConfidenceBadge confidence={primaryLabel.confidence} />
                  </div>
                </td>
                <td data-label="Action" className="px-4 py-4">
                  <Link href={`/wallets/${wallet.address}`}>
                    <Button variant="secondary" size="sm">
                      Open <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function EntityTable({ entities }: { entities: EntityCluster[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="responsive-table w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-border bg-muted text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Entity</th>
            <th className="px-4 py-3 font-medium">Chains</th>
            <th className="px-4 py-3 font-medium">Wallets</th>
            <th className="px-4 py-3 font-medium">Balance</th>
            <th className="px-4 py-3 font-medium">24h Flow</th>
            <th className="px-4 py-3 font-medium">Confidence</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card/40">
          {entities.map((entity) => (
            <tr key={entity.id}>
              <td data-label="Entity" className="px-4 py-4">
                <div className="font-medium text-foreground">{entity.name}</div>
                <div className="text-xs text-muted-foreground">{entity.category}</div>
              </td>
              <td data-label="Chains" className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {entity.chains.map((chain) => (
                    <ChainBadge key={chain} chain={chain} />
                  ))}
                </div>
              </td>
              <td data-label="Wallets" className="px-4 py-4">{entity.walletCount}</td>
              <td data-label="Balance" className="px-4 py-4">{formatCurrency(entity.balanceUsd, true)}</td>
              <td data-label="24h Flow" className={entity.netFlow24hUsd >= 0 ? "px-4 py-4 text-success" : "px-4 py-4 text-danger"}>
                {formatCurrency(entity.netFlow24hUsd, true)}
              </td>
              <td data-label="Confidence" className="px-4 py-4">
                <ConfidenceBadge confidence={entity.confidence} />
              </td>
              <td data-label="Action" className="px-4 py-4">
                <Link href={`/entities/${entity.id}`}>
                  <Button variant="secondary" size="sm">
                    Open <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FlowDelta({ value }: { value: number }) {
  const percent = value > 0 ? 18.4 : -9.2;
  return (
    <span className={value >= 0 ? "text-success" : "text-danger"}>
      {formatCurrency(value, true)} ({formatPercent(percent)})
    </span>
  );
}
