import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createInsuranceSchema } from "@/server/schemas";
import { insuranceService } from "@/server/services";

export async function GET() {
  const user = await requireUser();
  return ok({ policies: insuranceService.list(user.id) });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const { data, response } = await parseJson(request, createInsuranceSchema);
  if (response) return response;
  return created(insuranceService.create(user.id, data));
}
