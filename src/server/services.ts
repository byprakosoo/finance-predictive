import { mockStore } from "@/server/mock-store";
import type { Chain } from "@/lib/types";

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
