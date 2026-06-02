import type { GameCanvasElement } from "../classes/interface";
import type Point from "../classes/Point";
import { CELLSIZE } from "../util/const";
import G from "../util/G";
import PixelFontE from "../util/PixelFontE";

export default class Enemy{
    sprite : GameCanvasElement;
    center:Point;
    speed:number;
    life : number = 15;
    power:number = 1;
    time:number = 0;
    constructor(center:Point,life : number){
        this.center = center;
        this.speed = 1;
        this.life  = life;
        this.sprite = this.getSprite();
    }
    getSprite(){
        return G.getEmojiSprite('🧟',CELLSIZE*2,1.3)
    }
    draw(canvas:GameCanvasElement){
        canvas.drawRelative(this.sprite,this.center);
        var healthBar = G.coloredRect(
            this.sprite.w,
            8,
            '#00ff00'
        )
        var healthPts = PixelFontE.getLineShadowed(`${this.life}`,2,'#fff','#000');
        canvas.drawAt(healthBar,this.center.moveBy(-CELLSIZE/2,-CELLSIZE/2));
        canvas.drawAt(healthPts,this.center.moveBy(-CELLSIZE/2,-CELLSIZE/2));
    }
    update(t:number){
        this.center.x -= this.speed;
        console.log("enemy moved to",this.center.x);
    }
    updateAndAttack(t:number,scene:any){
        // Check collision with player
        if(this.center.x < CELLSIZE){
            // Attack player
            if(t - this.time > 1000){ // Attack cooldown
                this.time = t;
                scene.AttackPlayer(1);
            }
        }
        else{
            // Move towards player
            this.update(t);
        }
    }

}