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

// ============================================================================
// PERSONAL FINANCE SCHEMAS
// ============================================================================

const assetTypeEnum = z.enum([
  "cash", "rpu", "bond", "stock_idx", "stock_us",
  "gold", "crypto", "mutual_fund", "property", "other",
]);

const currencyEnum = z.enum(["IDR", "USD"]);

export const createAssetSchema = z.object({
  name: z.string().min(1).max(200),
  symbol: z.string().max(50).optional(),
  assetType: assetTypeEnum,
  quantity: z.coerce.number().nonnegative(),
  avgBuyPrice: z.coerce.number().nonnegative().optional(),
  currentPrice: z.coerce.number().nonnegative().optional(),
  currency: currencyEnum.default("IDR"),
  platform: z.string().max(100).optional(),
  notes: z.string().max(2000).optional(),
  isActive: z.coerce.boolean().default(true),
});

export const updateAssetSchema = createAssetSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field must be provided" }
);

export const createTransactionSchema = z.object({
  assetId: z.string().min(1),
  type: z.enum(["buy", "sell", "dividend", "interest", "split", "merge", "transfer_in", "transfer_out"]),
  quantity: z.coerce.number().nonnegative(),
  pricePerUnit: z.coerce.number().nonnegative(),
  totalAmount: z.coerce.number(),
  fees: z.coerce.number().nonnegative().default(0),
  currency: currencyEnum,
  transactionDate: z.string().min(1),
  notes: z.string().max(2000).optional(),
});

export const createCashFlowSchema = z.object({
  entryType: z.enum(["income", "expense"]),
  categoryId: z.string().optional(),
  amount: z.coerce.number().nonnegative(),
  currency: currencyEnum.default("IDR"),
  paymentMethod: z.string().max(50).optional(),
  description: z.string().max(500).optional(),
  isRecurring: z.coerce.boolean().default(false),
  recurringFrequency: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]).optional(),
  transactionDate: z.string().min(1),
  notes: z.string().max(2000).optional(),
});

export const updateCashFlowSchema = createCashFlowSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field must be provided" }
);

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  parentId: z.string().optional(),
  icon: z.string().max(50).optional(),
  color: z.string().max(20).optional(),
  budgetLimit: z.coerce.number().nonnegative().optional(),
  isActive: z.coerce.boolean().default(true),
});

export const updateCategorySchema = createCategorySchema.partial();

const goalTypeEnum = z.enum([
  "hajj", "education", "ev", "emergency", "retirement",
  "home", "wedding", "travel", "other",
]);

export const createGoalSchema = z.object({
  name: z.string().min(1).max(200),
  type: goalTypeEnum,
  targetAmount: z.coerce.number().positive(),
  currentAmount: z.coerce.number().nonnegative().default(0),
  currency: currencyEnum.default("IDR"),
  deadline: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  status: z.enum(["active", "paused", "completed", "cancelled"]).default("active"),
  description: z.string().max(2000).optional(),
  icon: z.string().max(50).optional(),
  color: z.string().max(20).optional(),
});

export const updateGoalSchema = createGoalSchema.partial();

export const createAllocationSchema = z.object({
  assetId: z.string().min(1),
  allocatedAmount: z.coerce.number().positive(),
  notes: z.string().max(2000).optional(),
});

export const createInsuranceSchema = z.object({
  policyType: z.enum(["life", "health", "critical_illness", "disability", "auto", "property", "other"]),
  provider: z.string().min(1).max(200),
  providerId: z.string().max(100).optional(),
  policyNumber: z.string().max(100).optional(),
  coverageAmount: z.coerce.number().nonnegative(),
  currency: currencyEnum.default("IDR"),
  premiumAmount: z.coerce.number().nonnegative(),
  premiumFrequency: z.enum(["monthly", "quarterly", "semi_annual", "annual", "one_time"]),
  startDate: z.string().min(1),
  expiryDate: z.string().optional(),
  beneficiary: z.string().max(200).optional(),
  isActive: z.coerce.boolean().default(true),
  akadType: z.enum(["tabarru", "tijarah", "mixed"]).optional(),
  isShariahCompliant: z.coerce.boolean().default(false),
  notes: z.string().max(2000).optional(),
});

export const updateInsuranceSchema = createInsuranceSchema.partial();

export const createRebalancingRuleSchema = z.object({
  assetType: assetTypeEnum,
  targetPct: z.coerce.number().min(0).max(100),
  thresholdPct: z.coerce.number().min(0).max(100).default(5),
  isActive: z.coerce.boolean().default(true),
});

export const updateRebalancingRuleSchema = createRebalancingRuleSchema.partial();

export const createNetWorthSnapshotSchema = z.object({
  snapshotDate: z.string().min(1),
  totalAssets: z.coerce.number().nonnegative(),
  totalLiabilities: z.coerce.number().nonnegative().default(0),
  netWorth: z.coerce.number(),
  breakdownJson: z.record(z.string(), z.number()).optional(),
  currency: currencyEnum.default("IDR"),
  notes: z.string().max(2000).optional(),
});
