import "dotenv/config";
import { defineConfig } from "drizzle-kit";

function mysqlCredentials() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return {
      host: "",
      database: "",
      ssl: "required",
    };
  }

  const url = new URL(databaseUrl);

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 4000,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    ssl: {
      rejectUnauthorized: true,
    },
  };
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: mysqlCredentials(),
  tablesFilter: [
    "accounts",
    "alpha_scores",
    "asset_transactions",
    "bitcoin_utxos",
    "chain_transactions",
    "crypto_assets",
    "entities",
    "entity_wallets",
    "expense_categories",
    "financial_goals",
    "goal_allocations",
    "insurance_policies",
    "macro_indicators",
    "macro_snapshots",
    "market_snapshots",
    "morning_briefs",
    "net_worth_snapshots",
    "personal_assets",
    "portfolio_holdings",
    "rebalancing_rules",
    "sessions",
    "users",
    "wallet_events",
    "wallet_labels",
    "wallets",
    "watchlist_items",
    "cash_flow_entries",
  ],
  strict: false,
  verbose: true,
});
