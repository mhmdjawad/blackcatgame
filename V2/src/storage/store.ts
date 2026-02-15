import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import localforage from "localforage";

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface PlayerInfo {
  uid: string;
  name?: string;
  level?: number;
  stats?: Record<string, number>;
  upgrades?: Record<string, number | boolean>;
  meta?: Record<string, JsonValue>;
}

export interface UpgradeLogEntry {
  id: string;
  ts: number;
  type: string;
  meta?: Record<string, JsonValue>;
}

export interface PlayLogEntry {
  id: string;
  ts: number;
  event: string;
  meta?: Record<string, JsonValue>;
}

export interface PurchaseLogEntry {
  id: string;
  ts: number;
  sku: string;
  price?: number;
  currency?: string;
  meta?: Record<string, JsonValue>;
}

export interface GameplayState {
  scene?: string;
  board?: JsonValue;
  progress?: JsonValue;
  updatedAt: number;
}

export interface GameState {
  player: PlayerInfo;
  upgradeLog: UpgradeLogEntry[];
  playLog: PlayLogEntry[];
  purchaseLog: PurchaseLogEntry[];
  gameplay: GameplayState;
}

export const createUid = (): string => {
  const cryptoObj: Crypto | undefined = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (cryptoObj?.getRandomValues) {
    cryptoObj.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

const initialState: GameState = {
  player: { uid: "" },
  upgradeLog: [],
  playLog: [],
  purchaseLog: [],
  gameplay: { updatedAt: 0 },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerInfo(state: GameState, action: PayloadAction<Partial<PlayerInfo>>) {
      state.player = { ...state.player, ...action.payload };
    },
    addUpgradeLog(state: GameState, action: PayloadAction<UpgradeLogEntry>) {
      state.upgradeLog.unshift(action.payload);
    },
    addPlayLog(state: GameState, action: PayloadAction<PlayLogEntry>) {
      state.playLog.unshift(action.payload);
    },
    addPurchaseLog(state: GameState, action: PayloadAction<PurchaseLogEntry>) {
      state.purchaseLog.unshift(action.payload);
    },
    setGameplay(state: GameState, action: PayloadAction<Omit<GameplayState, "updatedAt">>) {
      state.gameplay = { ...action.payload, updatedAt: Date.now() };
    },
    clearAll(state: GameState) {
      state.player = { uid: "" };
      state.upgradeLog = [];
      state.playLog = [];
      state.purchaseLog = [];
      state.gameplay = { updatedAt: 0 };
    },
  },
});

const persistConfig = {
  key: "blackcatgame",
  version: 1,
  storage: localforage,
  whitelist: ["player", "upgradeLog", "playLog", "purchaseLog", "gameplay"],
};

const persistedReducer = persistReducer(persistConfig, gameSlice.reducer);

export const store = configureStore({
  reducer: {
    game: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const gameActions = gameSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
