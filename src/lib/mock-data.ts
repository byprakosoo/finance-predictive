import type {
  AlphaCandidate,
  AssetTransactionRecord,
  CashFlowEntry,
  EntityCluster,
  ExpenseCategory,
  FinancialGoal,
  GoalAllocation,
  Holding,
  InsurancePolicy,
  IntelligenceAlert,
  MacroIndicator,
  MorningBrief,
  NetWorthSnapshot,
  PersonalAsset,
  PortfolioSignal,
  PortfolioSummary,
  RebalancingRule,
  WalletIntelligence,
  WatchlistItem,
  WatchRule,
} from "@/lib/types";

export const holdings: Holding[] = [
  {
    id: "holding-btc",
    assetId: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    quantity: 0.42,
    averageBuyPrice: 62800,
    currentPrice: 68740,
    change24h: 1.7,
    notes: "Core long-term position",
  },
  {
    id: "holding-eth",
    assetId: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    quantity: 5.8,
    averageBuyPrice: 2850,
    currentPrice: 4120,
    change24h: -0.8,
  },
  {
    id: "holding-sol",
    assetId: "solana",
    symbol: "SOL",
    name: "Solana",
    quantity: 82,
    averageBuyPrice: 181,
    currentPrice: 132,
    change24h: -4.9,
    notes: "Review after ecosystem updates",
  },
  {
    id: "holding-arb",
    assetId: "arbitrum",
    symbol: "ARB",
    name: "Arbitrum",
    quantity: 4200,
    averageBuyPrice: 1.32,
    currentPrice: 0.84,
    change24h: -6.4,
  },
];

export const portfolioSummary: PortfolioSummary = {
  totalValue: 67271.4,
  totalInvested: 64830,
  unrealizedPl: 2441.4,
  unrealizedPlPercent: 3.77,
  change24h: -1.42,
  topGainer: "BTC",
  topLoser: "ARB",
  macroStatus: "NEUTRAL",
  fearGreed: {
    value: 38,
    label: "Fear",
  },
};

export const portfolioSignals: PortfolioSignal[] = [
  {
    assetId: "bitcoin",
    signal: "HOLD",
    confidence: "MEDIUM",
    reason: "BTC is trading within the configured hold band relative to your average buy price.",
  },
  {
    assetId: "ethereum",
    signal: "TAKE_PROFIT",
    confidence: "HIGH",
    reason: "ETH is 44.6% above your average buy price. This is within the take-profit review zone.",
  },
  {
    assetId: "solana",
    signal: "BUY_ZONE",
    confidence: "MEDIUM",
    reason: "SOL is more than 20% below your average buy price while macro risk is not currently risk-off.",
  },
  {
    assetId: "arbitrum",
    signal: "RISK_WARNING",
    confidence: "HIGH",
    reason: "ARB is down more than 30% from your average buy price and sentiment remains in Fear territory.",
  },
];

export const alphaCandidates: AlphaCandidate[] = [
  {
    assetId: "celestia",
    rank: 1,
    symbol: "TIA",
    name: "Celestia",
    priceUsd: 12.84,
    marketCap: 2360000000,
    volume24h: 198000000,
    priceChange24h: 8.4,
    priceChange7d: 21.7,
    volumeToMarketCap: 8.4,
    alphaScore: 86,
    riskLevel: "MEDIUM",
    rationale: "Unusual volume acceleration and strong 7d momentum make this worth manual review.",
    watched: true,
  },
  {
    assetId: "render-token",
    rank: 2,
    symbol: "RNDR",
    name: "Render",
    priceUsd: 9.16,
    marketCap: 3520000000,
    volume24h: 246000000,
    priceChange24h: 4.1,
    priceChange7d: 16.2,
    volumeToMarketCap: 7.0,
    alphaScore: 78,
    riskLevel: "MEDIUM",
    rationale: "Narrative relevance and liquidity remain constructive, with moderate volatility.",
    watched: false,
  },
  {
    assetId: "ondo-finance",
    rank: 3,
    symbol: "ONDO",
    name: "Ondo",
    priceUsd: 1.42,
    marketCap: 1980000000,
    volume24h: 164000000,
    priceChange24h: 2.8,
    priceChange7d: 12.1,
    volumeToMarketCap: 8.3,
    alphaScore: 73,
    riskLevel: "LOW",
    rationale: "Steady momentum and strong liquidity proxy place it in the watchlist candidate range.",
    watched: false,
  },
  {
    assetId: "akash-network",
    rank: 4,
    symbol: "AKT",
    name: "Akash Network",
    priceUsd: 4.91,
    marketCap: 1190000000,
    volume24h: 48000000,
    priceChange24h: 14.9,
    priceChange7d: 28.4,
    volumeToMarketCap: 4.0,
    alphaScore: 71,
    riskLevel: "HIGH",
    rationale: "Momentum is strong, but volatility requires a higher-risk manual review.",
    watched: false,
  },
];

export const watchlist: WatchlistItem[] = [
  {
    id: "watch-tia",
    symbol: "TIA",
    name: "Celestia",
    alphaScore: 86,
    currentPrice: 12.84,
    rationale: "Volume acceleration and 7d momentum are above the MVP watch threshold.",
    notes: "Review ecosystem catalysts.",
  },
  {
    id: "watch-ondo",
    symbol: "ONDO",
    name: "Ondo",
    alphaScore: 73,
    currentPrice: 1.42,
    rationale: "Liquidity and narrative relevance remain constructive.",
  },
];

export const macroIndicators: MacroIndicator[] = [
  {
    id: "fed-funds",
    name: "Fed Funds Rate",
    value: "5.25%",
    trend: "FLAT",
    interpretation: "Rate pressure is not improving yet, but it is not accelerating.",
  },
  {
    id: "cpi-yoy",
    name: "CPI YoY",
    value: "3.1%",
    trend: "DOWN",
    interpretation: "Cooling inflation is supportive for risk assets.",
  },
  {
    id: "ten-year",
    name: "10Y Treasury Yield",
    value: "4.42%",
    trend: "UP",
    interpretation: "Yield pressure remains a headwind for speculative assets.",
  },
  {
    id: "m2",
    name: "M2 Money Supply",
    value: "$20.9T",
    trend: "UP",
    interpretation: "Liquidity trend is modestly constructive.",
  },
];

