import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createCashFlowSchema } from "@/server/schemas";
import { cashFlowService } from "@/server/services";

export async function GET(request: Request) {
  const user = await requireUser();
  const url = new URL(request.url);
  const entryType = (url.searchParams.get("entryType") as "income" | "expense" | null) ?? undefined;
  const categoryId = url.searchParams.get("categoryId") ?? undefined;
  const from = url.searchParams.get("from") ?? undefined;
  const to = url.searchParams.get("to") ?? undefined;
  const isRecurringParam = url.searchParams.get("isRecurring");
  const isRecurring = isRecurringParam === null ? undefined : isRecurringParam === "true";
  const limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : undefined;
  const offset = url.searchParams.get("offset") ? Number(url.searchParams.get("offset")) : undefined;
  return ok({ entries: cashFlowService.list(user.id, { entryType, categoryId, from, to, isRecurring, limit, offset }) });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const { data, response } = await parseJson(request, createCashFlowSchema);
  if (response) return response;
  return created(cashFlowService.create(user.id, data));
}
