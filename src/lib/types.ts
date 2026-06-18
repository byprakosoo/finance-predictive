export type MacroStatus = "RISK_ON" | "NEUTRAL" | "RISK_OFF";
export type MarketStatus = "BULLISH" | "NEUTRAL" | "BEARISH";
export type PortfolioSignalType = "BUY_ZONE" | "HOLD" | "TAKE_PROFIT" | "RISK_WARNING" | "NO_DATA";
export type ConfidenceLevel = "LOW" | "MEDIUM" | "HIGH";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type Chain = "BITCOIN" | "SOLANA";
export type LabelSourceType = "USER_SUBMITTED" | "ADMIN_REVIEWED" | "PUBLIC_DATASET" | "HEURISTIC" | "LICENSED_PROVIDER_DISABLED";

export type Holding = {
  id: string;
  assetId: string;
  symbol: string;
  name: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  change24h: number;
  notes?: string;
};

export type PortfolioSignal = {
  assetId: string;
  signal: PortfolioSignalType;
  confidence: ConfidenceLevel;
  reason: string;
};

export type PortfolioSummary = {
  totalValue: number;
  totalInvested: number;
  unrealizedPl: number;
  unrealizedPlPercent: number;
  change24h: number;
  topGainer: string;
  topLoser: string;
  macroStatus: MacroStatus;
  fearGreed: {
    value: number;
    label: string;
  };
};

export type AlphaCandidate = {
  assetId: string;
  rank: number;
  symbol: string;
  name: string;
  priceUsd: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  priceChange7d: number;
  volumeToMarketCap: number;
  alphaScore: number;
  riskLevel: RiskLevel;
  rationale: string;
  watched: boolean;
};

export type WatchlistItem = {
  id: string;
  symbol: string;
  name: string;
  alphaScore: number;
  currentPrice: number;
  rationale: string;
  notes?: string;
};

export type MacroIndicator = {
  id: string;
  name: string;
  value: string;
  trend: "UP" | "DOWN" | "FLAT";
  interpretation: string;
};

