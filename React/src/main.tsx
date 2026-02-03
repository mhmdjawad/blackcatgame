<<<<<<< HEAD
// import Game from "./game/game";
import "./index.css";
import { mountSupportApp } from "./support";
mountSupportApp();
if (!(window as any).game) {
  // try {
  //   (window as any).game = new Game();
  // } catch (e) {
  //   // If Game depends on DOM being fully ready, defer a tick.
  //   setTimeout(() => { (window as any).game = new Game(); }, 0);
  // }
=======
import Game from "./game/game";
import "./index.css";
// Instantiate game object outside React lifecycle (available as global)
// This runs once when the bundle loads and does not depend on React rendering.
if (!(window as any).game) {
  try {
    (window as any).game = new Game();
  } catch (e) {
    // If Game depends on DOM being fully ready, defer a tick.
    setTimeout(() => { (window as any).game = new Game(); }, 0);
  }
>>>>>>> cb83304c78237135462280aa2d7969381c3a6d9f
}