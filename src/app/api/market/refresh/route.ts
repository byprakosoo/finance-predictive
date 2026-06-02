import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { marketService } from "@/server/services";

export async function POST() {
  await requireUser();
  return ok(marketService.refresh());
}
