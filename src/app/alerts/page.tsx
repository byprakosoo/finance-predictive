import { Bell, Pause, Plus } from "lucide-react";
import { AppShell, PageTitle } from "@/components/app-shell";
import { ChainBadge } from "@/components/chain-badges";
import { MetricCard } from "@/components/metric-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { intelligenceAlerts, watchRules } from "@/lib/mock-data";

export default function AlertsPage() {
  return (
    <AppShell>
      <PageTitle
        title="Alerts"
        description="Watch rules for wallet, entity, and chain-flow activity. Alerts describe observed behavior only."
        action={
          <Button>
            <Plus className="h-4 w-4" /> New rule
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active rules" value={String(watchRules.filter((rule) => rule.status === "ACTIVE").length)} detail="Mock rule engine" />
        <MetricCard label="Open alerts" value={String(intelligenceAlerts.length)} detail="Current session" />
        <MetricCard label="Bitcoin alerts" value={String(intelligenceAlerts.filter((alert) => alert.chain === "BITCOIN").length)} detail="UTXO/flow events" />
        <MetricCard label="Solana alerts" value={String(intelligenceAlerts.filter((alert) => alert.chain === "SOLANA").length)} detail="Program/token events" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader title="Watch rules" description="Rules will later be evaluated by backend workers." />
          <CardContent>
            <div className="space-y-3">
              {watchRules.map((rule) => (
                <div key={rule.id} className="rounded-md border border-slate-700 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-100">{rule.name}</h2>
                    <div className="flex items-center gap-2">
                      {rule.chain !== "ALL" ? <ChainBadge chain={rule.chain} /> : <Badge variant="default">ALL</Badge>}
                      <Badge variant={rule.status === "ACTIVE" ? "positive" : "default"}>{rule.status}</Badge>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{rule.target}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{rule.condition}</p>
                  <Button className="mt-3" variant="secondary" size="sm">
                    <Pause className="h-4 w-4" /> Pause
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Recent alerts" description="No proprietary labels or identity claims are required to trigger these alerts." />
          <CardContent>
            <div className="space-y-3">
              {intelligenceAlerts.map((alert) => (
                <div key={alert.id} className="rounded-md border border-slate-700 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-amber-600" />
                      <h2 className="text-sm font-semibold text-slate-100">{alert.title}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChainBadge chain={alert.chain} />
                      <Badge variant={alert.severity === "HIGH" ? "danger" : alert.severity === "MEDIUM" ? "warning" : "default"}>
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{alert.timestamp} · {alert.target}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{alert.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
