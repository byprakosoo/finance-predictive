import { mockStore } from "@/server/mock-store";
import type { Chain } from "@/lib/types";

// Estimated USD/IDR for live value normalization. Will be replaced by FX service.
const USD_IDR = 17711.83;

function toIdr(value: number, currency: "IDR" | "USD"): number {
  return currency === "USD" ? value * USD_IDR : value;
}

export const portfolioService = {
  getPortfolio: () => mockStore.portfolio(),
  createHolding: mockStore.addHolding,
  updateHolding: mockStore.updateHolding,
  deleteHolding: mockStore.deleteHolding,
  getSignals: () => mockStore.signals(),
};

export const marketService = {
  refresh: () => mockStore.marketRefresh(),
};

export const macroService = {
  refresh: () => mockStore.macroRefresh(),
};

export const alphaService = {
  getCandidates: () => mockStore.alphaHunter(),
};

export const briefService = {
  getTodayBrief: () => mockStore.morningBrief(),
};

export const watchlistService = {
  list: () => mockStore.watchlist(),
  create: mockStore.addWatchlistItem,
  delete: mockStore.deleteWatchlistItem,
};

export const intelligenceService = {
  chains: () => mockStore.chains(),
  wallets: (chain?: Chain) => mockStore.wallets(chain),
  wallet: (chain: Chain, address: string) => mockStore.wallet(chain, address),
  entities: () => mockStore.entities(),
  entity: (entityId: string) => mockStore.entity(entityId),
  assetFlows: (chain: Chain, asset: string) => mockStore.assetFlows(chain, asset),
  bitcoinUtxos: (address: string) => mockStore.bitcoinUtxos(address),
  watchRules: () => mockStore.watchRules(),
  createWatchRule: mockStore.addWatchRule,
  alerts: () => mockStore.alerts(),
};

// ============================================================================
// PERSONAL FINANCE SERVICES
// ============================================================================

export const personalAssetService = {
  list: (userId: string, filters?: { assetType?: string; platform?: string; isActive?: boolean }) =>
    mockStore.listAssets(userId, filters),
  get: (userId: string, assetId: string) => mockStore.getAsset(userId, assetId),
  create: (userId: string, input: Parameters<typeof mockStore.addAsset>[0]) =>
    mockStore.addAsset({ ...input, userId }),
  update: (userId: string, assetId: string, input: Parameters<typeof mockStore.updateAsset>[2]) =>
    mockStore.updateAsset(userId, assetId, input),
  delete: (userId: string, assetId: string) => mockStore.deleteAsset(userId, assetId),

  /** Total portfolio value normalized to IDR, plus per-asset breakdown. */
  summary(userId: string) {
    const assets = mockStore.listAssets(userId, { isActive: true });
    const breakdown: Record<string, { count: number; valueIdr: number; pct: number }> = {};
    let totalIdr = 0;
    for (const asset of assets) {
      const valueIdr = toIdr(asset.quantity * (asset.currentPrice ?? asset.avgBuyPrice ?? 0), asset.currency);
      totalIdr += valueIdr;
      if (!breakdown[asset.assetType]) {
        breakdown[asset.assetType] = { count: 0, valueIdr: 0, pct: 0 };
      }
      breakdown[asset.assetType].count += 1;
      breakdown[asset.assetType].valueIdr += valueIdr;
    }
    for (const key of Object.keys(breakdown)) {
      breakdown[key].pct = totalIdr === 0 ? 0 : (breakdown[key].valueIdr / totalIdr) * 100;
    }
    return { totalIdr, breakdown, assetCount: assets.length };
  },
};

export const assetTransactionService = {
  list: (
    userId: string,
    filters?: { assetId?: string; type?: string; from?: string; to?: string; limit?: number; offset?: number }
  ) => mockStore.listTransactions(userId, filters),
  create: (userId: string, input: Parameters<typeof mockStore.addTransaction>[0]) =>
    mockStore.addTransaction({ ...input, userId }),
  delete: (userId: string, txId: string) => mockStore.deleteTransaction(userId, txId),
};

