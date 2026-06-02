import { AppShell, PageTitle } from "@/components/app-shell";
import { HoldingManager } from "@/components/holding-manager";
import { holdings, portfolioSignals } from "@/lib/mock-data";

export default function PortfolioPage() {
  return (
    <AppShell>
      <PageTitle
        title="Portfolio"
        description="Add, edit, and remove manual holdings in a mock session. Backend persistence is intentionally deferred."
      />
      <HoldingManager initialHoldings={holdings} signals={portfolioSignals} />
    </AppShell>
  );
}
