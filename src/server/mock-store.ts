import {
  alphaCandidates,
  entityClusters,
  expenseCategoriesSeed,
  financialGoalsSeed,
  holdings,
  insurancePoliciesSeed,
  netWorthSnapshotsSeed,
  personalAssetsSeed,
  rebalancingRulesSeed,
  assetTransactionsSeed,
  cashFlowEntriesSeed,
  goalAllocationsSeed,
  intelligenceAlerts,
  macroIndicators,
  morningBrief,
  portfolioSignals,
  portfolioSummary,
  walletIntelligence,
  watchlist,
  watchRules,
} from "@/lib/mock-data";
import type {
  AssetTransactionRecord,
  CashFlowEntry,
  ExpenseCategory,
  FinancialGoal,
  GoalAllocation,
  Holding,
  InsurancePolicy,
  NetWorthSnapshot,
  PersonalAsset,
  RebalancingRule,
  WatchlistItem,
  WatchRule,
} from "@/lib/types";

const state = {
  holdings: [...holdings],
  watchlist: [...watchlist],
  watchRules: [...watchRules],
  personalAssets: [...personalAssetsSeed],
  assetTransactions: [...assetTransactionsSeed],
  expenseCategories: [...expenseCategoriesSeed],
  cashFlowEntries: [...cashFlowEntriesSeed],
  financialGoals: [...financialGoalsSeed],
  goalAllocations: [...goalAllocationsSeed],
  insurancePolicies: [...insurancePoliciesSeed],
  netWorthSnapshots: [...netWorthSnapshotsSeed],
  rebalancingRules: [...rebalancingRulesSeed],
};