export const morningBrief: MorningBrief = {
  title: "Morning Brief",
  date: "2026-05-29",
  marketStatus: "NEUTRAL",
  macroStatus: "NEUTRAL",
  generatedAt: "2026-05-29 07:12",
  sourceFreshness: "Market data refreshed 12 minutes ago. Macro data refreshed today.",
  sections: [
    {
      title: "Market overview",
      body: "Crypto market conditions are neutral to cautious. BTC is holding above its average cost basis while ETH remains the strongest contributor in the portfolio.",
    },
    {
      title: "Macro condition",
      body: "Macro status is Neutral. Cooling CPI and improving liquidity are offset by elevated 10Y yield pressure.",
    },
    {
      title: "Portfolio movement",
      body: "The portfolio is down 1.42% over 24h, mainly affected by SOL and ARB weakness.",
    },
    {
      title: "Assets to review",
      body: "ETH is in a take-profit review zone. ARB has a risk warning due to drawdown and weak sentiment.",
    },
    {
      title: "Alpha hunter candidates",
      body: "TIA, RNDR, and ONDO show unusual activity based on public market data and may be worth manual review.",
    },
  ],
};

export const walletIntelligence: WalletIntelligence[] = [
  {
    address: "bc1q9f2n8x7d3m5w4v6r2s0k8l4p6a3t9c2e5z7h1m",
    chain: "BITCOIN",
    addressType: "Native SegWit",
    entityId: "entity-btc-whale-cluster",
    entityName: "BTC Accumulation Cluster",
    firstSeenAt: "2022-11-18",
    lastSeenAt: "2026-05-29",
    balanceUsd: 18462000,
    netFlow24hUsd: 1280000,
    activityScore: 82,
    smartFlowScore: 76,
    exchangePressure: "OUTFLOW",
    labels: [
      {
        label: "High-balance BTC cluster",
        category: "WHALE",
        confidence: "MEDIUM",
        sourceType: "HEURISTIC",
        sourceRef: "common-input and consolidation heuristics",
        explanation: "Clustered from repeated co-spends and long-horizon accumulation behavior. This is not a verified identity.",
      },
      {
        label: "Self-custody pattern",
        category: "UNKNOWN",
        confidence: "LOW",
        sourceType: "HEURISTIC",
        sourceRef: "UTXO age and exchange outflow pattern",
        explanation: "Recent exchange-like outflows are followed by low-churn UTXO holding behavior.",
      },
    ],
    events: [
      {
        id: "btc-event-1",
        chain: "BITCOIN",
        type: "UTXO_RECEIVE",
        asset: "BTC",
        amount: 12.4,
        valueUsd: 852376,
        counterparty: "Exchange-like hot wallet cluster",
        timestamp: "2026-05-29 06:42",
        txHash: "f2a67c9e8d4b7a3c1e2f90184b6c5d0a2f4e7b9c8d1a3e6f9b2c4d8a0e1f7b6c",
      },
      {
        id: "btc-event-2",
        chain: "BITCOIN",
        type: "UTXO_SPEND",
        asset: "BTC",
        amount: 2.1,
        valueUsd: 144354,
        counterparty: "Fresh change cluster",
        timestamp: "2026-05-28 19:15",
        txHash: "a6d3b8c2e1f94a0d7c6b5e4f3a2d1c0b9e8f7a6d5c4b3e2f1a0d9c8b7e6f5a4",
      },
    ],
    bitcoinUtxos: [
      { txid: "f2a67c9e8d4b7a3c1e2f90184b6c5d0a2f4e7b9c8d1a3e6f9b2c4d8a0e1f7b6c", vout: 0, valueSats: 1240000000, ageDays: 0, status: "UNSPENT" },
      { txid: "c7e2f8a9b4d1c0e6f5a3b2c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9", vout: 2, valueSats: 820000000, ageDays: 183, status: "UNSPENT" },
      { txid: "b1d4f7a0c3e6b9d2f5a8c1e4b7d0f3a6c9e2b5d8f1a4c7e0b3d6f9a2c5e8b1d4", vout: 1, valueSats: 210000000, ageDays: 4, status: "SPENT" },
    ],
  },
  {
    address: "7aVw9xZsM2pQ8rYh6Lc3Tn4Dg1Bf5Ke9Uj2Ns8PqR4Lm",
    chain: "SOLANA",
    addressType: "System account",
    entityId: "entity-sol-defi-operator",
    entityName: "Solana DeFi Operator",
    firstSeenAt: "2024-02-04",
    lastSeenAt: "2026-05-29",
    balanceUsd: 3421000,
    netFlow24hUsd: -420000,
    activityScore: 91,
    smartFlowScore: 84,
    exchangePressure: "NEUTRAL",
    labels: [
      {
        label: "Active DeFi operator",
        category: "WHALE",
        confidence: "MEDIUM",
        sourceType: "HEURISTIC",
        sourceRef: "DEX interaction and token routing pattern",
        explanation: "Repeated high-value swaps and liquidity routing across known Solana programs.",
      },
      {
        label: "User-reviewed watch wallet",
        category: "USER",
        confidence: "HIGH",
        sourceType: "USER_SUBMITTED",
        sourceRef: "workspace watchlist",
        explanation: "Manually added by the workspace user for monitoring.",
      },
    ],
    events: [
      {
        id: "sol-event-1",
        chain: "SOLANA",
        type: "SWAP",
        asset: "SOL",
        amount: 3180,
        valueUsd: 419760,
        counterparty: "Jupiter route",
        timestamp: "2026-05-29 05:18",
        txHash: "5mZ8wL4qP2rS9xN6tV3cB7kY1hD4aF8jQ6pE2nR9sT5u",
      },
      {
        id: "sol-event-2",
        chain: "SOLANA",
        type: "PROGRAM_CALL",
        asset: "USDC",
        amount: 250000,
        valueUsd: 250000,
        counterparty: "Lending market",
        timestamp: "2026-05-28 22:03",
        txHash: "2qK9nD5sP8vX3mL7cR1tY6aF4hJ0bN2wE5uS9zG8pA6d",
      },
    ],
    solanaPrograms: [
      {
        program: "Jupiter Aggregator",
        interactions24h: 9,
        interpretation: "High routing activity suggests active repositioning rather than passive holding.",
      },
      {
        program: "Token Program",
        interactions24h: 24,
        interpretation: "Frequent SPL token movement across associated token accounts.",
      },
    ],
  },
];

