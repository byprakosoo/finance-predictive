import { created, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createNetWorthSnapshotSchema } from "@/server/schemas";
import { netWorthService } from "@/server/services";

export async function POST(request: Request) {
  const user = await requireUser();
  const { data, response } = await parseJson(request, createNetWorthSnapshotSchema);
  if (response) return response;
  return created(netWorthService.create(user.id, data));
}
