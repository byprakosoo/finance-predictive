import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createTransactionSchema } from "@/server/schemas";
import { assetTransactionService } from "@/server/services";

export async function GET(request: Request) {
  const user = await requireUser();
  const url = new URL(request.url);
  const assetId = url.searchParams.get("assetId") ?? undefined;
  const type = url.searchParams.get("type") ?? undefined;
  const from = url.searchParams.get("from") ?? undefined;
  const to = url.searchParams.get("to") ?? undefined;
  const limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : undefined;
  const offset = url.searchParams.get("offset") ? Number(url.searchParams.get("offset")) : undefined;
  return ok({ transactions: assetTransactionService.list(user.id, { assetId, type, from, to, limit, offset }) });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const { data, response } = await parseJson(request, createTransactionSchema);
  if (response) return response;
  return created(assetTransactionService.create(user.id, data));
}
