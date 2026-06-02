import { notFound, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { updateHoldingSchema } from "@/server/schemas";
import { portfolioService } from "@/server/services";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await context.params;
  const { data, response } = await parseJson(request, updateHoldingSchema);
  if (response) return response;

  const holding = portfolioService.updateHolding(id, data);
  return holding ? ok(holding) : notFound("Holding");
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await context.params;
  return portfolioService.deleteHolding(id) ? ok({ deleted: true }) : notFound("Holding");
}
