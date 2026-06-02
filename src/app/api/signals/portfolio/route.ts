import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { portfolioService } from "@/server/services";

export async function GET() {
  await requireUser();
  return ok(portfolioService.getSignals());
}
