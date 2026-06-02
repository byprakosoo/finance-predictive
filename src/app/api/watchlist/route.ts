import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createWatchlistItemSchema } from "@/server/schemas";
import { watchlistService } from "@/server/services";

export async function GET() {
  await requireUser();
  return ok(watchlistService.list());
}

export async function POST(request: Request) {
  await requireUser();
  const { data, response } = await parseJson(request, createWatchlistItemSchema);
  if (response) return response;

  return created(watchlistService.create(data));
}
