import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { briefService } from "@/server/services";

export async function GET() {
  await requireUser();
  return ok(briefService.getTodayBrief());
}
