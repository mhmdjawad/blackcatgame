import Game from "./game/game";
// import { mountSupportApp } from "./support";
// mountSupportApp();
if (!(window as any).game) {
  try {
    (window as any).game = new Game();
  } catch (e) {
    // If Game depends on DOM being fully ready, defer a tick.
    setTimeout(() => { (window as any).game = new Game(); }, 0);
  }
}