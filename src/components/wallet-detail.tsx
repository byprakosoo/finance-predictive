import Link from "next/link";
import { ChainBadge, ConfidenceBadge, SourceBadge } from "@/components/chain-badges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { EntityCluster, WalletIntelligence } from "@/lib/types";
import { formatCurrency, formatNumber, formatSats, shortAddress } from "@/lib/utils";

export function WalletDetail({ wallet }: { wallet: WalletIntelligence }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader
          title={shortAddress(wallet.address)}
          description={`${wallet.addressType} address observed from ${wallet.firstSeenAt} to ${wallet.lastSeenAt}.`}
          action={<ChainBadge chain={wallet.chain} />}
        />
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Balance" value={formatCurrency(wallet.balanceUsd, true)} />
            <Metric label="24h net flow" value={formatCurrency(wallet.netFlow24hUsd, true)} />
            <Metric label="Activity score" value={`${wallet.activityScore}/100`} />
            <Metric label="Smart flow score" value={`${wallet.smartFlowScore}/100`} />
          </div>
          {wallet.entityId ? (
            <div className="mt-4 rounded-md border border-slate-700 bg-slate-800 p-3 text-sm">
              Clustered with{" "}
              <Link className="font-medium text-primary" href={`/entities/${wallet.entityId}`}>
                {wallet.entityName}
              </Link>
              . Ownership is probabilistic unless backed by reviewed labels.
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Labels and provenance" description="Every label must include source type, confidence, and explanation." />
        <CardContent>
          <div className="grid gap-3 lg:grid-cols-2">
            {wallet.labels.map((label) => (
              <div key={`${label.label}-${label.sourceType}`} className="rounded-md border border-slate-700 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">{label.category}</Badge>
                  <ConfidenceBadge confidence={label.confidence} />
                  <SourceBadge source={label.sourceType} />
                </div>
                <h2 className="mt-3 text-sm font-semibold text-slate-100">{label.label}</h2>
                <p className="mt-2 text-xs leading-5 text-slate-400">{label.explanation}</p>
                <p className="mt-2 text-xs text-slate-400">Source: {label.sourceRef}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {wallet.chain === "BITCOIN" ? <BitcoinPanel wallet={wallet} /> : <SolanaPanel wallet={wallet} />}

      <Card>
        <CardHeader title="Recent normalized events" description="Raw chain data is normalized into shared wallet-flow events." />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-700 bg-slate-800 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Asset</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                  <th className="px-4 py-3 font-medium">Counterparty</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Tx</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-slate-900/80">
                {wallet.events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-4 py-4">{event.type.replaceAll("_", " ")}</td>
                    <td className="px-4 py-4">{event.asset}</td>
                    <td className="px-4 py-4">{formatNumber(event.amount, 4)}</td>
                    <td className="px-4 py-4">{formatCurrency(event.valueUsd, true)}</td>
                    <td className="px-4 py-4">{event.counterparty}</td>
                    <td className="px-4 py-4">{event.timestamp}</td>
                    <td className="px-4 py-4">{shortAddress(event.txHash)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function EntityDetail({ entity }: { entity: EntityCluster }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader
          title={entity.name}
          description={entity.rationale}
          action={<ConfidenceBadge confidence={entity.confidence} />}
        />
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Wallets" value={String(entity.walletCount)} />
            <Metric label="Balance" value={formatCurrency(entity.balanceUsd, true)} />
            <Metric label="24h net flow" value={formatCurrency(entity.netFlow24hUsd, true)} />
            <Metric label="Category" value={entity.category} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Cluster wallets" description="Relationships are confidence-scored and chain-aware." />
        <CardContent>
          <div className="space-y-3">
            {entity.wallets.map((wallet) => (
              <div key={`${wallet.chain}-${wallet.address}`} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-700 p-3">
                <div>
                  <p className="text-sm font-medium text-slate-100">{shortAddress(wallet.address)}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <ChainBadge chain={wallet.chain} />
                    <ConfidenceBadge confidence={wallet.confidence} />
                  </div>
                </div>
                <Link href={`/wallets/${wallet.address}`}>
                  <Button variant="secondary" size="sm">Open wallet</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BitcoinPanel({ wallet }: { wallet: WalletIntelligence }) {
  return (
    <Card>
      <CardHeader title="Bitcoin UTXO view" description="UTXO state is specific to Bitcoin and should not be treated like account balance history." />
      <CardContent>
        <div className="space-y-3">
          {wallet.bitcoinUtxos?.map((utxo) => (
            <div key={`${utxo.txid}-${utxo.vout}`} className="grid gap-2 rounded-md border border-slate-700 p-3 text-sm sm:grid-cols-[1fr_auto_auto] sm:items-center">
              <div>
                <p className="font-medium text-slate-100">{shortAddress(utxo.txid)}:{utxo.vout}</p>
                <p className="text-xs text-slate-400">Age: {utxo.ageDays} days</p>
              </div>
              <span>{formatSats(utxo.valueSats)}</span>
              <Badge variant={utxo.status === "UNSPENT" ? "positive" : "default"}>{utxo.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SolanaPanel({ wallet }: { wallet: WalletIntelligence }) {
  return (
    <Card>
      <CardHeader title="Solana program view" description="Program interactions summarize account activity from normalized Solana transactions." />
      <CardContent>
        <div className="space-y-3">
          {wallet.solanaPrograms?.map((program) => (
            <div key={program.program} className="rounded-md border border-slate-700 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-100">{program.program}</p>
                <Badge variant="info">{program.interactions24h} calls / 24h</Badge>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{program.interpretation}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-700 p-3">
      <p className="text-xs uppercase text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-100">{value}</p>
    </div>
  );
}
