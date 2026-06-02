import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createHoldingSchema } from "@/server/schemas";
import { portfolioService } from "@/server/services";

export async function GET() {
  const user = await requireUser();
  return ok({ user, ...portfolioService.getPortfolio() });
}

export async function POST(request: Request) {
  await requireUser();
  const { data, response } = await parseJson(request, createHoldingSchema);
  if (response) return response;

  return created(portfolioService.createHolding(data));
}
