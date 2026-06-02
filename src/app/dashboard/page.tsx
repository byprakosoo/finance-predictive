import { AppShell, PageTitle } from "@/components/app-shell";
import { AlphaScoreChart, AllocationChart, PortfolioMovementChart } from "@/components/charts";
import { HoldingsTable } from "@/components/holdings-table";
import { MetricCard } from "@/components/metric-card";
import { MacroBadge, SignalBadge } from "@/components/status-badges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { alphaCandidates, holdings, intelligenceAlerts, macroIndicators, morningBrief, portfolioSignals, portfolioSummary, walletIntelligence } from "@/lib/mock-data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageTitle
        title="Dashboard"
        description="Portfolio value, market context, rule-based signals, and alpha candidates in one review surface."
        action={
          <Link href="/portfolio">
            <Button>Manage holdings</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total portfolio value" value={formatCurrency(portfolioSummary.totalValue)} detail="Cached market prices" trend="neutral" />
        <MetricCard label="Unrealized P/L" value={formatCurrency(portfolioSummary.unrealizedPl)} detail={formatPercent(portfolioSummary.unrealizedPlPercent)} trend="up" />
        <MetricCard label="24h portfolio change" value={formatPercent(portfolioSummary.change24h)} detail={`Top loser: ${portfolioSummary.topLoser}`} trend="down" />
        <MetricCard label="Fear & Greed" value={`${portfolioSummary.fearGreed.value} ${portfolioSummary.fearGreed.label}`} detail="Alternative.me placeholder" trend="neutral" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader title="Portfolio movement" description="Five-day mock trend for layout and chart validation." />
          <CardContent>
            <PortfolioMovementChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Allocation" description="Current value by asset." />
          <CardContent>
            <AllocationChart holdings={holdings} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader title="Macro and sentiment" description="Simplified indicators used by the signal copy." action={<MacroBadge status={portfolioSummary.macroStatus} />} />
          <CardContent>
            <div className="space-y-3">
              {macroIndicators.map((indicator) => (
                <div key={indicator.id} className="flex items-start justify-between gap-4 rounded-md border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-950">{indicator.name}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{indicator.interpretation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{indicator.value}</p>
                    <Badge variant={indicator.trend === "UP" ? "warning" : indicator.trend === "DOWN" ? "positive" : "default"}>{indicator.trend}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Signals to review" description="Transparent rule-based outputs, not instructions." />
          <CardContent>
            <div className="space-y-3">
              {portfolioSignals.map((signal) => (
                <div key={signal.assetId} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium capitalize text-slate-950">{signal.assetId}</p>
                    <SignalBadge signal={signal.signal} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{signal.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader title="Portfolio holdings" description="Current value and P/L are calculated from mock market prices." />
          <CardContent className="p-0">
            <HoldingsTable holdings={holdings} signals={portfolioSignals} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Wallet intelligence preview" description="Bitcoin and Solana flow monitoring with first-party labels." action={<Link href="/wallets"><Button variant="secondary" size="sm">Open</Button></Link>} />
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-border p-3">
                <p className="text-xs uppercase text-muted-foreground">Tracked</p>
                <p className="mt-2 text-xl font-semibold">{walletIntelligence.length}</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="text-xs uppercase text-muted-foreground">Alerts</p>
                <p className="mt-2 text-xl font-semibold">{intelligenceAlerts.length}</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="text-xs uppercase text-muted-foreground">Chains</p>
                <p className="mt-2 text-xl font-semibold">BTC + SOL</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Labels are sourced from user input, public datasets with rights, or transparent heuristics. Proprietary label copying is intentionally excluded.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Alpha Hunter preview" description="Top ranked candidates for manual review." action={<Link href="/alpha-hunter"><Button variant="secondary" size="sm">View all</Button></Link>} />
          <CardContent>
            <AlphaScoreChart />
            <div className="mt-4 space-y-2">
              {alphaCandidates.slice(0, 3).map((candidate) => (
                <div key={candidate.assetId} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <span className="text-sm font-medium">{candidate.symbol}</span>
                  <span className="text-sm text-muted-foreground">Score {candidate.alphaScore}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Morning Brief preview" description={morningBrief.sourceFreshness} action={<Link href="/morning-brief"><Button variant="secondary" size="sm">Open</Button></Link>} />
          <CardContent>
            <h3 className="text-base font-semibold text-slate-950">{morningBrief.title} — {morningBrief.date}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{morningBrief.sections[0].body}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{morningBrief.sections[3].body}</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
