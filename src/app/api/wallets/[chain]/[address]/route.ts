import { fail, notFound, ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { intelligenceService } from "@/server/services";
import type { Chain } from "@/lib/types";

const chains = ["BITCOIN", "SOLANA"];

export async function GET(_request: Request, context: { params: Promise<{ chain: string; address: string }> }) {
  await requireUser();
  const { chain, address } = await context.params;

  if (!chains.includes(chain)) {
    return fail("Unsupported chain", 400);
  }

  const wallet = intelligenceService.wallet(chain as Chain, decodeURIComponent(address));
  return wallet ? ok(wallet) : notFound("Wallet");
}
