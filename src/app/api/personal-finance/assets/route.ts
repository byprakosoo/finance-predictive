import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createAssetSchema } from "@/server/schemas";
import { personalAssetService } from "@/server/services";

export async function GET(request: Request) {
  const user = await requireUser();
  const url = new URL(request.url);
  const assetType = url.searchParams.get("assetType") ?? undefined;
  const platform = url.searchParams.get("platform") ?? undefined;
  const isActiveParam = url.searchParams.get("isActive");
  const isActive = isActiveParam === null ? undefined : isActiveParam === "true";
  const assets = personalAssetService.list(user.id, { assetType, platform, isActive });
  return ok({ assets, summary: personalAssetService.summary(user.id) });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const { data, response } = await parseJson(request, createAssetSchema);
  if (response) return response;
  return created(personalAssetService.create(user.id, data));
}
