import { ok } from "@/server/api-response";
import { intelligenceService } from "@/server/services";

export async function GET() {
  return ok(intelligenceService.chains());
}
