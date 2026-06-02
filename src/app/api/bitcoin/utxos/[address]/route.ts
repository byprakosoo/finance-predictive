import { notFound, ok } from "@/server/api-response";
import { requireUser } from "@/server/auth";
import { intelligenceService } from "@/server/services";

export async function GET(_request: Request, context: { params: Promise<{ address: string }> }) {
  await requireUser();
  const { address } = await context.params;
  const utxos = intelligenceService.bitcoinUtxos(decodeURIComponent(address));
  return utxos ? ok(utxos) : notFound("Bitcoin UTXOs");
}
