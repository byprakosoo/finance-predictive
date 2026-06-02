import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { macroService } from "@/server/services";

export async function POST() {
  await requireUser();
  return ok(macroService.refresh());
}