export const entityClusters: EntityCluster[] = [
  {
    id: "entity-btc-whale-cluster",
    name: "BTC Accumulation Cluster",
    category: "WHALE",
    chains: ["BITCOIN"],
    confidence: "MEDIUM",
    walletCount: 18,
    balanceUsd: 74200000,
    netFlow24hUsd: 4820000,
    rationale: "Common-input ownership and repeated exchange-outflow consolidation suggest one high-balance cluster, but ownership is probabilistic.",
    wallets: [
      { address: "bc1q9f2n8x7d3m5w4v6r2s0k8l4p6a3t9c2e5z7h1m", chain: "BITCOIN", confidence: "MEDIUM" },
      { address: "bc1q73k0n5v8d2m9x4p6q1r7s3t5a8c0e2h9j4l6n", chain: "BITCOIN", confidence: "LOW" },
    ],
  },
  {
    id: "entity-sol-defi-operator",
    name: "Solana DeFi Operator",
    category: "WHALE",
    chains: ["SOLANA"],
    confidence: "MEDIUM",
    walletCount: 6,
    balanceUsd: 9650000,
    netFlow24hUsd: -760000,
    rationale: "Shared funding source and repeated routing behavior across Solana DeFi programs indicate likely operational linkage.",
    wallets: [
      { address: "7aVw9xZsM2pQ8rYh6Lc3Tn4Dg1Bf5Ke9Uj2Ns8PqR4Lm", chain: "SOLANA", confidence: "MEDIUM" },
      { address: "3rPq8LmN6sT2uV9xY4aB7cD1eF5gH8jK0mN2pQ6rS9tU", chain: "SOLANA", confidence: "LOW" },
    ],
  },
];

export const watchRules: WatchRule[] = [
  {
    id: "rule-btc-whale-inflow",
    name: "BTC whale exchange outflow",
    chain: "BITCOIN",
    target: "BTC Accumulation Cluster",
    condition: "Alert when 24h net outflow from exchange-like clusters exceeds $1M.",
    status: "ACTIVE",
  },
  {
    id: "rule-sol-defi-rotation",
    name: "SOL DeFi rotation",
    chain: "SOLANA",
    target: "Solana DeFi Operator",
    condition: "Alert when watched wallet swaps more than $250k in 24h.",
    status: "ACTIVE",
  },
];

export const intelligenceAlerts: IntelligenceAlert[] = [
  {
    id: "alert-btc-1",
    severity: "HIGH",
    chain: "BITCOIN",
    title: "Large BTC exchange outflow detected",
    detail: "Watched BTC cluster received 12.4 BTC from an exchange-like hot wallet cluster. Review accumulation context.",
    timestamp: "2026-05-29 06:42",
    target: "BTC Accumulation Cluster",
  },
  {
    id: "alert-sol-1",
    severity: "MEDIUM",
    chain: "SOLANA",
    title: "Solana DeFi wallet repositioned",
    detail: "Watched wallet routed high-value SOL swaps through Jupiter. This is observed activity, not a trade instruction.",
    timestamp: "2026-05-29 05:18",
    target: "Solana DeFi Operator",
  },
];

// ============================================================================
// PERSONAL FINANCE SEED DATA
// Reflects user's actual financial snapshot (June 2026).
// Will be replaced by real database records once DB is connected.
// ============================================================================

const DEMO_USER = "demo-user";

export const expenseCategoriesSeed: ExpenseCategory[] = [
  { id: "cat-makan", userId: DEMO_USER, name: "Makan & Grocery", icon: "utensils", color: "#ef4444", budgetLimit: 5500000, isActive: true },
  { id: "cat-utility", userId: DEMO_USER, name: "Utility", icon: "zap", color: "#f59e0b", budgetLimit: 2500000, isActive: true },
  { id: "cat-transport", userId: DEMO_USER, name: "Transport", icon: "car", color: "#3b82f6", budgetLimit: 1800000, isActive: true },
  { id: "cat-kesehatan", userId: DEMO_USER, name: "Kesehatan", icon: "heart", color: "#ec4899", budgetLimit: 800000, isActive: true },
  { id: "cat-zakat", userId: DEMO_USER, name: "Zakat & Wakaf", icon: "moon", color: "#10b981", budgetLimit: 500000, isActive: true },
  { id: "cat-hiburan", userId: DEMO_USER, name: "Hiburan & Langganan", icon: "tv", color: "#8b5cf6", budgetLimit: 500000, isActive: true },
  { id: "cat-tabungan", userId: DEMO_USER, name: "Tabungan & Investasi", icon: "piggy-bank", color: "#06b6d4", budgetLimit: 4000000, isActive: true },
  { id: "cat-renovasi", userId: DEMO_USER, name: "Renovasi", icon: "hammer", color: "#f97316", budgetLimit: 0, isActive: true },
  { id: "cat-lain", userId: DEMO_USER, name: "Lain-lain", icon: "more", color: "#64748b", budgetLimit: 500000, isActive: true },
  { id: "cat-gaji", userId: DEMO_USER, name: "Gaji", icon: "wallet", color: "#22c55e", budgetLimit: 0, isActive: true },
  { id: "cat-sidehustle", userId: DEMO_USER, name: "Side Hustle", icon: "briefcase", color: "#84cc16", budgetLimit: 0, isActive: true },
];

