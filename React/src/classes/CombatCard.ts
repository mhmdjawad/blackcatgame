import { GameCanvasElement } from "./interface";
import G from "../util/G";
import { CELLSIZE } from "../util/const";

export default class CombatCard{
    attrib : any;
    x :number = 0;
    y :number = 0;
    shadow : GameCanvasElement = G.EmptyCanv();
    canvas : GameCanvasElement = G.EmptyCanv();
    constructor(attrib : any){
        this.updateCanvas(attrib);
    }
    updateCanvas(attrib : any){
        var canvas = G.makeCanvas(attrib.w,attrib.h);
        var ctx = canvas.ctx;
        canvas.fill(attrib.color);
        var nameassprite = G.getTextSprite(attrib.name,14,'#000',1.1);
        ctx.drawImage(attrib.sprite, canvas.w/2 - attrib.sprite.w/2, canvas.h/2 - attrib.sprite.h/2);
        ctx.drawImage(nameassprite,canvas.w/2 - nameassprite.w/2,4);
        ctx.fillStyle = attrib.health/attrib.healthmax > 0.4 ? 'green' : 'red';
        ctx.fillRect(CELLSIZE/5, nameassprite.h + 4,
            (canvas.w-CELLSIZE/10)* (attrib.health/attrib.healthmax), 4
        )
        this.x = attrib.x;
        this.y = attrib.y;
        this.shadow = G.makeCanvas(attrib.w+4,attrib.h+4);
        this.shadow.fill(attrib.shadow);
        this.canvas = canvas;
    }
    draw(ctx : CanvasRenderingContext2D){
        ctx.drawImage(this.shadow,this.x - 2,this.y - 2);
        ctx.drawImage(this.canvas,this.x,this.y);
    }
}