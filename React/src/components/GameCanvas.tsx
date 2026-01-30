import { useEffect } from "react";
import Game from "../old/game";
export default function GameCanvas() {
  useEffect(() => {
    // Optional: resize parent div when window resizes
    const handleResize = () => {
      const gameDiv = document.getElementById("game");
      if (gameDiv) {
        gameDiv.style.width = `${window.innerWidth*0.95}px`;
        gameDiv.style.height = `${window.innerHeight*0.95}px`;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initial sizing
    const g = new Game("#game");
    (window as any).game = g;

    return () => {
      window.removeEventListener("resize", handleResize);
      delete (window as any).game;
    };
  }, []);
  return <div id="game" className="w-full h-full bg-black" />;
}
