import { NextResponse } from "next/server";
import type { ZodTypeAny, z } from "zod";
import { ZodError } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function created<T>(data: T) {
  return ok(data, { status: 201 });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: { message, details } }, { status });
}

export function notFound(resource: string) {
  return fail(`${resource} not found`, 404);
}

export function validationError(error: ZodError) {
  return fail("Invalid request body", 422, error.flatten());
}

export async function parseJson<T extends ZodTypeAny>(
  request: Request,
  schema: T
): Promise<{ data: z.infer<T> | null; response: NextResponse | null }> {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return { data: null, response: validationError(parsed.error) };
  }

  return { data: parsed.data as z.infer<T>, response: null };
}
