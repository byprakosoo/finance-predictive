import { notFound, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { updateGoalSchema } from "@/server/schemas";
import { goalService } from "@/server/services";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  const goal = goalService.get(user.id, id);
  return goal ? ok(goal) : notFound("Goal");
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  const { data, response } = await parseJson(request, updateGoalSchema);
  if (response) return response;
  const goal = goalService.update(user.id, id, data);
  return goal ? ok(goal) : notFound("Goal");
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  return goalService.delete(user.id, id)
    ? ok({ deleted: true })
    : notFound("Goal");
}