function id(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const mockStore = {
  portfolio() {
    return {
      summary: portfolioSummary,
      holdings: state.holdings,
      signals: portfolioSignals,
    };
  },

  addHolding(input: Omit<Holding, "id" | "currentPrice" | "change24h">) {
    const holding: Holding = {
      ...input,
      id: id("holding"),
      currentPrice: input.averageBuyPrice,
      change24h: 0,
    };
    state.holdings.unshift(holding);
    return holding;
  },

  updateHolding(holdingId: string, input: Partial<Omit<Holding, "id">>) {
    const index = state.holdings.findIndex((holding) => holding.id === holdingId);
    if (index === -1) {
      return null;
    }

    state.holdings[index] = { ...state.holdings[index], ...input };
    return state.holdings[index];
  },

  deleteHolding(holdingId: string) {
    const before = state.holdings.length;
    state.holdings = state.holdings.filter((holding) => holding.id !== holdingId);
    return state.holdings.length !== before;
  },

  marketRefresh() {
    return {
      refreshedAt: new Date().toISOString(),
      ttlMinutes: 15,
      assets: state.holdings.map((holding) => ({
        assetId: holding.assetId,
        symbol: holding.symbol,
        priceUsd: holding.currentPrice,
        priceChange24h: holding.change24h,
      })),
    };
  },

  macroRefresh() {
    return {
      refreshedAt: new Date().toISOString(),
      ttlHours: 24,
      status: portfolioSummary.macroStatus,
      indicators: macroIndicators,
    };
  },

  signals() {
    return portfolioSignals;
  },

  alphaHunter() {
    return alphaCandidates;
  },

  morningBrief() {
    return morningBrief;
  },

  watchlist() {
    return state.watchlist;
  },

  addWatchlistItem(input: Omit<WatchlistItem, "id">) {
    const item: WatchlistItem = { ...input, id: id("watch") };
    state.watchlist.unshift(item);
    return item;
  },

  deleteWatchlistItem(itemId: string) {
    const before = state.watchlist.length;
    state.watchlist = state.watchlist.filter((item) => item.id !== itemId);
    return state.watchlist.length !== before;
  },

  chains() {
    return [
      { id: "BITCOIN", name: "Bitcoin", indexingMode: "UTXO", node: "self-hosted Bitcoin Core" },
      { id: "SOLANA", name: "Solana", indexingMode: "ACCOUNT_PROGRAM", node: "self-hosted Solana RPC/indexer" },
    ];
  },

  wallets(chain?: string) {
    return chain ? walletIntelligence.filter((wallet) => wallet.chain === chain) : walletIntelligence;
  },

  wallet(chain: string, address: string) {
    return walletIntelligence.find((wallet) => wallet.chain === chain && wallet.address === address) ?? null;
  },

  entities() {
    return entityClusters;
  },

  entity(entityId: string) {
    return entityClusters.find((entity) => entity.id === entityId) ?? null;
  },

  assetFlows(chain: string, asset: string) {
    const flows = walletIntelligence
      .filter((wallet) => wallet.chain === chain)
      .flatMap((wallet) => wallet.events)
      .filter((event) => event.asset.toLowerCase() === asset.toLowerCase());

    return {
      chain,
      asset: asset.toUpperCase(),
      netFlowUsd: flows.reduce((sum, event) => sum + (event.type === "OUTFLOW" || event.type === "UTXO_SPEND" ? -event.valueUsd : event.valueUsd), 0),
      events: flows,
    };
  },

  bitcoinUtxos(address: string) {
    const wallet = walletIntelligence.find((item) => item.chain === "BITCOIN" && item.address === address);
    return wallet?.bitcoinUtxos ?? null;
  },

  watchRules() {
    return state.watchRules;
  },

  addWatchRule(input: Omit<WatchRule, "id" | "status">) {
    const rule: WatchRule = { ...input, id: id("rule"), status: "ACTIVE" };
    state.watchRules.unshift(rule);
    return rule;
  },

  alerts() {
    return intelligenceAlerts;
  },

  // ==========================================================================
  // PERSONAL FINANCE — ASSETS
  // ==========================================================================

  listAssets(userId: string, filters?: { assetType?: string; platform?: string; isActive?: boolean }) {
    let result = state.personalAssets.filter((asset) => asset.userId === userId);
    if (filters?.assetType) {
      result = result.filter((asset) => asset.assetType === filters.assetType);
    }
    if (filters?.platform) {
      result = result.filter((asset) => asset.platform === filters.platform);
    }
    if (filters?.isActive !== undefined) {
      result = result.filter((asset) => asset.isActive === filters.isActive);
    }
    return result;
  },

  getAsset(userId: string, assetId: string) {
    return state.personalAssets.find((asset) => asset.userId === userId && asset.id === assetId) ?? null;
  },

  addAsset(input: Omit<PersonalAsset, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString();
    const asset: PersonalAsset = {
      ...input,
      id: id("asset"),
      createdAt: now,
      updatedAt: now,
    };
    state.personalAssets.unshift(asset);
    return asset;
  },

  updateAsset(userId: string, assetId: string, input: Partial<Omit<PersonalAsset, "id" | "userId">>) {
    const index = state.personalAssets.findIndex((asset) => asset.userId === userId && asset.id === assetId);
    if (index === -1) return null;
    state.personalAssets[index] = {
      ...state.personalAssets[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    return state.personalAssets[index];
  },

  deleteAsset(userId: string, assetId: string) {
    const before = state.personalAssets.length;
    state.personalAssets = state.personalAssets.filter(
      (asset) => !(asset.userId === userId && asset.id === assetId)
    );
    return state.personalAssets.length !== before;
  },

  // ==========================================================================
  // PERSONAL FINANCE — TRANSACTIONS
  // ==========================================================================

  listTransactions(userId: string, filters?: { assetId?: string; type?: string; from?: string; to?: string; limit?: number; offset?: number }) {
    let result = state.assetTransactions.filter((tx) => tx.userId === userId);
    if (filters?.assetId) result = result.filter((tx) => tx.assetId === filters.assetId);
    if (filters?.type) result = result.filter((tx) => tx.type === filters.type);
    if (filters?.from) {
      const fromDate = new Date(filters.from).getTime();
      result = result.filter((tx) => new Date(tx.transactionDate).getTime() >= fromDate);
    }
    if (filters?.to) {
      const toDate = new Date(filters.to).getTime();
      result = result.filter((tx) => new Date(tx.transactionDate).getTime() <= toDate);
    }
    result.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
    const offset = filters?.offset ?? 0;
    const limit = filters?.limit ?? 50;
    return result.slice(offset, offset + limit);
  },

  addTransaction(input: Omit<AssetTransactionRecord, "id" | "createdAt">) {
    const tx: AssetTransactionRecord = {
      ...input,
      id: id("tx"),
      createdAt: new Date().toISOString(),
    };
    state.assetTransactions.unshift(tx);
    return tx;
  },

  deleteTransaction(userId: string, txId: string) {
    const before = state.assetTransactions.length;
    state.assetTransactions = state.assetTransactions.filter(
      (tx) => !(tx.userId === userId && tx.id === txId)
    );
    return state.assetTransactions.length !== before;
  },

  // ==========================================================================
  // PERSONAL FINANCE — CASH FLOW
  // ==========================================================================

  listCashFlow(userId: string, filters?: { entryType?: "income" | "expense"; categoryId?: string; from?: string; to?: string; isRecurring?: boolean; limit?: number; offset?: number }) {
    let result = state.cashFlowEntries.filter((entry) => entry.userId === userId);
    if (filters?.entryType) result = result.filter((entry) => entry.entryType === filters.entryType);
    if (filters?.categoryId) result = result.filter((entry) => entry.categoryId === filters.categoryId);
    if (filters?.isRecurring !== undefined) result = result.filter((entry) => entry.isRecurring === filters.isRecurring);
    if (filters?.from) {
      const fromDate = new Date(filters.from).getTime();
      result = result.filter((entry) => new Date(entry.transactionDate).getTime() >= fromDate);
    }
    if (filters?.to) {
      const toDate = new Date(filters.to).getTime();
      result = result.filter((entry) => new Date(entry.transactionDate).getTime() <= toDate);
    }
    result.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
    const offset = filters?.offset ?? 0;
    const limit = filters?.limit ?? 100;
    return result.slice(offset, offset + limit);
  },

  addCashFlow(input: Omit<CashFlowEntry, "id">) {
    const entry: CashFlowEntry = { ...input, id: id("cf") };
    state.cashFlowEntries.unshift(entry);
    return entry;
  },

  updateCashFlow(userId: string, entryId: string, input: Partial<Omit<CashFlowEntry, "id" | "userId">>) {
    const index = state.cashFlowEntries.findIndex((entry) => entry.userId === userId && entry.id === entryId);
    if (index === -1) return null;
    state.cashFlowEntries[index] = { ...state.cashFlowEntries[index], ...input };
    return state.cashFlowEntries[index];
  },

  deleteCashFlow(userId: string, entryId: string) {
    const before = state.cashFlowEntries.length;
    state.cashFlowEntries = state.cashFlowEntries.filter(
      (entry) => !(entry.userId === userId && entry.id === entryId)
    );
    return state.cashFlowEntries.length !== before;
  },

  // ==========================================================================
  // PERSONAL FINANCE — EXPENSE CATEGORIES
  // ==========================================================================

  listCategories(userId: string) {
    return state.expenseCategories.filter((cat) => cat.userId === userId);
  },

  addCategory(input: Omit<ExpenseCategory, "id">) {
    const category: ExpenseCategory = { ...input, id: id("cat") };
    state.expenseCategories.push(category);
    return category;
  },

  updateCategory(userId: string, categoryId: string, input: Partial<Omit<ExpenseCategory, "id" | "userId">>) {
    const index = state.expenseCategories.findIndex((cat) => cat.userId === userId && cat.id === categoryId);
    if (index === -1) return null;
    state.expenseCategories[index] = { ...state.expenseCategories[index], ...input };
    return state.expenseCategories[index];
  },

  deleteCategory(userId: string, categoryId: string) {
    const before = state.expenseCategories.length;
    state.expenseCategories = state.expenseCategories.filter(
      (cat) => !(cat.userId === userId && cat.id === categoryId)
    );
    return state.expenseCategories.length !== before;
  },

  // ==========================================================================
  // PERSONAL FINANCE — GOALS
  // ==========================================================================

  listGoals(userId: string, filters?: { type?: string; status?: string; priority?: string }) {
    let result = state.financialGoals.filter((g) => g.userId === userId);
    if (filters?.type) result = result.filter((g) => g.type === filters.type);
    if (filters?.status) result = result.filter((g) => g.status === filters.status);
    if (filters?.priority) result = result.filter((g) => g.priority === filters.priority);
    return result;
  },

  getGoal(userId: string, goalId: string) {
    return state.financialGoals.find((g) => g.userId === userId && g.id === goalId) ?? null;
  },

  addGoal(input: Omit<FinancialGoal, "id" | "currentAmount" | "completedAt"> & { currentAmount?: number }) {
    const goal: FinancialGoal = {
      ...input,
      currentAmount: input.currentAmount ?? 0,
      id: id("goal"),
      completedAt: null,
    };
    state.financialGoals.unshift(goal);
    return goal;
  },

  updateGoal(userId: string, goalId: string, input: Partial<Omit<FinancialGoal, "id" | "userId">>) {
    const index = state.financialGoals.findIndex((g) => g.userId === userId && g.id === goalId);
    if (index === -1) return null;
    state.financialGoals[index] = {
      ...state.financialGoals[index],
      ...input,
      completedAt: input.status === "completed" ? new Date().toISOString() : state.financialGoals[index].completedAt,
    };
    return state.financialGoals[index];
  },

  deleteGoal(userId: string, goalId: string) {
    const before = state.financialGoals.length;
    state.financialGoals = state.financialGoals.filter(
      (g) => !(g.userId === userId && g.id === goalId)
    );
    state.goalAllocations = state.goalAllocations.filter((alloc) => alloc.goalId !== goalId);
    return state.financialGoals.length !== before;
  },

  // ==========================================================================
  // PERSONAL FINANCE — GOAL ALLOCATIONS
  // ==========================================================================

  listAllocations(goalId: string) {
    return state.goalAllocations.filter((alloc) => alloc.goalId === goalId);
  },

  addAllocation(input: Omit<GoalAllocation, "id" | "allocationDate">) {
    // Upsert: replace if (goalId, assetId) already exists
    const existing = state.goalAllocations.findIndex(
      (a) => a.goalId === input.goalId && a.assetId === input.assetId
    );
    if (existing !== -1) {
      state.goalAllocations[existing] = {
        ...state.goalAllocations[existing],
        allocatedAmount: state.goalAllocations[existing].allocatedAmount + input.allocatedAmount,
      };
      return state.goalAllocations[existing];
    }
    const allocation: GoalAllocation = {
      ...input,
      id: id("alloc"),
      allocationDate: new Date().toISOString(),
    };
    state.goalAllocations.push(allocation);
    return allocation;
  },

  deleteAllocation(allocationId: string) {
    const before = state.goalAllocations.length;
    state.goalAllocations = state.goalAllocations.filter((a) => a.id !== allocationId);
    return state.goalAllocations.length !== before;
  },

  // ==========================================================================
  // PERSONAL FINANCE — INSURANCE
  // ==========================================================================

  listInsurance(userId: string) {
    return state.insurancePolicies.filter((p) => p.userId === userId);
  },

  addInsurance(input: Omit<InsurancePolicy, "id">) {
    const policy: InsurancePolicy = { ...input, id: id("ins") };
    state.insurancePolicies.push(policy);
    return policy;
  },

  updateInsurance(userId: string, policyId: string, input: Partial<Omit<InsurancePolicy, "id" | "userId">>) {
    const index = state.insurancePolicies.findIndex((p) => p.userId === userId && p.id === policyId);
    if (index === -1) return null;
    state.insurancePolicies[index] = { ...state.insurancePolicies[index], ...input };
    return state.insurancePolicies[index];
  },

  deleteInsurance(userId: string, policyId: string) {
    const before = state.insurancePolicies.length;
    state.insurancePolicies = state.insurancePolicies.filter(
      (p) => !(p.userId === userId && p.id === policyId)
    );
    return state.insurancePolicies.length !== before;
  },

  // ==========================================================================
  // PERSONAL FINANCE — NET WORTH SNAPSHOTS
  // ==========================================================================

  listNetWorthSnapshots(userId: string, limit = 24) {
    return state.netWorthSnapshots
      .filter((s) => s.userId === userId)
      .sort((a, b) => new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime())
      .slice(0, limit);
  },

  addNetWorthSnapshot(input: Omit<NetWorthSnapshot, "id">) {
    const snapshot: NetWorthSnapshot = { ...input, id: id("nw") };
    state.netWorthSnapshots.unshift(snapshot);
    return snapshot;
  },

  // ==========================================================================
  // PERSONAL FINANCE — REBALANCING RULES
  // ==========================================================================

  listRebalancingRules(userId: string) {
    return state.rebalancingRules.filter((r) => r.userId === userId);
  },

  addRebalancingRule(input: Omit<RebalancingRule, "id">) {
    const existing = state.rebalancingRules.findIndex(
      (r) => r.userId === input.userId && r.assetType === input.assetType
    );
    if (existing !== -1) {
      state.rebalancingRules[existing] = { ...state.rebalancingRules[existing], ...input };
      return state.rebalancingRules[existing];
    }
    const rule: RebalancingRule = { ...input, id: id("rb") };
    state.rebalancingRules.push(rule);
    return rule;
  },

  updateRebalancingRule(userId: string, ruleId: string, input: Partial<Omit<RebalancingRule, "id" | "userId">>) {
    const index = state.rebalancingRules.findIndex((r) => r.userId === userId && r.id === ruleId);
    if (index === -1) return null;
    state.rebalancingRules[index] = { ...state.rebalancingRules[index], ...input };
    return state.rebalancingRules[index];
  },

  deleteRebalancingRule(userId: string, ruleId: string) {
    const before = state.rebalancingRules.length;
    state.rebalancingRules = state.rebalancingRules.filter(
      (r) => !(r.userId === userId && r.id === ruleId)
    );
    return state.rebalancingRules.length !== before;
  },
};
