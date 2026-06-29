import { created, ok, parseJson } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { createCategorySchema } from "@/server/schemas";
import { categoryService } from "@/server/services";

export async function GET() {
  const user = await requireUser();
  return ok({ categories: categoryService.list(user.id) });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const { data, response } = await parseJson(request, createCategorySchema);
  if (response) return response;
  return created(categoryService.create(user.id, data));
}
