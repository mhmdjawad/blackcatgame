import Game from "../game/game";
import Cat from "./Cat";
import { GameCanvasElement } from "./interface";
import Point from "./Point";
import { CELLSIZE } from "../util/const";
import G from "../util/G";
import { GameMap } from "./Map";

export default class Player{
    game: Game;
    xp : number;
    level : number;
    spellpower : any;
    speed : number;
    visibility : number;
    cat : Cat;
    catIdleAnimation : GameCanvasElement[];
    catWalkAnimation : GameCanvasElement[];
    animation : any;
    center:Point;
    pos:Point;
    sprite:GameCanvasElement;
    moving:boolean;
    destination:Point;
    pathplan: Point[];
    keys:any;
    constructor(game : Game){
        this.game = game;
        this.xp = 0;
        this.level = 0;
        this.spellpower = [
            {k: 'm', e:'🔮', v:1},
            {k: 'f', e:'🔥', v:1},
            {k: 'w', e:'💧', v:1},
            {k: 'e', e:'🌱', v:1},
            {k: 'i', e:'🌪️', v:1},
            {k: 'z', e:'⚡', v:1},
            {k: 'l', e:'☀️', v:1},
            {k: 'd', e:'🌑', v:1},
        ];
        this.speed = 2;
        this.visibility = CELLSIZE * 4;
        this.cat = new Cat();
        this.catIdleAnimation = this.cat.IdleAnimation();
        this.catWalkAnimation = this.cat.WalkingAnimation();
        this.animation = {
            framerate : 8,
            frame : 0,
            spriteindex : 0,
            spritesheet : this.catIdleAnimation
        }
        this.center = new Point({x:3*CELLSIZE-CELLSIZE/2,y:5*CELLSIZE-CELLSIZE/2});
        this.pos = G.Point(this.center);
        this.sprite = this.catIdleAnimation[0];
        this.moving = false;
        this.destination = G.Point(this.center);
        this.pathplan = [];
    }
    update(){
        this.animation.spritesheet = this.moving ? this.catWalkAnimation : this.catIdleAnimation;
        this.animation.frame++;
        if(this.animation.frame >= this.animation.framerate){
            if(this.animation.spriteindex >= this.animation.spritesheet.length) this.animation.spriteindex = 0;
            this.sprite = this.animation.spritesheet[this.animation.spriteindex];
            this.animation.spriteindex++;
            this.animation.frame = 0;
        }
        if(this.destination.distance(this.center) >= this.speed){
            this.center.moveToward(this.destination,this.speed);
        }
        else{
            this.center = G.Point(this.destination);
            this.moving = false;
        }
        if(this.destination.distance(this.center) == 0 && this.pathplan.length > 0){
            var dest = this.pathplan.shift();
            this.destination = G.Point(dest);
            this.moving = true;
        }
    }
    draw(ctx : CanvasRenderingContext2D){
        ctx.drawImage(this.sprite,
            this.center.x - this.sprite.w/2,
            this.center.y - this.sprite.h/2
        );
    }
    getCameraStartXY(){
        var startX = Math.max(0,this.center.x - this.game.canvasDim.w / 2);
        var startY = Math.max(0,this.center.y - this.game.canvasDim.h / 2);
        return {x:startX,y:startY};
    }
    handleTouchPos(pos : Point){
        if(pos.y < CELLSIZE) return;
        var cameraXY = this.getCameraStartXY();
        var indexIJ = {
            i : Math.floor(G.NormGrid(cameraXY.x + pos.x,CELLSIZE) / CELLSIZE),
            j : Math.floor(G.NormGrid(cameraXY.y + pos.y,CELLSIZE) / CELLSIZE),
        }
        if(this.moving == false){
            var gamemap = this.game.gamemap as GameMap;
            if(!gamemap.isObstacle(indexIJ)){
                var origin = {
                    i : Math.floor(this.center.x/CELLSIZE),
                    j : Math.floor(this.center.y/CELLSIZE),
                }
                this.pathplan = gamemap.findPathNormPt(origin,indexIJ);
            }
        }
    }
}