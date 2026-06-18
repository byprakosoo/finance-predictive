import { notFound, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { updateCashFlowSchema } from "@/server/schemas";
import { cashFlowService } from "@/server/services";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  const { data, response } = await parseJson(request, updateCashFlowSchema);
  if (response) return response;
  const entry = cashFlowService.update(user.id, id, data);
  return entry ? ok(entry) : notFound("Cash flow entry");
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  return cashFlowService.delete(user.id, id)
    ? ok({ deleted: true })
    : notFound("Cash flow entry");
}
