import { notFound, ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { watchlistService } from "@/server/services";

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await context.params;
  return watchlistService.delete(id) ? ok({ deleted: true }) : notFound("Watchlist item");
}
