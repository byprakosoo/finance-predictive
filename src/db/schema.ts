import {
  boolean,
  decimal,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  image: varchar("image", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex("users_email_idx").on(table.email),
}));

export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  token: varchar("token", { length: 512 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = mysqlTable("accounts", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  provider: varchar("provider", { length: 64 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 191 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  providerIdx: uniqueIndex("accounts_provider_account_idx").on(table.provider, table.providerAccountId),
}));

export const cryptoAssets = mysqlTable("crypto_assets", {
  id: varchar("id", { length: 191 }).primaryKey(),
  providerId: varchar("provider_id", { length: 191 }).notNull(),
  symbol: varchar("symbol", { length: 32 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  marketCapRank: int("market_cap_rank"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const portfolioHoldings = mysqlTable("portfolio_holdings", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  assetId: varchar("asset_id", { length: 191 }).notNull().references(() => cryptoAssets.id),
  quantity: decimal("quantity", { precision: 36, scale: 18 }).notNull(),
  averageBuyPrice: decimal("average_buy_price", { precision: 20, scale: 8 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  userAssetIdx: uniqueIndex("portfolio_user_asset_idx").on(table.userId, table.assetId),
}));

export const marketSnapshots = mysqlTable("market_snapshots", {
  id: varchar("id", { length: 191 }).primaryKey(),
  assetId: varchar("asset_id", { length: 191 }).notNull().references(() => cryptoAssets.id),
  priceUsd: decimal("price_usd", { precision: 20, scale: 8 }).notNull(),
  marketCap: decimal("market_cap", { precision: 24, scale: 2 }),
  volume24h: decimal("volume_24h", { precision: 24, scale: 2 }),
  priceChange24h: decimal("price_change_24h", { precision: 10, scale: 4 }),
  priceChange7d: decimal("price_change_7d", { precision: 10, scale: 4 }),
  snapshotAt: timestamp("snapshot_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  assetSnapshotIdx: index("market_asset_snapshot_idx").on(table.assetId, table.snapshotAt),
}));

export const watchlistItems = mysqlTable("watchlist_items", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  assetId: varchar("asset_id", { length: 191 }).notNull().references(() => cryptoAssets.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userAssetIdx: uniqueIndex("watchlist_user_asset_idx").on(table.userId, table.assetId),
}));

export const alphaScores = mysqlTable("alpha_scores", {
  id: varchar("id", { length: 191 }).primaryKey(),
  assetId: varchar("asset_id", { length: 191 }).notNull().references(() => cryptoAssets.id),
  score: int("score").notNull(),
  riskLevel: varchar("risk_level", { length: 16 }).notNull(),
  rationale: text("rationale").notNull(),
  calculatedAt: timestamp("calculated_at").notNull(),
});

export const macroIndicators = mysqlTable("macro_indicators", {
  id: varchar("id", { length: 191 }).primaryKey(),
  source: varchar("source", { length: 64 }).notNull(),
  code: varchar("code", { length: 64 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  unit: varchar("unit", { length: 64 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const macroSnapshots = mysqlTable("macro_snapshots", {
  id: varchar("id", { length: 191 }).primaryKey(),
  indicatorId: varchar("indicator_id", { length: 191 }).notNull().references(() => macroIndicators.id),
  value: decimal("value", { precision: 20, scale: 8 }).notNull(),
  trend: varchar("trend", { length: 16 }).notNull(),
  snapshotAt: timestamp("snapshot_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const morningBriefs = mysqlTable("morning_briefs", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  macroStatus: varchar("macro_status", { length: 32 }).notNull(),
  marketStatus: varchar("market_status", { length: 32 }).notNull(),
  briefDate: timestamp("brief_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userBriefDateIdx: uniqueIndex("morning_briefs_user_date_idx").on(table.userId, table.briefDate),
}));

export const wallets = mysqlTable("wallets", {
  id: varchar("id", { length: 191 }).primaryKey(),
  chain: varchar("chain", { length: 32 }).notNull(),
  address: varchar("address", { length: 191 }).notNull(),
  addressType: varchar("address_type", { length: 64 }).notNull(),
  firstSeenAt: timestamp("first_seen_at"),
  lastSeenAt: timestamp("last_seen_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  chainAddressIdx: uniqueIndex("wallets_chain_address_idx").on(table.chain, table.address),
}));

export const walletLabels = mysqlTable("wallet_labels", {
  id: varchar("id", { length: 191 }).primaryKey(),
  walletId: varchar("wallet_id", { length: 191 }).notNull().references(() => wallets.id),
  label: varchar("label", { length: 191 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  confidence: varchar("confidence", { length: 16 }).notNull(),
  sourceType: varchar("source_type", { length: 64 }).notNull(),
  sourceRef: text("source_ref").notNull(),
  explanation: text("explanation").notNull(),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const entities = mysqlTable("entities", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  confidence: varchar("confidence", { length: 16 }).notNull(),
  rationale: text("rationale").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const entityWallets = mysqlTable("entity_wallets", {
  id: varchar("id", { length: 191 }).primaryKey(),
  entityId: varchar("entity_id", { length: 191 }).notNull().references(() => entities.id),
  walletId: varchar("wallet_id", { length: 191 }).notNull().references(() => wallets.id),
  confidence: varchar("confidence", { length: 16 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chainTransactions = mysqlTable("chain_transactions", {
  id: varchar("id", { length: 191 }).primaryKey(),
  chain: varchar("chain", { length: 32 }).notNull(),
  txHash: varchar("tx_hash", { length: 191 }).notNull(),
  blockHeight: int("block_height"),
  slot: int("slot"),
  timestamp: timestamp("timestamp").notNull(),
  status: varchar("status", { length: 32 }).notNull(),
}, (table) => ({
  chainTxIdx: uniqueIndex("chain_transactions_chain_tx_idx").on(table.chain, table.txHash),
}));

export const walletEvents = mysqlTable("wallet_events", {
  id: varchar("id", { length: 191 }).primaryKey(),
  walletId: varchar("wallet_id", { length: 191 }).notNull().references(() => wallets.id),
  chain: varchar("chain", { length: 32 }).notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  asset: varchar("asset", { length: 64 }).notNull(),
  amount: decimal("amount", { precision: 36, scale: 18 }).notNull(),
  valueUsd: decimal("value_usd", { precision: 24, scale: 2 }).notNull(),
  counterparty: varchar("counterparty", { length: 191 }).notNull(),
  txHash: varchar("tx_hash", { length: 191 }).notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const bitcoinUtxos = mysqlTable("bitcoin_utxos", {
  id: varchar("id", { length: 191 }).primaryKey(),
  walletId: varchar("wallet_id", { length: 191 }).notNull().references(() => wallets.id),
  txid: varchar("txid", { length: 191 }).notNull(),
  vout: int("vout").notNull(),
  valueSats: int("value_sats").notNull(),
  ageDays: int("age_days").notNull(),
  status: varchar("status", { length: 16 }).notNull(),
}, (table) => ({
  outpointIdx: uniqueIndex("bitcoin_utxos_outpoint_idx").on(table.txid, table.vout),
}));

// ============================================================================
// PERSONAL FINANCE EXTENSION
// Multi-asset portfolio, cash flow, goals, insurance, net worth, rebalancing.
// Pattern matches existing tables: varchar(191) ids, BetterAuth userId refs.
// ============================================================================

export const expenseCategories = mysqlTable("expense_categories", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  parentId: varchar("parent_id", { length: 191 }),
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 20 }),
  budgetLimit: decimal("budget_limit", { precision: 20, scale: 2 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdx: index("expense_categories_user_idx").on(table.userId),
}));

export const personalAssets = mysqlTable("personal_assets", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  name: varchar("name", { length: 200 }).notNull(),
  symbol: varchar("symbol", { length: 50 }),
  assetType: mysqlEnum("asset_type", [
    "cash", "rpu", "bond", "stock_idx", "stock_us",
    "gold", "crypto", "mutual_fund", "property", "other",
  ]).notNull(),
  quantity: decimal("quantity", { precision: 20, scale: 8 }).notNull(),
  avgBuyPrice: decimal("avg_buy_price", { precision: 20, scale: 8 }),
  currentPrice: decimal("current_price", { precision: 20, scale: 8 }),
  currency: mysqlEnum("currency", ["IDR", "USD"]).notNull().default("IDR"),
  platform: varchar("platform", { length: 100 }),
  notes: text("notes"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdx: index("personal_assets_user_idx").on(table.userId),
  typeIdx: index("personal_assets_type_idx").on(table.assetType),
}));

export const assetTransactions = mysqlTable("asset_transactions", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  assetId: varchar("asset_id", { length: 191 }).notNull().references(() => personalAssets.id),
  type: mysqlEnum("type", [
    "buy", "sell", "dividend", "interest",
    "split", "merge", "transfer_in", "transfer_out",
  ]).notNull(),
  quantity: decimal("quantity", { precision: 20, scale: 8 }).notNull(),
  pricePerUnit: decimal("price_per_unit", { precision: 20, scale: 8 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 20, scale: 2 }).notNull(),
  fees: decimal("fees", { precision: 20, scale: 2 }).default("0").notNull(),
  currency: mysqlEnum("currency", ["IDR", "USD"]).notNull(),
  transactionDate: timestamp("transaction_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userIdx: index("asset_transactions_user_idx").on(table.userId),
  assetIdx: index("asset_transactions_asset_idx").on(table.assetId),
  dateIdx: index("asset_transactions_date_idx").on(table.transactionDate),
}));

export const cashFlowEntries = mysqlTable("cash_flow_entries", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  entryType: mysqlEnum("entry_type", ["income", "expense"]).notNull(),
  categoryId: varchar("category_id", { length: 191 }),
  amount: decimal("amount", { precision: 20, scale: 2 }).notNull(),
  currency: mysqlEnum("currency", ["IDR", "USD"]).notNull().default("IDR"),
  paymentMethod: varchar("payment_method", { length: 50 }),
  description: varchar("description", { length: 500 }),
  isRecurring: boolean("is_recurring").default(false).notNull(),
  recurringFrequency: mysqlEnum("recurring_frequency", [
    "daily", "weekly", "monthly", "quarterly", "yearly",
  ]),
  transactionDate: timestamp("transaction_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdx: index("cash_flow_user_idx").on(table.userId),
  typeIdx: index("cash_flow_type_idx").on(table.entryType),
  dateIdx: index("cash_flow_date_idx").on(table.transactionDate),
  userDateIdx: index("cash_flow_user_date_idx").on(table.userId, table.transactionDate),
}));

export const financialGoals = mysqlTable("financial_goals", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  name: varchar("name", { length: 200 }).notNull(),
  type: mysqlEnum("type", [
    "hajj", "education", "ev", "emergency", "retirement",
    "home", "wedding", "travel", "other",
  ]).notNull(),
  targetAmount: decimal("target_amount", { precision: 20, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 20, scale: 2 }).default("0").notNull(),
  currency: mysqlEnum("currency", ["IDR", "USD"]).notNull().default("IDR"),
  deadline: timestamp("deadline"),
  priority: mysqlEnum("priority", ["low", "medium", "high", "critical"]).default("medium").notNull(),
  status: mysqlEnum("status", ["active", "paused", "completed", "cancelled"]).default("active").notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  completedAt: timestamp("completed_at"),
}, (table) => ({
  userIdx: index("financial_goals_user_idx").on(table.userId),
  typeIdx: index("financial_goals_type_idx").on(table.type),
  statusIdx: index("financial_goals_status_idx").on(table.status),
}));

export const goalAllocations = mysqlTable("goal_allocations", {
  id: varchar("id", { length: 191 }).primaryKey(),
  goalId: varchar("goal_id", { length: 191 }).notNull().references(() => financialGoals.id),
  assetId: varchar("asset_id", { length: 191 }).notNull().references(() => personalAssets.id),
  allocatedAmount: decimal("allocated_amount", { precision: 20, scale: 2 }).notNull(),
  allocationDate: timestamp("allocation_date").defaultNow().notNull(),
  notes: text("notes"),
}, (table) => ({
  goalIdx: index("goal_allocations_goal_idx").on(table.goalId),
  assetIdx: index("goal_allocations_asset_idx").on(table.assetId),
  goalAssetIdx: uniqueIndex("goal_allocations_goal_asset_unique").on(table.goalId, table.assetId),
}));

export const insurancePolicies = mysqlTable("insurance_policies", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  policyType: mysqlEnum("policy_type", [
    "life", "health", "critical_illness", "disability", "auto", "property", "other",
  ]).notNull(),
  provider: varchar("provider", { length: 200 }).notNull(),
  providerId: varchar("provider_id", { length: 100 }),
  policyNumber: varchar("policy_number", { length: 100 }),
  coverageAmount: decimal("coverage_amount", { precision: 20, scale: 2 }).notNull(),
  currency: mysqlEnum("currency", ["IDR", "USD"]).notNull().default("IDR"),
  premiumAmount: decimal("premium_amount", { precision: 20, scale: 2 }).notNull(),
  premiumFrequency: mysqlEnum("premium_frequency", [
    "monthly", "quarterly", "semi_annual", "annual", "one_time",
  ]).notNull(),
  startDate: timestamp("start_date").notNull(),
  expiryDate: timestamp("expiry_date"),
  beneficiary: varchar("beneficiary", { length: 200 }),
  isActive: boolean("is_active").default(true).notNull(),
  akadType: mysqlEnum("akad_type", ["tabarru", "tijarah", "mixed"]),
  isShariahCompliant: boolean("is_shariah_compliant").default(false).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdx: index("insurance_policies_user_idx").on(table.userId),
  typeIdx: index("insurance_policies_type_idx").on(table.policyType),
}));

export const netWorthSnapshots = mysqlTable("net_worth_snapshots", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  snapshotDate: timestamp("snapshot_date").notNull(),
  totalAssets: decimal("total_assets", { precision: 20, scale: 2 }).notNull(),
  totalLiabilities: decimal("total_liabilities", { precision: 20, scale: 2 }).default("0").notNull(),
  netWorth: decimal("net_worth", { precision: 20, scale: 2 }).notNull(),
  breakdownJson: json("breakdown_json"),
  currency: mysqlEnum("currency", ["IDR", "USD"]).notNull().default("IDR"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userIdx: index("net_worth_snapshots_user_idx").on(table.userId),
  dateIdx: index("net_worth_snapshots_date_idx").on(table.snapshotDate),
}));

export const rebalancingRules = mysqlTable("rebalancing_rules", {
  id: varchar("id", { length: 191 }).primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id),
  assetType: varchar("asset_type", { length: 50 }).notNull(),
  targetPct: decimal("target_pct", { precision: 5, scale: 2 }).notNull(),
  thresholdPct: decimal("threshold_pct", { precision: 5, scale: 2 }).default("5.00").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdx: index("rebalancing_rules_user_idx").on(table.userId),
  userTypeIdx: uniqueIndex("rebalancing_rules_user_type_unique").on(table.userId, table.assetType),
}));