export const personalAssetsSeed: PersonalAsset[] = [
  // Crypto (49.5%)
  { id: "pa-btc", userId: DEMO_USER, name: "Bitcoin Core", symbol: "BTC", assetType: "crypto", quantity: 0.55, avgBuyPrice: 92000, currentPrice: 66527, currency: "USD", platform: "Binance", notes: "Long-term core, 89% of crypto allocation", isActive: true, createdAt: "2024-09-15T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-eth", userId: DEMO_USER, name: "Ethereum", symbol: "ETH", assetType: "crypto", quantity: 2.5, avgBuyPrice: 3800, currentPrice: 1750, currency: "USD", platform: "Binance", isActive: true, createdAt: "2024-10-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-mstr", userId: DEMO_USER, name: "Strategy Inc (MSTR)", symbol: "MSTR", assetType: "stock_us", quantity: 1, avgBuyPrice: 410, currentPrice: 244, currency: "USD", platform: "Stockbit", notes: "Bitcoin proxy leveraged", isActive: true, createdAt: "2024-11-10T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Stocks US (20.3%)
  { id: "pa-aapl", userId: DEMO_USER, name: "Apple", symbol: "AAPL", assetType: "stock_us", quantity: 4, avgBuyPrice: 195, currentPrice: 185, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2024-12-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-jnj", userId: DEMO_USER, name: "Johnson & Johnson", symbol: "JNJ", assetType: "stock_us", quantity: 3, avgBuyPrice: 160, currentPrice: 156, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2024-12-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-nvda", userId: DEMO_USER, name: "Nvidia", symbol: "NVDA", assetType: "stock_us", quantity: 22, avgBuyPrice: 145, currentPrice: 157, currency: "USD", platform: "Stockbit", notes: "Concentrated 32% of US stocks — consider trim", isActive: true, createdAt: "2025-01-20T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-spy", userId: DEMO_USER, name: "S&P 500 ETF", symbol: "SPY", assetType: "stock_us", quantity: 3, avgBuyPrice: 510, currentPrice: 496, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2024-09-15T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-tsla", userId: DEMO_USER, name: "Tesla", symbol: "TSLA", assetType: "stock_us", quantity: 1, avgBuyPrice: 280, currentPrice: 249, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2025-02-15T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-vhd", userId: DEMO_USER, name: "Vanguard High Div ETF", symbol: "VYM", assetType: "stock_us", quantity: 8, avgBuyPrice: 165, currentPrice: 159, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2024-12-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Stocks IDX (small)
  { id: "pa-adro", userId: DEMO_USER, name: "Adaro Energy", symbol: "ADRO", assetType: "stock_idx", quantity: 200, avgBuyPrice: 3500, currentPrice: 3450, currency: "IDR", platform: "Stockbit", isActive: true, createdAt: "2025-03-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-asii", userId: DEMO_USER, name: "Astra International", symbol: "ASII", assetType: "stock_idx", quantity: 200, avgBuyPrice: 9600, currentPrice: 9600, currency: "IDR", platform: "Stockbit", isActive: true, createdAt: "2025-03-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-indf", userId: DEMO_USER, name: "Indofood", symbol: "INDF", assetType: "stock_idx", quantity: 100, avgBuyPrice: 27000, currentPrice: 27000, currency: "IDR", platform: "Stockbit", isActive: true, createdAt: "2025-03-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Gold
  { id: "pa-gold", userId: DEMO_USER, name: "Antam 24K", symbol: "ANTM", assetType: "gold", quantity: 25, avgBuyPrice: 1100000, currentPrice: 2733000, currency: "IDR", platform: "Logam Mulia", isActive: true, createdAt: "2023-06-15T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Liquid
  { id: "pa-cash-bca", userId: DEMO_USER, name: "Tabungan BCA", symbol: "BCA", assetType: "cash", quantity: 80, avgBuyPrice: 1, currentPrice: 1, currency: "IDR", platform: "BCA", notes: "Operasional + emergency", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-cash-mandiri", userId: DEMO_USER, name: "Tabungan Mandiri", symbol: "MANDIRI", assetType: "cash", quantity: 35, avgBuyPrice: 1, currentPrice: 1, currency: "IDR", platform: "Mandiri", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-rdpu-sucor", userId: DEMO_USER, name: "Sucorinvest Money Market", symbol: "SUCRMMF", assetType: "rpu", quantity: 21844648, avgBuyPrice: 1, currentPrice: 1.045, currency: "IDR", platform: "Bibit", notes: "Yield ~4.5% p.a.", isActive: true, createdAt: "2024-06-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-rdpu-sucor-sharia", userId: DEMO_USER, name: "Sucorinvest Sharia MM", symbol: "SUCRSYR", assetType: "rpu", quantity: 17841856, avgBuyPrice: 1, currentPrice: 1.038, currency: "IDR", platform: "Bibit", isActive: true, createdAt: "2024-06-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Bonds
  { id: "pa-bond-manulife", userId: DEMO_USER, name: "Manulife ORI II", symbol: "MANORI2", assetType: "bond", quantity: 20482486, avgBuyPrice: 1, currentPrice: 1.054, currency: "IDR", platform: "Bibit", notes: "Hold to maturity", isActive: true, createdAt: "2025-02-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-bond-majoris", userId: DEMO_USER, name: "Majoris Sukuk Negara", symbol: "MAJSUK", assetType: "bond", quantity: 14211685, avgBuyPrice: 1, currentPrice: 1.058, currency: "IDR", platform: "Bibit", isActive: true, createdAt: "2025-02-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
];

export const assetTransactionsSeed: AssetTransactionRecord[] = [
  { id: "tx-1", userId: DEMO_USER, assetId: "pa-btc", type: "buy", quantity: 0.1, pricePerUnit: 60000, totalAmount: 6000, fees: 5, currency: "USD", transactionDate: "2024-09-15T00:00:00Z", createdAt: "2024-09-15T00:00:00Z" },
  { id: "tx-2", userId: DEMO_USER, assetId: "pa-btc", type: "buy", quantity: 0.2, pricePerUnit: 95000, totalAmount: 19000, fees: 8, currency: "USD", transactionDate: "2025-01-10T00:00:00Z", createdAt: "2025-01-10T00:00:00Z" },
  { id: "tx-3", userId: DEMO_USER, assetId: "pa-btc", type: "buy", quantity: 0.25, pricePerUnit: 108000, totalAmount: 27000, fees: 10, currency: "USD", transactionDate: "2025-08-20T00:00:00Z", createdAt: "2025-08-20T00:00:00Z" },
  { id: "tx-4", userId: DEMO_USER, assetId: "pa-eth", type: "buy", quantity: 2.5, pricePerUnit: 3800, totalAmount: 9500, fees: 6, currency: "USD", transactionDate: "2024-10-01T00:00:00Z", createdAt: "2024-10-01T00:00:00Z" },
  { id: "tx-5", userId: DEMO_USER, assetId: "pa-nvda", type: "buy", quantity: 22, pricePerUnit: 145, totalAmount: 3190, fees: 3, currency: "USD", transactionDate: "2025-01-20T00:00:00Z", createdAt: "2025-01-20T00:00:00Z" },
];

export const cashFlowEntriesSeed: CashFlowEntry[] = [
  { id: "cf-1", userId: DEMO_USER, entryType: "income", categoryId: "cat-gaji", amount: 15500000, currency: "IDR", paymentMethod: "transfer", description: "Gaji Pokok Juni 2026", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-01T00:00:00Z" },
  { id: "cf-2", userId: DEMO_USER, entryType: "expense", categoryId: "cat-makan", amount: 1260000, currency: "IDR", paymentMethod: "transfer", description: "Catering keluarga", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-05T00:00:00Z" },
  { id: "cf-3", userId: DEMO_USER, entryType: "expense", categoryId: "cat-makan", amount: 3194222, currency: "IDR", paymentMethod: "transfer", description: "Groceries mingguan", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-08T00:00:00Z" },
  { id: "cf-4", userId: DEMO_USER, entryType: "expense", categoryId: "cat-makan", amount: 800000, currency: "IDR", paymentMethod: "cash", description: "Makan weekend", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-09T00:00:00Z" },
  { id: "cf-5", userId: DEMO_USER, entryType: "expense", categoryId: "cat-utility", amount: 1000000, currency: "IDR", paymentMethod: "auto-debit", description: "Listrik PLN", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-10T00:00:00Z" },
  { id: "cf-6", userId: DEMO_USER, entryType: "expense", categoryId: "cat-utility", amount: 486350, currency: "IDR", paymentMethod: "auto-debit", description: "Internet IndiHome", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-12T00:00:00Z" },
  { id: "cf-7", userId: DEMO_USER, entryType: "expense", categoryId: "cat-transport", amount: 500000, currency: "IDR", paymentMethod: "cash", description: "Bensin mobil", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-08T00:00:00Z" },
  { id: "cf-8", userId: DEMO_USER, entryType: "expense", categoryId: "cat-transport", amount: 250000, currency: "IDR", paymentMethod: "cash", description: "Bensin motor", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-08T00:00:00Z" },
  { id: "cf-9", userId: DEMO_USER, entryType: "expense", categoryId: "cat-zakat", amount: 400000, currency: "IDR", paymentMethod: "transfer", description: "Zakat penghasilan", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-01T00:00:00Z" },
  { id: "cf-10", userId: DEMO_USER, entryType: "expense", categoryId: "cat-hiburan", amount: 309000, currency: "IDR", paymentMethod: "card", description: "Langganan AI tools", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-01T00:00:00Z" },
  { id: "cf-11", userId: DEMO_USER, entryType: "expense", categoryId: "cat-tabungan", amount: 8400000, currency: "IDR", paymentMethod: "auto-debit", description: "DCA + Tabungan motor listrik", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-01T00:00:00Z" },
  { id: "cf-12", userId: DEMO_USER, entryType: "expense", categoryId: "cat-renovasi", amount: 35000000, currency: "IDR", paymentMethod: "transfer", description: "Renovasi taman besar", isRecurring: false, transactionDate: "2026-03-17T00:00:00Z" },
];

export const financialGoalsSeed: FinancialGoal[] = [
  { id: "goal-hajj", userId: DEMO_USER, name: "Haji Regular 2 Orang", type: "hajj", targetAmount: 80000000, currentAmount: 0, currency: "IDR", deadline: "2028-12-31T00:00:00Z", priority: "high", status: "active", description: "Setoran 2 x 35jt + tiket & living cost", icon: "kaaba", color: "#10b981" },
  { id: "goal-tk", userId: DEMO_USER, name: "Dana Pendidikan TK", type: "education", targetAmount: 60000000, currentAmount: 0, currency: "IDR", deadline: "2029-06-30T00:00:00Z", priority: "high", status: "active", description: "Anak masuk TK A 2029, inflation adjusted", icon: "book", color: "#3b82f6" },
  { id: "goal-motor", userId: DEMO_USER, name: "Motor Listrik", type: "ev", targetAmount: 25000000, currentAmount: 0, currency: "IDR", deadline: "2026-12-31T00:00:00Z", priority: "medium", status: "active", description: "Alva N3 atau Polytron Fox 350", icon: "bike", color: "#f59e0b" },
  { id: "goal-mobil", userId: DEMO_USER, name: "Mobil Listrik", type: "ev", targetAmount: 350000000, currentAmount: 0, currency: "IDR", deadline: "2028-06-30T00:00:00Z", priority: "medium", status: "active", description: "BYD Atto 1 atau Jaecoo J5", icon: "car", color: "#ef4444" },
  { id: "goal-emergency", userId: DEMO_USER, name: "Emergency Fund", type: "emergency", targetAmount: 70000000, currentAmount: 0, currency: "IDR", deadline: "2027-12-31T00:00:00Z", priority: "critical", status: "active", description: "3-6 bulan expense di RDPU", icon: "shield", color: "#06b6d4" },
];

export const goalAllocationsSeed: GoalAllocation[] = [];

export const insurancePoliciesSeed: InsurancePolicy[] = [
  { id: "ins-bpjs", userId: DEMO_USER, policyType: "health", provider: "BPJS Kesehatan", policyNumber: "0001-2345-6789", coverageAmount: 0, currency: "IDR", premiumAmount: 150000, premiumFrequency: "monthly", startDate: "2024-01-01T00:00:00Z", expiryDate: null, isActive: true, beneficiary: "Keluarga" },
];

export const netWorthSnapshotsSeed: NetWorthSnapshot[] = [
  { id: "nw-2025-12", userId: DEMO_USER, snapshotDate: "2025-12-31T00:00:00Z", totalAssets: 920000000, totalLiabilities: 0, netWorth: 920000000, breakdownJson: { crypto: 480000000, stock_us: 175000000, stock_idx: 5000000, gold: 60000000, liquid: 200000000 }, currency: "IDR" },
  { id: "nw-2026-06", userId: DEMO_USER, snapshotDate: "2026-06-18T00:00:00Z", totalAssets: 857015707, totalLiabilities: 0, netWorth: 857015707, breakdownJson: { crypto: 424054094, stock_us: 174035757, stock_idx: 5310000, gold: 69165000, liquid: 189760856 }, currency: "IDR" },
];

export const rebalancingRulesSeed: RebalancingRule[] = [
  { id: "rb-cash", userId: DEMO_USER, assetType: "cash", targetPct: 8.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-rpu", userId: DEMO_USER, assetType: "rpu", targetPct: 5.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-bond", userId: DEMO_USER, assetType: "bond", targetPct: 5.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-stock-idx", userId: DEMO_USER, assetType: "stock_idx", targetPct: 5.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-stock-us", userId: DEMO_USER, assetType: "stock_us", targetPct: 15.0, thresholdPct: 5.0, isActive: true },
  { id: "rb-gold", userId: DEMO_USER, assetType: "gold", targetPct: 10.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-crypto", userId: DEMO_USER, assetType: "crypto", targetPct: 20.0, thresholdPct: 5.0, isActive: true },
];


// ============================================================================
// PERSONAL FINANCE SEED DATA
// Reflects user's actual financial snapshot (June 2026).
// Will be replaced by real database records once DB is connected.
// ============================================================================

const DEMO_USER = "demo-user";

export const expenseCategoriesSeed: ExpenseCategory[] = [
  { id: "cat-makan", userId: DEMO_USER, name: "Makan & Grocery", icon: "utensils", color: "#ef4444", budgetLimit: 5500000, isActive: true },
  { id: "cat-utility", userId: DEMO_USER, name: "Utility", icon: "zap", color: "#f59e0b", budgetLimit: 2500000, isActive: true },
  { id: "cat-transport", userId: DEMO_USER, name: "Transport", icon: "car", color: "#3b82f6", budgetLimit: 1800000, isActive: true },
  { id: "cat-kesehatan", userId: DEMO_USER, name: "Kesehatan", icon: "heart", color: "#ec4899", budgetLimit: 800000, isActive: true },
  { id: "cat-zakat", userId: DEMO_USER, name: "Zakat & Wakaf", icon: "moon", color: "#10b981", budgetLimit: 500000, isActive: true },
  { id: "cat-hiburan", userId: DEMO_USER, name: "Hiburan & Langganan", icon: "tv", color: "#8b5cf6", budgetLimit: 500000, isActive: true },
  { id: "cat-tabungan", userId: DEMO_USER, name: "Tabungan & Investasi", icon: "piggy-bank", color: "#06b6d4", budgetLimit: 4000000, isActive: true },
  { id: "cat-renovasi", userId: DEMO_USER, name: "Renovasi", icon: "hammer", color: "#f97316", budgetLimit: 0, isActive: true },
  { id: "cat-lain", userId: DEMO_USER, name: "Lain-lain", icon: "more", color: "#64748b", budgetLimit: 500000, isActive: true },
  { id: "cat-gaji", userId: DEMO_USER, name: "Gaji", icon: "wallet", color: "#22c55e", budgetLimit: 0, isActive: true },
  { id: "cat-sidehustle", userId: DEMO_USER, name: "Side Hustle", icon: "briefcase", color: "#84cc16", budgetLimit: 0, isActive: true },
];

export const personalAssetsSeed: PersonalAsset[] = [
  // Crypto (49.5%)
  { id: "pa-btc", userId: DEMO_USER, name: "Bitcoin Core", symbol: "BTC", assetType: "crypto", quantity: 0.55, avgBuyPrice: 92000, currentPrice: 66527, currency: "USD", platform: "Binance", notes: "Long-term core, 89% of crypto allocation", isActive: true, createdAt: "2024-09-15T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-eth", userId: DEMO_USER, name: "Ethereum", symbol: "ETH", assetType: "crypto", quantity: 2.5, avgBuyPrice: 3800, currentPrice: 1750, currency: "USD", platform: "Binance", isActive: true, createdAt: "2024-10-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-mstr", userId: DEMO_USER, name: "Strategy Inc (MSTR)", symbol: "MSTR", assetType: "stock_us", quantity: 1, avgBuyPrice: 410, currentPrice: 244, currency: "USD", platform: "Stockbit", notes: "Bitcoin proxy leveraged", isActive: true, createdAt: "2024-11-10T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Stocks US (20.3%)
  { id: "pa-aapl", userId: DEMO_USER, name: "Apple", symbol: "AAPL", assetType: "stock_us", quantity: 4, avgBuyPrice: 195, currentPrice: 185, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2024-12-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-jnj", userId: DEMO_USER, name: "Johnson & Johnson", symbol: "JNJ", assetType: "stock_us", quantity: 3, avgBuyPrice: 160, currentPrice: 156, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2024-12-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-nvda", userId: DEMO_USER, name: "Nvidia", symbol: "NVDA", assetType: "stock_us", quantity: 22, avgBuyPrice: 145, currentPrice: 157, currency: "USD", platform: "Stockbit", notes: "Concentrated 32% of US stocks — consider trim", isActive: true, createdAt: "2025-01-20T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-spy", userId: DEMO_USER, name: "S&P 500 ETF", symbol: "SPY", assetType: "stock_us", quantity: 3, avgBuyPrice: 510, currentPrice: 496, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2024-09-15T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-tsla", userId: DEMO_USER, name: "Tesla", symbol: "TSLA", assetType: "stock_us", quantity: 1, avgBuyPrice: 280, currentPrice: 249, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2025-02-15T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-vhd", userId: DEMO_USER, name: "Vanguard High Div ETF", symbol: "VYM", assetType: "stock_us", quantity: 8, avgBuyPrice: 165, currentPrice: 159, currency: "USD", platform: "Stockbit", isActive: true, createdAt: "2024-12-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Stocks IDX (small)
  { id: "pa-adro", userId: DEMO_USER, name: "Adaro Energy", symbol: "ADRO", assetType: "stock_idx", quantity: 200, avgBuyPrice: 3500, currentPrice: 3450, currency: "IDR", platform: "Stockbit", isActive: true, createdAt: "2025-03-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-asii", userId: DEMO_USER, name: "Astra International", symbol: "ASII", assetType: "stock_idx", quantity: 200, avgBuyPrice: 9600, currentPrice: 9600, currency: "IDR", platform: "Stockbit", isActive: true, createdAt: "2025-03-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-indf", userId: DEMO_USER, name: "Indofood", symbol: "INDF", assetType: "stock_idx", quantity: 100, avgBuyPrice: 27000, currentPrice: 27000, currency: "IDR", platform: "Stockbit", isActive: true, createdAt: "2025-03-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Gold
  { id: "pa-gold", userId: DEMO_USER, name: "Antam 24K", symbol: "ANTM", assetType: "gold", quantity: 25, avgBuyPrice: 1100000, currentPrice: 2733000, currency: "IDR", platform: "Logam Mulia", isActive: true, createdAt: "2023-06-15T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Liquid
  { id: "pa-cash-bca", userId: DEMO_USER, name: "Tabungan BCA", symbol: "BCA", assetType: "cash", quantity: 80000000, avgBuyPrice: 1, currentPrice: 1, currency: "IDR", platform: "BCA", notes: "Operasional + emergency", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-cash-mandiri", userId: DEMO_USER, name: "Tabungan Mandiri", symbol: "MANDIRI", assetType: "cash", quantity: 35380181, avgBuyPrice: 1, currentPrice: 1, currency: "IDR", platform: "Mandiri", isActive: true, createdAt: "2024-01-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-rdpu-sucor", userId: DEMO_USER, name: "Sucorinvest Money Market", symbol: "SUCRMMF", assetType: "rpu", quantity: 21844648, avgBuyPrice: 1, currentPrice: 1.045, currency: "IDR", platform: "Bibit", notes: "Yield ~4.5% p.a.", isActive: true, createdAt: "2024-06-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-rdpu-sucor-sharia", userId: DEMO_USER, name: "Sucorinvest Sharia MM", symbol: "SUCRSYR", assetType: "rpu", quantity: 17841856, avgBuyPrice: 1, currentPrice: 1.038, currency: "IDR", platform: "Bibit", isActive: true, createdAt: "2024-06-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  // Bonds
  { id: "pa-bond-manulife", userId: DEMO_USER, name: "Manulife ORI II", symbol: "MANORI2", assetType: "bond", quantity: 20482486, avgBuyPrice: 1, currentPrice: 1.054, currency: "IDR", platform: "Bibit", notes: "Hold to maturity", isActive: true, createdAt: "2025-02-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
  { id: "pa-bond-majoris", userId: DEMO_USER, name: "Majoris Sukuk Negara", symbol: "MAJSUK", assetType: "bond", quantity: 14211685, avgBuyPrice: 1, currentPrice: 1.058, currency: "IDR", platform: "Bibit", isActive: true, createdAt: "2025-02-01T00:00:00Z", updatedAt: "2026-06-18T00:00:00Z" },
];

export const assetTransactionsSeed: AssetTransactionRecord[] = [
  { id: "tx-1", userId: DEMO_USER, assetId: "pa-btc", type: "buy", quantity: 0.1, pricePerUnit: 60000, totalAmount: 6000, fees: 5, currency: "USD", transactionDate: "2024-09-15T00:00:00Z", createdAt: "2024-09-15T00:00:00Z" },
  { id: "tx-2", userId: DEMO_USER, assetId: "pa-btc", type: "buy", quantity: 0.2, pricePerUnit: 95000, totalAmount: 19000, fees: 8, currency: "USD", transactionDate: "2025-01-10T00:00:00Z", createdAt: "2025-01-10T00:00:00Z" },
  { id: "tx-3", userId: DEMO_USER, assetId: "pa-btc", type: "buy", quantity: 0.25, pricePerUnit: 108000, totalAmount: 27000, fees: 10, currency: "USD", transactionDate: "2025-08-20T00:00:00Z", createdAt: "2025-08-20T00:00:00Z" },
  { id: "tx-4", userId: DEMO_USER, assetId: "pa-eth", type: "buy", quantity: 2.5, pricePerUnit: 3800, totalAmount: 9500, fees: 6, currency: "USD", transactionDate: "2024-10-01T00:00:00Z", createdAt: "2024-10-01T00:00:00Z" },
  { id: "tx-5", userId: DEMO_USER, assetId: "pa-nvda", type: "buy", quantity: 22, pricePerUnit: 145, totalAmount: 3190, fees: 3, currency: "USD", transactionDate: "2025-01-20T00:00:00Z", createdAt: "2025-01-20T00:00:00Z" },
];

export const cashFlowEntriesSeed: CashFlowEntry[] = [
  { id: "cf-1", userId: DEMO_USER, entryType: "income", categoryId: "cat-gaji", amount: 15500000, currency: "IDR", paymentMethod: "transfer", description: "Gaji Pokok Juni 2026", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-01T00:00:00Z" },
  { id: "cf-2", userId: DEMO_USER, entryType: "expense", categoryId: "cat-makan", amount: 1260000, currency: "IDR", paymentMethod: "transfer", description: "Catering keluarga", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-05T00:00:00Z" },
  { id: "cf-3", userId: DEMO_USER, entryType: "expense", categoryId: "cat-makan", amount: 3194222, currency: "IDR", paymentMethod: "transfer", description: "Groceries mingguan", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-08T00:00:00Z" },
  { id: "cf-4", userId: DEMO_USER, entryType: "expense", categoryId: "cat-makan", amount: 800000, currency: "IDR", paymentMethod: "cash", description: "Makan weekend", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-09T00:00:00Z" },
  { id: "cf-5", userId: DEMO_USER, entryType: "expense", categoryId: "cat-utility", amount: 1000000, currency: "IDR", paymentMethod: "auto-debit", description: "Listrik PLN", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-10T00:00:00Z" },
  { id: "cf-6", userId: DEMO_USER, entryType: "expense", categoryId: "cat-utility", amount: 486350, currency: "IDR", paymentMethod: "auto-debit", description: "Internet IndiHome", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-12T00:00:00Z" },
  { id: "cf-7", userId: DEMO_USER, entryType: "expense", categoryId: "cat-transport", amount: 500000, currency: "IDR", paymentMethod: "cash", description: "Bensin mobil", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-08T00:00:00Z" },
  { id: "cf-8", userId: DEMO_USER, entryType: "expense", categoryId: "cat-transport", amount: 250000, currency: "IDR", paymentMethod: "cash", description: "Bensin motor", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-08T00:00:00Z" },
  { id: "cf-9", userId: DEMO_USER, entryType: "expense", categoryId: "cat-zakat", amount: 400000, currency: "IDR", paymentMethod: "transfer", description: "Zakat penghasilan", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-01T00:00:00Z" },
  { id: "cf-10", userId: DEMO_USER, entryType: "expense", categoryId: "cat-hiburan", amount: 309000, currency: "IDR", paymentMethod: "card", description: "Langganan AI tools", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-01T00:00:00Z" },
  { id: "cf-11", userId: DEMO_USER, entryType: "expense", categoryId: "cat-tabungan", amount: 8400000, currency: "IDR", paymentMethod: "auto-debit", description: "DCA + Tabungan motor listrik", isRecurring: true, recurringFrequency: "monthly", transactionDate: "2026-06-01T00:00:00Z" },
  { id: "cf-12", userId: DEMO_USER, entryType: "expense", categoryId: "cat-renovasi", amount: 35000000, currency: "IDR", paymentMethod: "transfer", description: "Renovasi taman besar", isRecurring: false, transactionDate: "2026-03-17T00:00:00Z" },
];

export const financialGoalsSeed: FinancialGoal[] = [
  { id: "goal-hajj", userId: DEMO_USER, name: "Haji Regular 2 Orang", type: "hajj", targetAmount: 80000000, currentAmount: 0, currency: "IDR", deadline: "2028-12-31T00:00:00Z", priority: "high", status: "active", description: "Setoran 2 x 35jt + tiket & living cost", icon: "kaaba", color: "#10b981" },
  { id: "goal-tk", userId: DEMO_USER, name: "Dana Pendidikan TK", type: "education", targetAmount: 60000000, currentAmount: 0, currency: "IDR", deadline: "2029-06-30T00:00:00Z", priority: "high", status: "active", description: "Anak masuk TK A 2029, inflation adjusted", icon: "book", color: "#3b82f6" },
  { id: "goal-motor", userId: DEMO_USER, name: "Motor Listrik", type: "ev", targetAmount: 25000000, currentAmount: 0, currency: "IDR", deadline: "2026-12-31T00:00:00Z", priority: "medium", status: "active", description: "Alva N3 atau Polytron Fox 350", icon: "bike", color: "#f59e0b" },
  { id: "goal-mobil", userId: DEMO_USER, name: "Mobil Listrik", type: "ev", targetAmount: 350000000, currentAmount: 0, currency: "IDR", deadline: "2028-06-30T00:00:00Z", priority: "medium", status: "active", description: "BYD Atto 1 atau Jaecoo J5", icon: "car", color: "#ef4444" },
  { id: "goal-emergency", userId: DEMO_USER, name: "Emergency Fund", type: "emergency", targetAmount: 70000000, currentAmount: 0, currency: "IDR", deadline: "2027-12-31T00:00:00Z", priority: "critical", status: "active", description: "3-6 bulan expense di RDPU", icon: "shield", color: "#06b6d4" },
];

export const goalAllocationsSeed: GoalAllocation[] = [];

export const insurancePoliciesSeed: InsurancePolicy[] = [
  { id: "ins-bpjs", userId: DEMO_USER, policyType: "health", provider: "BPJS Kesehatan", policyNumber: "0001-2345-6789", coverageAmount: 0, currency: "IDR", premiumAmount: 150000, premiumFrequency: "monthly", startDate: "2024-01-01T00:00:00Z", expiryDate: null, isActive: true, beneficiary: "Keluarga" },
];

export const netWorthSnapshotsSeed: NetWorthSnapshot[] = [
  { id: "nw-2025-12", userId: DEMO_USER, snapshotDate: "2025-12-31T00:00:00Z", totalAssets: 920000000, totalLiabilities: 0, netWorth: 920000000, breakdownJson: { crypto: 480000000, stock_us: 175000000, stock_idx: 5000000, gold: 60000000, liquid: 200000000 }, currency: "IDR" },
  { id: "nw-2026-06", userId: DEMO_USER, snapshotDate: "2026-06-18T00:00:00Z", totalAssets: 857015707, totalLiabilities: 0, netWorth: 857015707, breakdownJson: { crypto: 424054094, stock_us: 174035757, stock_idx: 5310000, gold: 69165000, liquid: 189760856 }, currency: "IDR" },
];

export const rebalancingRulesSeed: RebalancingRule[] = [
  { id: "rb-cash", userId: DEMO_USER, assetType: "cash", targetPct: 8.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-rpu", userId: DEMO_USER, assetType: "rpu", targetPct: 5.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-bond", userId: DEMO_USER, assetType: "bond", targetPct: 5.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-stock-idx", userId: DEMO_USER, assetType: "stock_idx", targetPct: 5.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-stock-us", userId: DEMO_USER, assetType: "stock_us", targetPct: 15.0, thresholdPct: 5.0, isActive: true },
  { id: "rb-gold", userId: DEMO_USER, assetType: "gold", targetPct: 10.0, thresholdPct: 3.0, isActive: true },
  { id: "rb-crypto", userId: DEMO_USER, assetType: "crypto", targetPct: 20.0, thresholdPct: 5.0, isActive: true },
];
