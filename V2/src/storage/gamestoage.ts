import { gameActions, store, persistor, createUid } from "./store";
import type { GameplayState, PlayerInfo, UpgradeLogEntry, PlayLogEntry, PurchaseLogEntry, RootState } from "./store";

export default class GameStorage {
    private static initPromise: Promise<void> | null = null;

    static init(): Promise<void> {
        if (this.initPromise) {
            return this.initPromise;
        }
        this.initPromise = new Promise((resolve) => {
            const maybeBootstrap = () => {
                if (persistor.getState().bootstrapped) {
                    const state = store.getState();
                    if (!state.game.player.uid) {
                        store.dispatch(gameActions.setPlayerInfo({ uid: createUid() }));
                    }
                    unsubscribe();
                    resolve();
                }
            };
            const unsubscribe = persistor.subscribe(maybeBootstrap);
            maybeBootstrap();
        });
        return this.initPromise;
    }

    static getState(): RootState["game"] {
        return store.getState().game;
    }

    static getUser(): PlayerInfo {
        return this.getState().player;
    }

    static setUser(update: Partial<PlayerInfo>): void {
        store.dispatch(gameActions.setPlayerInfo(update));
    }

    static getUpgradeLog(): UpgradeLogEntry[] {
        return this.getState().upgradeLog;
    }

    static addUpgradeLog(entry: UpgradeLogEntry): void {
        store.dispatch(gameActions.addUpgradeLog(entry));
    }

    static getGameLog(): PlayLogEntry[] {
        return this.getState().playLog;
    }

    static addGameLog(entry: PlayLogEntry): void {
        store.dispatch(gameActions.addPlayLog(entry));
    }

    static getPurchaseLog(): PurchaseLogEntry[] {
        return this.getState().purchaseLog;
    }

    static addPurchaseLog(entry: PurchaseLogEntry): void {
        store.dispatch(gameActions.addPurchaseLog(entry));
    }

    static getGameplay(): GameplayState {
        return this.getState().gameplay;
    }

    static setGameplay(gameplay: Omit<GameplayState, "updatedAt">): void {
        store.dispatch(gameActions.setGameplay(gameplay));
    }

    static exportSnapshot(): RootState["game"] {
        return this.getState();
    }
}