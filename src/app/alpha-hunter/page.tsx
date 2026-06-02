import { AppShell, PageTitle } from "@/components/app-shell";
import { AlphaTable } from "@/components/alpha-table";
import { AlphaScoreChart } from "@/components/charts";
import { MetricCard } from "@/components/metric-card";
import { RiskBadge } from "@/components/status-badges";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { alphaCandidates, watchlist } from "@/lib/mock-data";

export default function AlphaHunterPage() {
  return (
    <AppShell>
      <PageTitle
        title="Alpha Hunter"
        description="Ranked altcoin candidates based on public market data factors. Candidates are for manual review only."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Strong candidates" value="4" detail="Score above 70" />
        <MetricCard label="Highest score" value="86" detail="TIA leads this mock set" trend="up" />
        <MetricCard label="High risk" value="1" detail="Volatility penalty active" trend="down" />
        <MetricCard label="Watchlist" value={String(watchlist.length)} detail="Mock saved assets" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <CardHeader title="Score distribution" description="Alpha score range across current candidates." />
          <CardContent>
            <AlphaScoreChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Watchlist" description="Saved candidates with short rationale." />
          <CardContent>
            <div className="space-y-3">
              {watchlist.map((item) => (
                <div key={item.id} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-950">{item.name} <span className="text-muted-foreground">{item.symbol}</span></p>
                    <RiskBadge risk={item.alphaScore > 80 ? "MEDIUM" : "LOW"} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.rationale}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader title="Top alpha candidates" description="Filters assume market cap rank <= 500, volume > $1M, and market cap > $10M." />
        <CardContent className="p-0">
          <AlphaTable candidates={alphaCandidates} />
        </CardContent>
      </Card>
    </AppShell>
  );
}
