import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { cashFlowService } from "@/server/services";

export async function GET(request: Request) {
  const user = await requireUser();
  const url = new URL(request.url);
  const from = url.searchParams.get("from") ?? undefined;
  const to = url.searchParams.get("to") ?? undefined;
  return ok(cashFlowService.summary(user.id, { from, to }));
}
