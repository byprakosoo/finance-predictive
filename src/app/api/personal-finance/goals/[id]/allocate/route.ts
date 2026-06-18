import { notFound, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createAllocationSchema } from "@/server/schemas";
import { goalService } from "@/server/services";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  const { data, response } = await parseJson(request, createAllocationSchema);
  if (response) return response;
  const allocation = goalService.allocate(user.id, id, data);
  return allocation ? ok(allocation) : notFound("Goal");
}
