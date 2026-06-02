import { notFound, ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { intelligenceService } from "@/server/services";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await context.params;
  const entity = intelligenceService.entity(id);
  return entity ? ok(entity) : notFound("Entity");
}
