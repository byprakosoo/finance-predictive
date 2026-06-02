import { fail, ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { intelligenceService } from "@/server/services";
import type { Chain } from "@/lib/types";

const chains = ["BITCOIN", "SOLANA"];

export async function GET(request: Request) {
  await requireUser();
  const { searchParams } = new URL(request.url);
  const chain = searchParams.get("chain");

  if (chain && !chains.includes(chain)) {
    return fail("Unsupported chain", 400);
  }

  return ok(intelligenceService.wallets(chain as Chain | undefined));
}
