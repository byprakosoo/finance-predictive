import { AppShell, PageTitle } from "@/components/app-shell";
import { EntityTable } from "@/components/wallet-intel-table";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { entityClusters } from "@/lib/mock-data";

export default function EntitiesPage() {
  const totalWallets = entityClusters.reduce((sum, entity) => sum + entity.walletCount, 0);
  const totalBalance = entityClusters.reduce((sum, entity) => sum + entity.balanceUsd, 0);
  const totalFlow = entityClusters.reduce((sum, entity) => sum + entity.netFlow24hUsd, 0);

  return (
    <AppShell>
      <PageTitle
        title="Entities"
        description="Probabilistic wallet clusters with confidence-scored relationships. Bitcoin clusters are especially heuristic due to UTXO address behavior."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Entity clusters" value={String(entityClusters.length)} detail="Mock reviewed clusters" />
        <MetricCard label="Clustered wallets" value={String(totalWallets)} detail="Across Bitcoin and Solana" />
        <MetricCard label="Cluster balance" value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(totalBalance)} detail="Observed balance proxy" />
        <MetricCard label="24h net flow" value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(totalFlow)} detail="Normalized flow events" trend="up" />
      </div>

      <Card className="mt-4">
        <CardHeader title="Entity clusters" description="Clusters are intelligence hints, not guaranteed identity claims." />
        <CardContent className="p-0">
          <EntityTable entities={entityClusters} />
        </CardContent>
      </Card>
    </AppShell>
  );
}
