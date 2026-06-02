import { ok } from "@/server/api-response";

export async function GET() {
  return ok({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