export const cashFlowService = {
  list: (
    userId: string,
    filters?: { entryType?: "income" | "expense"; categoryId?: string; from?: string; to?: string; isRecurring?: boolean; limit?: number; offset?: number }
  ) => mockStore.listCashFlow(userId, filters),
  create: (userId: string, input: Parameters<typeof mockStore.addCashFlow>[0]) =>
    mockStore.addCashFlow({ ...input, userId }),
  update: (userId: string, entryId: string, input: Parameters<typeof mockStore.updateCashFlow>[2]) =>
    mockStore.updateCashFlow(userId, entryId, input),
  delete: (userId: string, entryId: string) => mockStore.deleteCashFlow(userId, entryId),

  summary(userId: string, filters?: { from?: string; to?: string }) {
    const entries = mockStore.listCashFlow(userId, { ...filters, limit: 10000 });
    const categories = mockStore.listCategories(userId);
    const catMap = new Map(categories.map((c) => [c.id, c.name]));

    let totalIncome = 0;
    let totalExpense = 0;
    const byCategory: Record<string, { name: string; amount: number }> = {};
    for (const e of entries) {
      if (e.entryType === "income") {
        totalIncome += e.amount;
      } else {
        totalExpense += e.amount;
        const key = e.categoryId ?? "uncategorized";
        const name = e.categoryId ? (catMap.get(e.categoryId) ?? "Unknown") : "Uncategorized";
        if (!byCategory[key]) byCategory[key] = { name, amount: 0 };
        byCategory[key].amount += e.amount;
      }
    }
    const topCategories = Object.values(byCategory)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map((c) => ({
        categoryId: Object.keys(byCategory).find((k) => byCategory[k] === c) ?? null,
        name: c.name,
        amount: c.amount,
        pctOfExpense: totalExpense === 0 ? 0 : (c.amount / totalExpense) * 100,
      }));
    return {
      totalIncome,
      totalExpense,
      netCashFlow: totalIncome - totalExpense,
      savingsRate: totalIncome === 0 ? 0 : ((totalIncome - totalExpense) / totalIncome) * 100,
      topCategories,
    };
  },
};

export const categoryService = {
  list: (userId: string) => mockStore.listCategories(userId),
  create: (userId: string, input: Parameters<typeof mockStore.addCategory>[0]) =>
    mockStore.addCategory({ ...input, userId }),
  update: (userId: string, categoryId: string, input: Parameters<typeof mockStore.updateCategory>[2]) =>
    mockStore.updateCategory(userId, categoryId, input),
  delete: (userId: string, categoryId: string) => mockStore.deleteCategory(userId, categoryId),
};

