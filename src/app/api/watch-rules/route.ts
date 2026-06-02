import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createWatchRuleSchema } from "@/server/schemas";
import { intelligenceService } from "@/server/services";

export async function GET() {
  await requireUser();
  return ok(intelligenceService.watchRules());
}

export async function POST(request: Request) {
  await requireUser();
  const { data, response } = await parseJson(request, createWatchRuleSchema);
  if (response) return response;

  return created(intelligenceService.createWatchRule(data));
}
