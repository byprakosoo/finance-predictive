import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { rebalancingService } from "@/server/services";

export async function GET() {
  const user = await requireUser();
  return ok(rebalancingService.status(user.id));
}
