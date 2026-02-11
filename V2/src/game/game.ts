import type { GameCanvasElement } from "../classes/interface";
import G from "../util/G";
import { GameEngine } from "../classes/GameEngine";
import SpriteEngine from "../util/SpriteEngine";
import PixelFontE from "../util/PixelFontE";
import Cat from "../classes/Cat";
import CombatScene from "../classes/CombatScene";
class Game extends GameEngine{
    canvasDim : {w:number,h:number};
    spriteEngine : SpriteEngine;
    objects : any[];
    canvas: GameCanvasElement;
    pixelFont : PixelFontE = new PixelFontE();
    constructor(containerId = "app"){
        super(containerId);
        var aspect = window.innerHeight/window.innerWidth;
        this.canvasDim = {w :800  , h : Math.min(aspect > 1 ? 800 * aspect : 1800,1600)};
        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.spriteEngine = new SpriteEngine(null);
        this.objects = [];
        this.practiceCombat();
        return;
    }
    practiceCombat(){
        new CombatScene(this);
    }
    mainScene(){
        this.resetBody();
        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.canvas.fill('#000');
        this.body.append(this.canvas);
        this.canvas.ctx.drawImage(
            PixelFontE.getLine('Home',3,'#fff'),
            0,
            this.canvas.h/2
        )
        this.showMenu();
    }
    showMenu(){
        this.header.innerHTML = `
            width : ${this.canvasDim.w} <br>
            height : ${this.canvasDim.h} <br>
            innerWidth : ${window.innerWidth} <br>
            innerHeight : ${window.innerHeight} <br>
            aspect Ratio : ${window.innerHeight/window.innerWidth} <br>
            devicePixelRatio : ${window.devicePixelRatio} <br>
        `;
        this.header.innerHTML='';
        var sprite_cog = G.getEmojiSprite('⚙️',32,1.2);
        sprite_cog.onclick = ()=>{
            console.log('clicked settings');
        };
        // this.footer.append(sprite_cog);
    }
    newGame(){
        this.resetBody();
        this.body.innerHTML = '';
        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.body.innerHTML = '';
        this.body.appendChild(this.canvas);
        this.body.appendChild(this.helpdom);
        this.objects = [
        ]
        this.body.innerHTML = '';
        this.body.appendChild(this.canvas);
        this.body.appendChild(this.helpdom);
        this.canvas.addEventListener('mousedown', (e) => handleStart(e));
        this.canvas.addEventListener('mouseup', () => handleEnd());
        this.canvas.addEventListener('mousemove', (e) => handleMove(e));
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => handleStart(e));
        this.canvas.addEventListener('touchend', () => handleEnd());
        this.canvas.addEventListener('touchmove', (e) => handleMove(e));
        var handleEnd =()=>{}
        var handleStart = (e : any)=>{
            G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt: any)=>{
                var x = pt.x;
                var y = pt.y;
                // this.touchPos = { x: x, y: y };
            });
        }
        var handleMove = (e: any)=>{
            // if (this.touchPos) {
            //     G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt: any)=>{
            //         var x = pt.x;
            //         var y = pt.y;
            //         this.touchPos = { x: x, y: y };
            //     });
            // }
        }
        return;
    }
}
export default Game;