import { ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { alphaService } from "@/server/services";

export async function GET() {
  await requireUser();
  return ok(alphaService.getCandidates());
}
