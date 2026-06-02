import {
  alphaCandidates,
  entityClusters,
  holdings,
  intelligenceAlerts,
  macroIndicators,
  morningBrief,
  portfolioSignals,
  portfolioSummary,
  walletIntelligence,
  watchlist,
  watchRules,
} from "@/lib/mock-data";
import type { Holding, WatchlistItem, WatchRule } from "@/lib/types";

const state = {
  holdings: [...holdings],
  watchlist: [...watchlist],
  watchRules: [...watchRules],
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
};
