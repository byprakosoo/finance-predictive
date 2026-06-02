import {
  decimal,
  index,
  int,
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
