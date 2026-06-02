import { z } from "zod";

export const createHoldingSchema = z.object({
  assetId: z.string().min(1),
  symbol: z.string().min(1).max(16),
  name: z.string().min(1),
  quantity: z.coerce.number().positive(),
  averageBuyPrice: z.coerce.number().positive(),
  notes: z.string().max(1000).optional(),
});

export const updateHoldingSchema = createHoldingSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "At least one field must be provided",
});

export const createWatchlistItemSchema = z.object({
  assetId: z.string().min(1),
  symbol: z.string().min(1).max(16),
  name: z.string().min(1),
  alphaScore: z.coerce.number().min(0).max(100),
  currentPrice: z.coerce.number().nonnegative(),
  rationale: z.string().min(1),
  notes: z.string().max(1000).optional(),
});

export const createWatchRuleSchema = z.object({
  name: z.string().min(1),
  chain: z.enum(["BITCOIN", "SOLANA", "ALL"]),
  target: z.string().min(1),
  condition: z.string().min(1),
});
