import Game from "./game/game";
import GameStorage from "./storage/gamestoage";
// import { mountSupportApp } from "./support";
// mountSupportApp();
if (!(window as any).game) {
  GameStorage.init().finally(() => {
    try {
      (window as any).game = new Game();
    } catch (e) {
      // If Game depends on DOM being fully ready, defer a tick.
      setTimeout(() => { (window as any).game = new Game(); }, 0);
    }
  });
}