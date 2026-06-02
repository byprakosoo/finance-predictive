import { AppShell, PageTitle } from "@/components/app-shell";
import { ChainBadge } from "@/components/chain-badges";
import { WalletIntelTable } from "@/components/wallet-intel-table";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { walletIntelligence } from "@/lib/mock-data";

export default function WalletsPage() {
  const bitcoinWallets = walletIntelligence.filter((wallet) => wallet.chain === "BITCOIN");
  const solanaWallets = walletIntelligence.filter((wallet) => wallet.chain === "SOLANA");
  const totalBalance = walletIntelligence.reduce((sum, wallet) => sum + wallet.balanceUsd, 0);
  const netFlow = walletIntelligence.reduce((sum, wallet) => sum + wallet.netFlow24hUsd, 0);

  return (
    <AppShell>
      <PageTitle
        title="Wallet Intelligence"
        description="Chain-aware wallet monitoring for Bitcoin and Solana using first-party labels, heuristics, and explicit provenance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Tracked wallets" value={String(walletIntelligence.length)} detail="Mock monitored addresses" />
        <MetricCard label="Bitcoin addresses" value={String(bitcoinWallets.length)} detail="UTXO-aware tracking" />
        <MetricCard label="Solana accounts" value={String(solanaWallets.length)} detail="Program-aware tracking" />
        <MetricCard label="24h net flow" value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(netFlow)} detail={`Balance: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(totalBalance)}`} trend="up" />
      </div>

      <Card className="mt-4">
        <CardHeader
          title="Tracked wallets"
          description="Labels are not imported from proprietary providers. Each label includes source, confidence, and rationale."
          action={
            <div className="flex gap-2">
              <ChainBadge chain="BITCOIN" />
              <ChainBadge chain="SOLANA" />
            </div>
          }
        />
        <CardContent className="p-0">
          <WalletIntelTable wallets={walletIntelligence} />
        </CardContent>
      </Card>
    </AppShell>
  );
}
