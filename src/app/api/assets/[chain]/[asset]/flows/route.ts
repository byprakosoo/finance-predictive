import { fail, ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { intelligenceService } from "@/server/services";
import type { Chain } from "@/lib/types";

const chains = ["BITCOIN", "SOLANA"];

export async function GET(_request: Request, context: { params: Promise<{ chain: string; asset: string }> }) {
  await requireUser();
  const { chain, asset } = await context.params;

  if (!chains.includes(chain)) {
    return fail("Unsupported chain", 400);
  }

  return ok(intelligenceService.assetFlows(chain as Chain, asset));
}
