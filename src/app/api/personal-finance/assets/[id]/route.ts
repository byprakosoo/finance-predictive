import { notFound, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { updateAssetSchema } from "@/server/schemas";
import { personalAssetService } from "@/server/services";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  const asset = personalAssetService.get(user.id, id);
  return asset ? ok(asset) : notFound("Asset");
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  const { data, response } = await parseJson(request, updateAssetSchema);
  if (response) return response;
  const asset = personalAssetService.update(user.id, id, data);
  return asset ? ok(asset) : notFound("Asset");
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await context.params;
  return personalAssetService.delete(user.id, id)
    ? ok({ deleted: true })
    : notFound("Asset");
}
