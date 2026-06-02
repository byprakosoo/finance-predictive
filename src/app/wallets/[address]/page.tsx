import { notFound } from "next/navigation";
import { AppShell, PageTitle } from "@/components/app-shell";
import { WalletDetail } from "@/components/wallet-detail";
import { walletIntelligence } from "@/lib/mock-data";
import { shortAddress } from "@/lib/utils";

export function generateStaticParams() {
  return walletIntelligence.map((wallet) => ({ address: wallet.address }));
}

export default async function WalletDetailPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;
  const wallet = walletIntelligence.find((item) => item.address === address);

  if (!wallet) {
    notFound();
  }

  return (
    <AppShell>
      <PageTitle
        title={`Wallet ${shortAddress(wallet.address)}`}
        description="Observed on-chain behavior, first-party labels, and chain-specific intelligence panels."
      />
      <WalletDetail wallet={wallet} />
    </AppShell>
  );
}
