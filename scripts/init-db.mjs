import "dotenv/config";
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id varchar(191) NOT NULL PRIMARY KEY,
    name varchar(191),
    email varchar(191) NOT NULL,
    image varchar(512),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY users_email_idx (email)
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    id varchar(191) NOT NULL PRIMARY KEY,
    user_id varchar(191) NOT NULL,
    token varchar(512) NOT NULL,
    expires_at timestamp NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS accounts (
    id varchar(191) NOT NULL PRIMARY KEY,
    user_id varchar(191) NOT NULL,
    provider varchar(64) NOT NULL,
    provider_account_id varchar(191) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY accounts_provider_account_idx (provider, provider_account_id)
  )`,
  `CREATE TABLE IF NOT EXISTS crypto_assets (
    id varchar(191) NOT NULL PRIMARY KEY,
    provider_id varchar(191) NOT NULL,
    symbol varchar(32) NOT NULL,
    name varchar(191) NOT NULL,
    market_cap_rank int,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS portfolio_holdings (
    id varchar(191) NOT NULL PRIMARY KEY,
    user_id varchar(191) NOT NULL,
    asset_id varchar(191) NOT NULL,
    quantity decimal(36,18) NOT NULL,
    average_buy_price decimal(20,8) NOT NULL,
    notes text,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY portfolio_user_asset_idx (user_id, asset_id)
  )`,
  `CREATE TABLE IF NOT EXISTS market_snapshots (
    id varchar(191) NOT NULL PRIMARY KEY,
    asset_id varchar(191) NOT NULL,
    price_usd decimal(20,8) NOT NULL,
    market_cap decimal(24,2),
    volume_24h decimal(24,2),
    price_change_24h decimal(10,4),
    price_change_7d decimal(10,4),
    snapshot_at timestamp NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    KEY market_asset_snapshot_idx (asset_id, snapshot_at)
  )`,
  `CREATE TABLE IF NOT EXISTS watchlist_items (
    id varchar(191) NOT NULL PRIMARY KEY,
    user_id varchar(191) NOT NULL,
    asset_id varchar(191) NOT NULL,
    notes text,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY watchlist_user_asset_idx (user_id, asset_id)
  )`,
  `CREATE TABLE IF NOT EXISTS alpha_scores (
    id varchar(191) NOT NULL PRIMARY KEY,
    asset_id varchar(191) NOT NULL,
    score int NOT NULL,
    risk_level varchar(16) NOT NULL,
    rationale text NOT NULL,
    calculated_at timestamp NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS macro_indicators (
    id varchar(191) NOT NULL PRIMARY KEY,
    source varchar(64) NOT NULL,
    code varchar(64) NOT NULL,
    name varchar(191) NOT NULL,
    unit varchar(64) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS macro_snapshots (
    id varchar(191) NOT NULL PRIMARY KEY,
    indicator_id varchar(191) NOT NULL,
    value decimal(20,8) NOT NULL,
    trend varchar(16) NOT NULL,
    snapshot_at timestamp NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS morning_briefs (
    id varchar(191) NOT NULL PRIMARY KEY,
    user_id varchar(191) NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    macro_status varchar(32) NOT NULL,
    market_status varchar(32) NOT NULL,
    brief_date timestamp NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY morning_briefs_user_date_idx (user_id, brief_date)
  )`,
  `CREATE TABLE IF NOT EXISTS wallets (
    id varchar(191) NOT NULL PRIMARY KEY,
    chain varchar(32) NOT NULL,
    address varchar(191) NOT NULL,
    address_type varchar(64) NOT NULL,
    first_seen_at timestamp NULL,
    last_seen_at timestamp NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY wallets_chain_address_idx (chain, address)
  )`,
  `CREATE TABLE IF NOT EXISTS wallet_labels (
    id varchar(191) NOT NULL PRIMARY KEY,
    wallet_id varchar(191) NOT NULL,
    label varchar(191) NOT NULL,
    category varchar(64) NOT NULL,
    confidence varchar(16) NOT NULL,
    source_type varchar(64) NOT NULL,
    source_ref text NOT NULL,
    explanation text NOT NULL,
    reviewed_at timestamp NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS entities (
    id varchar(191) NOT NULL PRIMARY KEY,
    name varchar(191) NOT NULL,
    category varchar(64) NOT NULL,
    confidence varchar(16) NOT NULL,
    rationale text NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS entity_wallets (
    id varchar(191) NOT NULL PRIMARY KEY,
    entity_id varchar(191) NOT NULL,
    wallet_id varchar(191) NOT NULL,
    confidence varchar(16) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS chain_transactions (
    id varchar(191) NOT NULL PRIMARY KEY,
    chain varchar(32) NOT NULL,
    tx_hash varchar(191) NOT NULL,
    block_height int,
    slot int,
    timestamp timestamp NOT NULL,
    status varchar(32) NOT NULL,
    UNIQUE KEY chain_transactions_chain_tx_idx (chain, tx_hash)
  )`,
  `CREATE TABLE IF NOT EXISTS wallet_events (
    id varchar(191) NOT NULL PRIMARY KEY,
    wallet_id varchar(191) NOT NULL,
    chain varchar(32) NOT NULL,
    type varchar(64) NOT NULL,
    asset varchar(64) NOT NULL,
    amount decimal(36,18) NOT NULL,
    value_usd decimal(24,2) NOT NULL,
    counterparty varchar(191) NOT NULL,
    tx_hash varchar(191) NOT NULL,
    timestamp timestamp NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS bitcoin_utxos (
    id varchar(191) NOT NULL PRIMARY KEY,
    wallet_id varchar(191) NOT NULL,
    txid varchar(191) NOT NULL,
    vout int NOT NULL,
    value_sats bigint NOT NULL,
    age_days int NOT NULL,
    status varchar(16) NOT NULL,
    UNIQUE KEY bitcoin_utxos_outpoint_idx (txid, vout)
  )`,
];

const connection = await mysql.createConnection({
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

try {
  for (const statement of statements) {
    await connection.execute(statement);
  }
  console.log(`Initialized ${statements.length} app tables.`);
} finally {
  await connection.end();
}
