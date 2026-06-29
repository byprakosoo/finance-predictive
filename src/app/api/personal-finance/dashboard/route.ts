import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { personalDashboardService } from "@/server/services";

export async function GET() {
  const user = await requireUser();
  return ok(await personalDashboardService.snapshot(user.id));
}
