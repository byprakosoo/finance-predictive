CREATE TABLE `accounts` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`provider` varchar(64) NOT NULL,
	`provider_account_id` varchar(191) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `accounts_provider_account_idx` UNIQUE(`provider`,`provider_account_id`)
);
--> statement-breakpoint
CREATE TABLE `alpha_scores` (
	`id` varchar(191) NOT NULL,
	`asset_id` varchar(191) NOT NULL,
	`score` int NOT NULL,
	`risk_level` varchar(16) NOT NULL,
	`rationale` text NOT NULL,
	`calculated_at` timestamp NOT NULL,
	CONSTRAINT `alpha_scores_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `asset_transactions` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`asset_id` varchar(191) NOT NULL,
	`type` enum('buy','sell','dividend','interest','split','merge','transfer_in','transfer_out') NOT NULL,
	`quantity` decimal(20,8) NOT NULL,
	`price_per_unit` decimal(20,8) NOT NULL,
	`total_amount` decimal(20,2) NOT NULL,
	`fees` decimal(20,2) NOT NULL DEFAULT '0',
	`currency` enum('IDR','USD') NOT NULL,
	`transaction_date` timestamp NOT NULL,
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `asset_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bitcoin_utxos` (
	`id` varchar(191) NOT NULL,
	`wallet_id` varchar(191) NOT NULL,
	`txid` varchar(191) NOT NULL,
	`vout` int NOT NULL,
	`value_sats` int NOT NULL,
	`age_days` int NOT NULL,
	`status` varchar(16) NOT NULL,
	CONSTRAINT `bitcoin_utxos_id` PRIMARY KEY(`id`),
	CONSTRAINT `bitcoin_utxos_outpoint_idx` UNIQUE(`txid`,`vout`)
);
--> statement-breakpoint
CREATE TABLE `cash_flow_entries` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`entry_type` enum('income','expense') NOT NULL,
	`category_id` varchar(191),
	`amount` decimal(20,2) NOT NULL,
	`currency` enum('IDR','USD') NOT NULL DEFAULT 'IDR',
	`payment_method` varchar(50),
	`description` varchar(500),
	`is_recurring` boolean NOT NULL DEFAULT false,
	`recurring_frequency` enum('daily','weekly','monthly','quarterly','yearly'),
	`transaction_date` timestamp NOT NULL,
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cash_flow_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chain_transactions` (
	`id` varchar(191) NOT NULL,
	`chain` varchar(32) NOT NULL,
	`tx_hash` varchar(191) NOT NULL,
	`block_height` int,
	`slot` int,
	`timestamp` timestamp NOT NULL,
	`status` varchar(32) NOT NULL,
	CONSTRAINT `chain_transactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `chain_transactions_chain_tx_idx` UNIQUE(`chain`,`tx_hash`)
);
--> statement-breakpoint
CREATE TABLE `crypto_assets` (
	`id` varchar(191) NOT NULL,
	`provider_id` varchar(191) NOT NULL,
	`symbol` varchar(32) NOT NULL,
	`name` varchar(191) NOT NULL,
	`market_cap_rank` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `crypto_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `entities` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`category` varchar(64) NOT NULL,
	`confidence` varchar(16) NOT NULL,
	`rationale` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `entities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `entity_wallets` (
	`id` varchar(191) NOT NULL,
	`entity_id` varchar(191) NOT NULL,
	`wallet_id` varchar(191) NOT NULL,
	`confidence` varchar(16) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `entity_wallets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `expense_categories` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`name` varchar(100) NOT NULL,
	`parent_id` varchar(191),
	`icon` varchar(50),
	`color` varchar(20),
	`budget_limit` decimal(20,2),
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `expense_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `financial_goals` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`name` varchar(200) NOT NULL,
	`type` enum('hajj','education','ev','emergency','retirement','home','wedding','travel','other') NOT NULL,
	`target_amount` decimal(20,2) NOT NULL,
	`current_amount` decimal(20,2) NOT NULL DEFAULT '0',
	`currency` enum('IDR','USD') NOT NULL DEFAULT 'IDR',
	`deadline` timestamp,
	`priority` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
	`status` enum('active','paused','completed','cancelled') NOT NULL DEFAULT 'active',
	`description` text,
	`icon` varchar(50),
	`color` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`completed_at` timestamp,
	CONSTRAINT `financial_goals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `goal_allocations` (
	`id` varchar(191) NOT NULL,
	`goal_id` varchar(191) NOT NULL,
	`asset_id` varchar(191) NOT NULL,
	`allocated_amount` decimal(20,2) NOT NULL,
	`allocation_date` timestamp NOT NULL DEFAULT (now()),
	`notes` text,
	CONSTRAINT `goal_allocations_id` PRIMARY KEY(`id`),
	CONSTRAINT `goal_allocations_goal_asset_unique` UNIQUE(`goal_id`,`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `insurance_policies` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`policy_type` enum('life','health','critical_illness','disability','auto','property','other') NOT NULL,
	`provider` varchar(200) NOT NULL,
	`provider_id` varchar(100),
	`policy_number` varchar(100),
	`coverage_amount` decimal(20,2) NOT NULL,
	`currency` enum('IDR','USD') NOT NULL DEFAULT 'IDR',
	`premium_amount` decimal(20,2) NOT NULL,
	`premium_frequency` enum('monthly','quarterly','semi_annual','annual','one_time') NOT NULL,
	`start_date` timestamp NOT NULL,
	`expiry_date` timestamp,
	`beneficiary` varchar(200),
	`is_active` boolean NOT NULL DEFAULT true,
	`akad_type` enum('tabarru','tijarah','mixed'),
	`is_shariah_compliant` boolean NOT NULL DEFAULT false,
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `insurance_policies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `macro_indicators` (
	`id` varchar(191) NOT NULL,
	`source` varchar(64) NOT NULL,
	`code` varchar(64) NOT NULL,
	`name` varchar(191) NOT NULL,
	`unit` varchar(64) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `macro_indicators_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `macro_snapshots` (
	`id` varchar(191) NOT NULL,
	`indicator_id` varchar(191) NOT NULL,
	`value` decimal(20,8) NOT NULL,
	`trend` varchar(16) NOT NULL,
	`snapshot_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `macro_snapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `market_snapshots` (
	`id` varchar(191) NOT NULL,
	`asset_id` varchar(191) NOT NULL,
	`price_usd` decimal(20,8) NOT NULL,
	`market_cap` decimal(24,2),
	`volume_24h` decimal(24,2),
	`price_change_24h` decimal(10,4),
	`price_change_7d` decimal(10,4),
	`snapshot_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `market_snapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `morning_briefs` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`macro_status` varchar(32) NOT NULL,
	`market_status` varchar(32) NOT NULL,
	`brief_date` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `morning_briefs_id` PRIMARY KEY(`id`),
	CONSTRAINT `morning_briefs_user_date_idx` UNIQUE(`user_id`,`brief_date`)
);
--> statement-breakpoint
CREATE TABLE `net_worth_snapshots` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`snapshot_date` timestamp NOT NULL,
	`total_assets` decimal(20,2) NOT NULL,
	`total_liabilities` decimal(20,2) NOT NULL DEFAULT '0',
	`net_worth` decimal(20,2) NOT NULL,
	`breakdown_json` json,
	`currency` enum('IDR','USD') NOT NULL DEFAULT 'IDR',
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `net_worth_snapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `personal_assets` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`name` varchar(200) NOT NULL,
	`symbol` varchar(50),
	`asset_type` enum('cash','rpu','bond','stock_idx','stock_us','gold','crypto','mutual_fund','property','other') NOT NULL,
	`quantity` decimal(20,8) NOT NULL,
	`avg_buy_price` decimal(20,8),
	`current_price` decimal(20,8),
	`currency` enum('IDR','USD') NOT NULL DEFAULT 'IDR',
	`platform` varchar(100),
	`notes` text,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `personal_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio_holdings` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`asset_id` varchar(191) NOT NULL,
	`quantity` decimal(36,18) NOT NULL,
	`average_buy_price` decimal(20,8) NOT NULL,
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portfolio_holdings_id` PRIMARY KEY(`id`),
	CONSTRAINT `portfolio_user_asset_idx` UNIQUE(`user_id`,`asset_id`)
);
--> statement-breakpoint
CREATE TABLE `rebalancing_rules` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`asset_type` varchar(50) NOT NULL,
	`target_pct` decimal(5,2) NOT NULL,
	`threshold_pct` decimal(5,2) NOT NULL DEFAULT '5.00',
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rebalancing_rules_id` PRIMARY KEY(`id`),
	CONSTRAINT `rebalancing_rules_user_type_unique` UNIQUE(`user_id`,`asset_type`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`token` varchar(512) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191) NOT NULL,
	`image` varchar(512),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `wallet_events` (
	`id` varchar(191) NOT NULL,
	`wallet_id` varchar(191) NOT NULL,
	`chain` varchar(32) NOT NULL,
	`type` varchar(64) NOT NULL,
	`asset` varchar(64) NOT NULL,
	`amount` decimal(36,18) NOT NULL,
	`value_usd` decimal(24,2) NOT NULL,
	`counterparty` varchar(191) NOT NULL,
	`tx_hash` varchar(191) NOT NULL,
	`timestamp` timestamp NOT NULL,
	CONSTRAINT `wallet_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wallet_labels` (
	`id` varchar(191) NOT NULL,
	`wallet_id` varchar(191) NOT NULL,
	`label` varchar(191) NOT NULL,
	`category` varchar(64) NOT NULL,
	`confidence` varchar(16) NOT NULL,
	`source_type` varchar(64) NOT NULL,
	`source_ref` text NOT NULL,
	`explanation` text NOT NULL,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wallet_labels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wallets` (
	`id` varchar(191) NOT NULL,
	`chain` varchar(32) NOT NULL,
	`address` varchar(191) NOT NULL,
	`address_type` varchar(64) NOT NULL,
	`first_seen_at` timestamp,
	`last_seen_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wallets_id` PRIMARY KEY(`id`),
	CONSTRAINT `wallets_chain_address_idx` UNIQUE(`chain`,`address`)
);
--> statement-breakpoint
CREATE TABLE `watchlist_items` (
	`id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`asset_id` varchar(191) NOT NULL,
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `watchlist_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `watchlist_user_asset_idx` UNIQUE(`user_id`,`asset_id`)
);
--> statement-breakpoint
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alpha_scores` ADD CONSTRAINT `alpha_scores_asset_id_crypto_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `crypto_assets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `asset_transactions` ADD CONSTRAINT `asset_transactions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `asset_transactions` ADD CONSTRAINT `asset_transactions_asset_id_personal_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `personal_assets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bitcoin_utxos` ADD CONSTRAINT `bitcoin_utxos_wallet_id_wallets_id_fk` FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cash_flow_entries` ADD CONSTRAINT `cash_flow_entries_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `entity_wallets` ADD CONSTRAINT `entity_wallets_entity_id_entities_id_fk` FOREIGN KEY (`entity_id`) REFERENCES `entities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `entity_wallets` ADD CONSTRAINT `entity_wallets_wallet_id_wallets_id_fk` FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `expense_categories` ADD CONSTRAINT `expense_categories_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `financial_goals` ADD CONSTRAINT `financial_goals_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `goal_allocations` ADD CONSTRAINT `goal_allocations_goal_id_financial_goals_id_fk` FOREIGN KEY (`goal_id`) REFERENCES `financial_goals`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `goal_allocations` ADD CONSTRAINT `goal_allocations_asset_id_personal_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `personal_assets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `insurance_policies` ADD CONSTRAINT `insurance_policies_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `macro_snapshots` ADD CONSTRAINT `macro_snapshots_indicator_id_macro_indicators_id_fk` FOREIGN KEY (`indicator_id`) REFERENCES `macro_indicators`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `market_snapshots` ADD CONSTRAINT `market_snapshots_asset_id_crypto_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `crypto_assets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `morning_briefs` ADD CONSTRAINT `morning_briefs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `net_worth_snapshots` ADD CONSTRAINT `net_worth_snapshots_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `personal_assets` ADD CONSTRAINT `personal_assets_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `portfolio_holdings` ADD CONSTRAINT `portfolio_holdings_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `portfolio_holdings` ADD CONSTRAINT `portfolio_holdings_asset_id_crypto_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `crypto_assets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rebalancing_rules` ADD CONSTRAINT `rebalancing_rules_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallet_events` ADD CONSTRAINT `wallet_events_wallet_id_wallets_id_fk` FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallet_labels` ADD CONSTRAINT `wallet_labels_wallet_id_wallets_id_fk` FOREIGN KEY (`wallet_id`) REFERENCES `wallets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `watchlist_items` ADD CONSTRAINT `watchlist_items_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `watchlist_items` ADD CONSTRAINT `watchlist_items_asset_id_crypto_assets_id_fk` FOREIGN KEY (`asset_id`) REFERENCES `crypto_assets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `asset_transactions_user_idx` ON `asset_transactions` (`user_id`);--> statement-breakpoint
CREATE INDEX `asset_transactions_asset_idx` ON `asset_transactions` (`asset_id`);--> statement-breakpoint
CREATE INDEX `asset_transactions_date_idx` ON `asset_transactions` (`transaction_date`);--> statement-breakpoint
CREATE INDEX `cash_flow_user_idx` ON `cash_flow_entries` (`user_id`);--> statement-breakpoint
CREATE INDEX `cash_flow_type_idx` ON `cash_flow_entries` (`entry_type`);--> statement-breakpoint
CREATE INDEX `cash_flow_date_idx` ON `cash_flow_entries` (`transaction_date`);--> statement-breakpoint
CREATE INDEX `cash_flow_user_date_idx` ON `cash_flow_entries` (`user_id`,`transaction_date`);--> statement-breakpoint
CREATE INDEX `expense_categories_user_idx` ON `expense_categories` (`user_id`);--> statement-breakpoint
CREATE INDEX `financial_goals_user_idx` ON `financial_goals` (`user_id`);--> statement-breakpoint
CREATE INDEX `financial_goals_type_idx` ON `financial_goals` (`type`);--> statement-breakpoint
CREATE INDEX `financial_goals_status_idx` ON `financial_goals` (`status`);--> statement-breakpoint
CREATE INDEX `goal_allocations_goal_idx` ON `goal_allocations` (`goal_id`);--> statement-breakpoint
CREATE INDEX `goal_allocations_asset_idx` ON `goal_allocations` (`asset_id`);--> statement-breakpoint
CREATE INDEX `insurance_policies_user_idx` ON `insurance_policies` (`user_id`);--> statement-breakpoint
CREATE INDEX `insurance_policies_type_idx` ON `insurance_policies` (`policy_type`);--> statement-breakpoint
CREATE INDEX `market_asset_snapshot_idx` ON `market_snapshots` (`asset_id`,`snapshot_at`);--> statement-breakpoint
CREATE INDEX `net_worth_snapshots_user_idx` ON `net_worth_snapshots` (`user_id`);--> statement-breakpoint
CREATE INDEX `net_worth_snapshots_date_idx` ON `net_worth_snapshots` (`snapshot_date`);--> statement-breakpoint
CREATE INDEX `personal_assets_user_idx` ON `personal_assets` (`user_id`);--> statement-breakpoint
CREATE INDEX `personal_assets_type_idx` ON `personal_assets` (`asset_type`);--> statement-breakpoint
CREATE INDEX `rebalancing_rules_user_idx` ON `rebalancing_rules` (`user_id`);