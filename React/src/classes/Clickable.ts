import type { GameCanvasElement } from "../interface";
import Point from "./Point";
class Clickable{
    x : number;
    y : number;
    w : number;
    h : number;
    sprite : GameCanvasElement;
    onclick : Function;
    constructor(x: number,y: number,w: number,h: number,sprite : GameCanvasElement,onclick : Function){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sprite = sprite;
        this.onclick = onclick;
    }
    handleTouchPos(pos : Point){
        if(this.isInside(pos.x,pos.y)){
            if(this.onclick) this.onclick(this);
            return true;
        }
        return false;
    }
    isInside(px: number,py : number){
        return px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h;
    }
    draw(ctx : CanvasRenderingContext2D){
        // ctx.save();
        // ctx.strokeStyle = '#f00';
        // ctx.lineWidth = 2;
        // ctx.strokeRect(this.x,this.y,this.w,this.h);
        // ctx.restore();
        ctx.drawImage(this.sprite,this.x,this.y,this.w,this.h);
    }
    update(){}
}
export default Clickable;