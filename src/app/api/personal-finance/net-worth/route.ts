import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { netWorthService } from "@/server/services";

export async function GET(request: Request) {
  const user = await requireUser();
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : undefined;
  const snapshots = netWorthService.list(user.id, limit);
  return ok({
    latest: snapshots[0] ?? null,
    history: snapshots,
  });
}
