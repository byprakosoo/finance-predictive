import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createGoalSchema } from "@/server/schemas";
import { goalService } from "@/server/services";

export async function GET(request: Request) {
  const user = await requireUser();
  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? undefined;
  const status = url.searchParams.get("status") ?? undefined;
  const priority = url.searchParams.get("priority") ?? undefined;
  return ok({ goals: goalService.list(user.id, { type, status, priority }) });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const { data, response } = await parseJson(request, createGoalSchema);
  if (response) return response;
  return created(goalService.create(user.id, data));
}
