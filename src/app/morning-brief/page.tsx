import { AppShell, PageTitle } from "@/components/app-shell";
import { MacroBadge, MarketBadge } from "@/components/status-badges";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { morningBrief } from "@/lib/mock-data";

export default function MorningBriefPage() {
  return (
    <AppShell>
      <PageTitle
        title="Morning Brief"
        description="A daily review template generated once per day in the future backend flow. This page uses saved mock content."
      />

      <Card>
        <CardHeader
          title={`${morningBrief.title} — ${morningBrief.date}`}
          description={morningBrief.sourceFreshness}
          action={
            <div className="flex flex-wrap gap-2">
              <MarketBadge status={morningBrief.marketStatus} />
              <MacroBadge status={morningBrief.macroStatus} />
            </div>
          }
        />
        <CardContent>
          <div className="mb-5 flex flex-wrap gap-2">
            <Badge variant="default">Generated {morningBrief.generatedAt}</Badge>
            <Badge variant="warning">Decision support only</Badge>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {morningBrief.sections.map((section) => (
              <section key={section.title} className="rounded-md border border-border p-4">
                <h2 className="text-sm font-semibold text-slate-950">{section.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.body}</p>
              </section>
            ))}
            <section className="rounded-md border border-rose-200 bg-rose-50 p-4">
              <h2 className="text-sm font-semibold text-rose-900">Risk warning</h2>
              <p className="mt-3 text-sm leading-6 text-rose-800">
                High volatility assets can move sharply in either direction. Review position sizing, liquidity, and thesis quality before taking any action.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
