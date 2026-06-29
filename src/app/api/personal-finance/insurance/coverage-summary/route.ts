import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { insuranceService } from "@/server/services";

export async function GET() {
  const user = await requireUser();
  return ok(insuranceService.coverageSummary(user.id));
}
