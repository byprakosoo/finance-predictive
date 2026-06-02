import { notFound } from "next/navigation";
import { AppShell, PageTitle } from "@/components/app-shell";
import { EntityDetail } from "@/components/wallet-detail";
import { entityClusters } from "@/lib/mock-data";

export function generateStaticParams() {
  return entityClusters.map((entity) => ({ id: entity.id }));
}

export default async function EntityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entity = entityClusters.find((item) => item.id === id);

  if (!entity) {
    notFound();
  }

  return (
    <AppShell>
      <PageTitle
        title={entity.name}
        description="Entity-level wallet clustering, confidence, and flow context."
      />
      <EntityDetail entity={entity} />
    </AppShell>
  );
}