export const goalService = {
  list: (userId: string, filters?: { type?: string; status?: string; priority?: string }) =>
    mockStore.listGoals(userId, filters),
  get: (userId: string, goalId: string) => {
    const goal = mockStore.getGoal(userId, goalId);
    if (!goal) return null;
    const allocations = mockStore.listAllocations(goalId);
    const currentAmount = allocations.reduce((sum, a) => sum + a.allocatedAmount, goal.currentAmount);
    const progressPct = goal.targetAmount === 0 ? 0 : (currentAmount / goal.targetAmount) * 100;
    const daysToDeadline = goal.deadline
      ? Math.max(0, Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
      : null;
    const monthlyNeeded =
      daysToDeadline && daysToDeadline > 0
        ? Math.max(0, (goal.targetAmount - currentAmount) / (daysToDeadline / 30))
        : null;
    return { ...goal, currentAmount, progressPct, daysToDeadline, monthlyNeeded, allocations };
  },
  create: (userId: string, input: Parameters<typeof mockStore.addGoal>[0]) =>
    mockStore.addGoal({ ...input, userId }),
  update: (userId: string, goalId: string, input: Parameters<typeof mockStore.updateGoal>[2]) =>
    mockStore.updateGoal(userId, goalId, input),
  delete: (userId: string, goalId: string) => mockStore.deleteGoal(userId, goalId),

  allocate: (userId: string, goalId: string, input: Parameters<typeof mockStore.addAllocation>[0]) => {
    if (!mockStore.getGoal(userId, goalId)) return null;
    return mockStore.addAllocation({ ...input, goalId });
  },
  deallocate: (allocationId: string) => mockStore.deleteAllocation(allocationId),
};

export const insuranceService = {
  list: (userId: string) => mockStore.listInsurance(userId),
  create: (userId: string, input: Parameters<typeof mockStore.addInsurance>[0]) =>
    mockStore.addInsurance({ ...input, userId }),
  update: (userId: string, policyId: string, input: Parameters<typeof mockStore.updateInsurance>[2]) =>
    mockStore.updateInsurance(userId, policyId, input),
  delete: (userId: string, policyId: string) => mockStore.deleteInsurance(userId, policyId),

  coverageSummary(userId: string) {
    const policies = mockStore.listInsurance(userId);
    const totalCoverage: Record<string, number> = {};
    let monthlyPremium = 0;
    for (const p of policies) {
      totalCoverage[p.policyType] = (totalCoverage[p.policyType] ?? 0) + p.coverageAmount;
      const freqMultiplier: Record<string, number> = {
        monthly: 1,
        quarterly: 1 / 3,
        semi_annual: 1 / 6,
        annual: 1 / 12,
        one_time: 0,
      };
      monthlyPremium += p.premiumAmount * (freqMultiplier[p.premiumFrequency] ?? 0);
    }
    const gaps: Array<{ type: string; recommendation: string; priority: string }> = [];
    if ((totalCoverage.life ?? 0) === 0) {
      gaps.push({
        type: "life",
        recommendation: "Apply term life 1-2M coverage, ~500rb/month. Single income earner with infant = critical gap.",
        priority: "critical",
      });
    }
    if ((totalCoverage.health ?? 0) === 0) {
      gaps.push({
        type: "health",
        recommendation: "Add health cash plan supplement BPJS, 300-500rb/month. Provides cashless network access.",
        priority: "high",
      });
    }
    if ((totalCoverage["critical_illness"] ?? 0) === 0) {
      gaps.push({
        type: "critical_illness",
        recommendation: "Consider critical illness cover 500jt-1M, 200-300rb/month. Protects against cancer/stroke income loss.",
        priority: "medium",
      });
    }
    return { totalCoverage, monthlyPremium, upcomingPremiums: [], gaps };
  },
};

export const netWorthService = {
  list: (userId: string, limit?: number) => mockStore.listNetWorthSnapshots(userId, limit),
  latest(userId: string) {
    const snapshots = mockStore.listNetWorthSnapshots(userId, 1);
    return snapshots[0] ?? null;
  },
  create: (userId: string, input: Parameters<typeof mockStore.addNetWorthSnapshot>[0]) =>
    mockStore.addNetWorthSnapshot({ ...input, userId }),

  /** Computes a fresh snapshot from current assets. Useful for cron jobs. */
  compute(userId: string) {
    const summary = personalAssetService.summary(userId);
    const breakdown: Record<string, number> = {};
    for (const [k, v] of Object.entries(summary.breakdown)) {
      breakdown[k] = v.valueIdr;
    }
    return mockStore.addNetWorthSnapshot({
      userId,
      snapshotDate: new Date().toISOString(),
      totalAssets: summary.totalIdr,
      totalLiabilities: 0,
      netWorth: summary.totalIdr,
      breakdownJson: breakdown,
      currency: "IDR",
    });
  },
};

export const rebalancingService = {
  listRules: (userId: string) => mockStore.listRebalancingRules(userId),
  createRule: (userId: string, input: Parameters<typeof mockStore.addRebalancingRule>[0]) =>
    mockStore.addRebalancingRule({ ...input, userId }),
  updateRule: (userId: string, ruleId: string, input: Parameters<typeof mockStore.updateRebalancingRule>[2]) =>
    mockStore.updateRebalancingRule(userId, ruleId, input),
  deleteRule: (userId: string, ruleId: string) => mockStore.deleteRebalancingRule(userId, ruleId),

  status(userId: string) {
    const summary = personalAssetService.summary(userId);
    const rules = mockStore.listRebalancingRules(userId);
    const targetAllocation: Record<string, number> = {};
    for (const r of rules) targetAllocation[r.assetType] = r.targetPct;

    const currentAllocation: Record<string, number> = {};
    for (const [k, v] of Object.entries(summary.breakdown)) {
      currentAllocation[k] = v.pct;
    }

    const deviations = rules.map((r) => {
      const current = currentAllocation[r.assetType] ?? 0;
      const dev = current - r.targetPct;
      let action: "trim" | "add" | "hold" = "hold";
      if (dev > r.thresholdPct) action = "trim";
      else if (dev < -r.thresholdPct) action = "add";
      return { assetType: r.assetType, current, target: r.targetPct, deviation: dev, action };
    });

    const alerts = deviations
      .filter((d) => Math.abs(d.deviation) > 5)
      .map((d) => {
        const severity = Math.abs(d.deviation) > 15 ? "high" : Math.abs(d.deviation) > 8 ? "medium" : "low";
        const direction = d.deviation > 0 ? "exceeds" : "below";
        const idrDelta = (summary.totalIdr * Math.abs(d.deviation)) / 100;
        return {
          assetType: d.assetType,
          severity: severity as "low" | "medium" | "high",
          message: `${d.assetType.toUpperCase()} allocation ${currentAllocation[d.assetType]?.toFixed(1)}% ${direction} target ${d.targetPct}% by ${Math.abs(d.deviation).toFixed(1)}pp (~Rp ${Math.round(idrDelta).toLocaleString("id-ID")}). Consider ${d.action}.`,
        };
      });

    return {
      totalValueIdr: summary.totalIdr,
      currentAllocation,
      targetAllocation,
      deviations,
      alerts,
    };
  },
};

export const personalDashboardService = {
  async snapshot(userId: string) {
    const netWorth = netWorthService.latest(userId);
    const cashFlow = cashFlowService.summary(userId, {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
    const goals = mockStore.listGoals(userId, { status: "active" });
    const goalsWithProgress = goals.map((g) => goalService.get(userId, g.id));
    const rebalancing = rebalancingService.status(userId);
    const insurance = insuranceService.coverageSummary(userId);
    return { netWorth, cashFlow, goals: goalsWithProgress, rebalancing, insurance };
  },
};
