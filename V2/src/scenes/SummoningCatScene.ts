import Game from "../game/game";
import Cat from "../classes/Cat";
import { GameCanvasElement } from "../classes/interface";
import G from "../util/G";
function pointsOnCircle(cx : number, cy : number, r : number, n : number) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        points.push({ x, y });
    }
    return points;
}
import { CELLSIZE } from "../util/const";
export default class SummoningCatScene{
    game : Game;
    cat : Cat;
    credit : GameCanvasElement;
    catIdle : GameCanvasElement;
    catIdleShadow : GameCanvasElement;
    canvas : GameCanvasElement;
    catInBox : GameCanvasElement;
    catWalkAnimation : GameCanvasElement[];
    catWalkAnimationShadow : GameCanvasElement[];
    catAnimations64 : GameCanvasElement[];
    space : GameCanvasElement;
    rotspeed : number;
    elements : any[];
    circlesprite : GameCanvasElement;
    pointsprite : GameCanvasElement;
    circlepoints : any[];
    circle:  any;
    LogoY : number;
    CatWalkingAnimationObj : any;
    familiarSprite : any;
    constructor(game : Game){
        this.game = game;
        this.cat = new Cat();
        this.credit = G.getTextSprite(`BY MHMDJAWADZD`,   16, `#fff`, 1.5, 'cursive');
        this.catIdle = this.cat.Idle();
        this.catIdleShadow = G.GenShadow(this.catIdle,2,'#fff');
        this.catIdleShadow.ctx.drawImage(this.catIdle,1,1);
        this.canvas = G.makeCanvas(game.canvasDim.w,game.canvasDim.h);
        this.catInBox = G.magnifyByMatrix(this.catIdleShadow,2);
        this.catWalkAnimation = this.cat.WalkingAnimation();
        this.catWalkAnimationShadow = this.catWalkAnimation.map(x=> G.GenShadow(x,2,'#fff'));
        this.catWalkAnimationShadow.forEach((x,i)=> x.ctx.drawImage(this.catWalkAnimation[i],1,1));
        this.catAnimations64 = this.catWalkAnimationShadow.map(x=> G.magnifyByMatrix(x,2));
        this.space = G.randomPattern('#000','#fff',0.001,this.canvas.w*3,this.canvas.h);
        this.rotspeed = 5;
        this.elements = [
            {s:G.getEmojiSprite('🔥',32,1.3),c:'#ee4000c7',i:0,t:this.rotspeed},
            {s:G.getEmojiSprite('💧',32,1.3),c:'#00c7eec7',i:10,t:this.rotspeed},
            {s:G.getEmojiSprite('🌱',32,1.3),c:'#805a05c7',i:20,t:this.rotspeed},
            {s:G.getEmojiSprite('🌪️',32,1.3),c:'#cdcf84c7',i:30,t:this.rotspeed},
            {s:G.getEmojiSprite('⚡',32,1.3),c:'#f9ff30c7',i:40,t:this.rotspeed},
            {s:G.getEmojiSprite('☀️',32,1.3),c:'#f8ff00c7',i:50,t:this.rotspeed},
            {s:G.getEmojiSprite('🌑',32,1.3),c:'#a83bf3c7',i:60,t:this.rotspeed},
        ];
        this.circlesprite = G.MakeCircle(CELLSIZE*4,'#fff',null,3);
        this.pointsprite = G.MakeCircle(CELLSIZE/9,'#00f','#00f',3);
        var centerY = this.canvas.h - this.circlesprite.h/2 - CELLSIZE;
        var circle = {x : this.canvas.w/2, y : centerY, r : this.circlesprite.w/2};
        this.circlepoints = pointsOnCircle(circle.x,circle.y,circle.r,70);
        this.circle = circle;
        this.LogoY = centerY - this.circlesprite.h/2 - CELLSIZE;
        this.CatWalkingAnimationObj = {
            sprites : this.catAnimations64,
            current : 0,
            frames : 0,
            framerate : 16,
            locX :64,
            locY : this.LogoY,
        }
        this.GenFamiliarSprite();
    }
    GenFamiliarSprite(){
        var letters = ['T','H','E',' ','F','A','M','I','L','I','A','R'];
        var canvas = G.makeCanvas(64*letters.length,CELLSIZE+4);
        var cx = 0;
        for(let i in letters){
            var sprite = G.getTextSprite(letters[i],CELLSIZE,'#fff',1.1,'cursive');
            var sprite2 = G.getTextSprite(letters[i],CELLSIZE,'#b90000',1.1,'cursive');
            canvas.ctx.drawImage(sprite, cx+1,1);
            canvas.ctx.drawImage(sprite2, cx, 0);
            cx += CELLSIZE;
        }
        this.familiarSprite = {
            sprite : canvas,
            locX :128,
            locY : this.LogoY,
            currentShowing : 0
        };
    }
    draw(canvas : GameCanvasElement){
        canvas.ctx.drawImage(this.canvas,0,0);
    }
    update(){
        var randSpaceX = G.randInt(0,this.space.w-this.canvas.w);
        this.canvas.ctx.drawImage(this.space,
            0,0,
            randSpaceX,
            this.canvas.h,
            0,
            0,
            this.canvas.w,
            this.canvas.h,
        );
        this.canvas.ctx.drawImage(this.circlesprite,
            this.circle.x - this.circlesprite.w/2,
            this.circle.y - this.circlesprite.h/2
        );
        //draw cat walking
        this.canvas.ctx.drawImage(
            this.CatWalkingAnimationObj.sprites[this.CatWalkingAnimationObj.current],
            this.circle.x - 32,
            this.circle.y - 32
        );
        this.CatWalkingAnimationObj.frames++;
        if(this.CatWalkingAnimationObj.frames > this.CatWalkingAnimationObj.framerate){
            this.CatWalkingAnimationObj.frames = 0;
            this.CatWalkingAnimationObj.current++;
            if(this.CatWalkingAnimationObj.current >= this.CatWalkingAnimationObj.sprites.length){
                this.CatWalkingAnimationObj.current = 0;
            }
        }
        // this.canvas.ctx.drawImage(this.catInBox,
        //     this.circle.x - this.catInBox.w/2,
        //     this.circle.y - this.catInBox.h/2
        // );
        this.canvas.ctx.drawImage(this.familiarSprite.sprite, 
            0,0,
            this.familiarSprite.currentShowing,
            this.familiarSprite.sprite.h,
            this.familiarSprite.locX,
            this.familiarSprite.locY,
            this.familiarSprite.currentShowing,
            this.familiarSprite.sprite.h,
        );
        this.familiarSprite.currentShowing += 4;
        if(this.familiarSprite.currentShowing > this.familiarSprite.sprite.w){
            this.familiarSprite.currentShowing = 0;
        }
        this.elements.forEach(el=>{
            var pos = this.circlepoints[el.i % this.circlepoints.length];
            this.canvas.ctx.drawImage(el.s,
                pos.x - el.s.w/2,
                pos.y - el.s.h/2
            );
            var randotherelement = this.elements.filter(x=>x!=el)[G.randInt(this.elements.length-1)];
            var otherpos = this.circlepoints[randotherelement.i % this.circlepoints.length];
            this.canvas.ctx.save();
            this.canvas.ctx.strokeStyle = el.c;
            this.canvas.ctx.lineWidth = 2;
            this.canvas.ctx.beginPath();
            this.canvas.ctx.moveTo(
                pos.x,
                pos.y
            );
            this.canvas.ctx.lineTo(
                otherpos.x,
                otherpos.y
            );
            this.canvas.ctx.stroke();
            this.canvas.ctx.restore();
            //move to next
            el.t--;if(el.t <= 0){el.t = this.rotspeed;el.i++;}
        });
        this.canvas.ctx.drawImage(this.credit, 0,  this.canvas.h - this.credit.h);
    }
}