export type MorningBrief = {
  title: string;
  date: string;
  marketStatus: MarketStatus;
  macroStatus: MacroStatus;
  generatedAt: string;
  sourceFreshness: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export type MarketFreshness = {
  label: string;
  stale: boolean;
  updatedAt: string;
};

export type WalletLabel = {
  label: string;
  category: "EXCHANGE" | "FUND" | "WHALE" | "MINER" | "PROGRAM" | "USER" | "UNKNOWN";
  confidence: ConfidenceLevel;
  sourceType: LabelSourceType;
  sourceRef: string;
  explanation: string;
};

export type WalletEvent = {
  id: string;
  chain: Chain;
  type: "INFLOW" | "OUTFLOW" | "SWAP" | "PROGRAM_CALL" | "UTXO_SPEND" | "UTXO_RECEIVE";
  asset: string;
  amount: number;
  valueUsd: number;
  counterparty: string;
  timestamp: string;
  txHash: string;
};

export type BitcoinUtxo = {
  txid: string;
  vout: number;
  valueSats: number;
  ageDays: number;
  status: "UNSPENT" | "SPENT";
};

export type WalletIntelligence = {
  address: string;
  chain: Chain;
  addressType: string;
  entityId?: string;
  entityName?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  balanceUsd: number;
  netFlow24hUsd: number;
  activityScore: number;
  smartFlowScore: number;
  exchangePressure: "INFLOW" | "OUTFLOW" | "NEUTRAL";
  labels: WalletLabel[];
  events: WalletEvent[];
  bitcoinUtxos?: BitcoinUtxo[];
  solanaPrograms?: Array<{
    program: string;
    interactions24h: number;
    interpretation: string;
  }>;
};

export type EntityCluster = {
  id: string;
  name: string;
  category: WalletLabel["category"];
  chains: Chain[];
  confidence: ConfidenceLevel;
  walletCount: number;
  balanceUsd: number;
  netFlow24hUsd: number;
  rationale: string;
  wallets: Array<{
    address: string;
    chain: Chain;
    confidence: ConfidenceLevel;
  }>;
};

export type WatchRule = {
  id: string;
  name: string;
  chain: Chain | "ALL";
  target: string;
  condition: string;
  status: "ACTIVE" | "PAUSED";
};

export type IntelligenceAlert = {
  id: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  chain: Chain;
  title: string;
  detail: string;
  timestamp: string;
  target: string;
};

// ============================================================================
// PERSONAL FINANCE TYPES
// ============================================================================

export type AssetType =
  | "cash"
  | "rpu"
  | "bond"
  | "stock_idx"
  | "stock_us"
  | "gold"
  | "crypto"
  | "mutual_fund"
  | "property"
  | "other";

export type TransactionType =
  | "buy"
  | "sell"
  | "dividend"
  | "interest"
  | "split"
  | "merge"
  | "transfer_in"
  | "transfer_out";

export type Currency = "IDR" | "USD";

export type RecurringFrequency = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

export type GoalType =
  | "hajj"
  | "education"
  | "ev"
  | "emergency"
  | "retirement"
  | "home"
  | "wedding"
  | "travel"
  | "other";

export type GoalPriority = "low" | "medium" | "high" | "critical";
export type GoalStatus = "active" | "paused" | "completed" | "cancelled";

export type PolicyType =
  | "life"
  | "health"
  | "critical_illness"
  | "disability"
  | "auto"
  | "property"
  | "other";

export type PremiumFrequency =
  | "monthly"
  | "quarterly"
  | "semi_annual"
  | "annual"
  | "one_time";

export type PersonalAsset = {
  id: string;
  userId: string;
  name: string;
  symbol?: string | null;
  assetType: AssetType;
  quantity: number;
  avgBuyPrice?: number | null;
  currentPrice?: number | null;
  currency: Currency;
  platform?: string | null;
  notes?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AssetTransactionRecord = {
  id: string;
  userId: string;
  assetId: string;
  type: TransactionType;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
  fees: number;
  currency: Currency;
  transactionDate: string;
  notes?: string | null;
  createdAt: string;
};

export type ExpenseCategory = {
  id: string;
  userId: string;
  name: string;
  parentId?: string | null;
  icon?: string | null;
  color?: string | null;
  budgetLimit?: number | null;
  isActive: boolean;
};

export type CashFlowEntry = {
  id: string;
  userId: string;
  entryType: "income" | "expense";
  categoryId?: string | null;
  amount: number;
  currency: Currency;
  paymentMethod?: string | null;
  description?: string | null;
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency | null;
  transactionDate: string;
  notes?: string | null;
};

export type FinancialGoal = {
  id: string;
  userId: string;
  name: string;
  type: GoalType;
  targetAmount: number;
  currentAmount: number;
  currency: Currency;
  deadline?: string | null;
  priority: GoalPriority;
  status: GoalStatus;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  completedAt?: string | null;
};

export type GoalAllocation = {
  id: string;
  goalId: string;
  assetId: string;
  allocatedAmount: number;
  allocationDate: string;
};

export type InsurancePolicy = {
  id: string;
  userId: string;
  policyType: PolicyType;
  provider: string;
  policyNumber?: string | null;
  coverageAmount: number;
  currency: Currency;
  premiumAmount: number;
  premiumFrequency: PremiumFrequency;
  startDate: string;
  expiryDate?: string | null;
  beneficiary?: string | null;
  isActive: boolean;
};

export type NetWorthSnapshot = {
  id: string;
  userId: string;
  snapshotDate: string;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  breakdownJson?: Record<string, number> | null;
  currency: Currency;
};

export type RebalancingRule = {
  id: string;
  userId: string;
  assetType: AssetType;
  targetPct: number;
  thresholdPct: number;
  isActive: boolean;
};

export type RebalancingDeviation = {
  assetType: AssetType;
  current: number;
  target: number;
  deviation: number;
  action: "trim" | "add" | "hold";
};

export type RebalancingStatus = {
  currentAllocation: Record<string, number>;
  targetAllocation: Record<string, number>;
  totalValueIdr: number;
  deviations: RebalancingDeviation[];
  alerts: Array<{
    assetType: AssetType;
    severity: "low" | "medium" | "high";
    message: string;
  }>;
};

export type CashFlowSummary = {
  totalIncome: number;
  totalExpense: number;
  netCashFlow: number;
  savingsRate: number;
  topCategories: Array<{
    categoryId: string | null;
    name: string;
    amount: number;
    pctOfExpense: number;
  }>;
};
