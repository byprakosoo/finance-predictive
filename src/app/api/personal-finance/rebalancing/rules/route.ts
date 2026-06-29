import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createRebalancingRuleSchema } from "@/server/schemas";
import { rebalancingService } from "@/server/services";

export async function GET() {
  const user = await requireUser();
  return ok({ rules: rebalancingService.listRules(user.id) });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const { data, response } = await parseJson(request, createRebalancingRuleSchema);
  if (response) return response;
  return created(rebalancingService.createRule(user.id, data));
}
