import Game from "../game/game";
import { GameCanvasElement } from "../classes/interface";
import Clickable from "../classes/Clickable";
import G from "../util/G";
import { CELLSIZE } from "../util/const";

export default class Intro{
    game : Game;
    maingamescene : GameCanvasElement;
    canvas : GameCanvasElement;
    menuclickables : Clickable[];
    isClick : boolean = false;
    constructor(game : Game){
        this.game = game;
        game.body.innerHTML = '';
        game.body.append(game.canvas);
        game.gamePased = false;
        game.dialog.remove();
        this.maingamescene = G.imgToCanvas(game.canvas);
        this.canvas = G.imgToCanvas(game.canvas);
        var w = this.canvas.w;
        var h = this.canvas.h;
        game.body.innerHTML = '';
        game.body.append(this.canvas);
        var ctx = this.canvas.ctx;
        this.menuclickables = [
            // new Clickable(0,0,CELLSIZE*1.5,CELLSIZE*1.5,G.getEmojiSprite('📋',CELLSIZE*1.5,1.4),(e)=>{game.showMenu()})
        ]
        var s1 = G.getTextSprite(`▩`,16,'#c3c139',1.3);
        var bord1 = G.GenBorder(w,h/2,s1,'#e7e570');
        ctx.drawImage(bord1,0,0);
        var picborder = G.GenBorder(64,64,s1,'#c3c139');
        var we = G.getEmojiSprite('🧙',64,1.3); 
        ctx.drawImage(picborder,
            w - picborder.w - 16,
            16
        );
        ctx.drawImage(we,
            w - picborder.w - 16,
            16
        );
        var texts = [
            G.GetTextSpriteWithShadow(`Hello? .....`,16,'#7a7818',1,'cursive'),
            G.GetTextSpriteWithShadow(`Portals appear, monsters...`,16,'#7a7818',1,'cursive'),
            G.GetTextSpriteWithShadow(`your master is lost in one of them`,16,'#7a7818',1,'cursive'),
            G.GetTextSpriteWithShadow(`your mission ... rescue master`,16,'#7a7818',1,'cursive'),
            G.GetTextSpriteWithShadow(`Game is under construction`,16,'#00f',1,'cursive'),
            G.GetTextSpriteWithShadow(`JS13k competition 2025`,16,'#00f',1,'cursive'),
        ]
        var cy = CELLSIZE;
        for(let i in texts){
            ctx.drawImage(texts[i],CELLSIZE,cy);
            cy += CELLSIZE;
        }
        var textOk = G.GetTextSpriteWithShadow(`OK`,16,'#7a7818',1,'cursive')
        var buttonOK = G.GenBorder(textOk.w + CELLSIZE,textOk.h + CELLSIZE,s1,'#e7e570');
        buttonOK.ctx.drawImage(textOk,CELLSIZE/2,CELLSIZE/2);
        this.menuclickables.push(
            new Clickable(CELLSIZE*1.5,cy,buttonOK.w,buttonOK.h,buttonOK,()=>{
                game.body.innerHTML = '';
                game.body.append(game.canvas);
                game.gamePased = false;
                game.dialog.remove();
                game.update(game.time);
            })
        )
        this.menuclickables.forEach(btn=>{
            btn.draw(ctx)
        })
        this.canvas.addEventListener('mousedown', () => handleStart());
        this.canvas.addEventListener('mouseup', (e) => handleEnd(e));
        this.canvas.addEventListener('mousemove', (e) => handleMove(e));
        this.canvas.addEventListener('touchstart', () => handleStart());
        this.canvas.addEventListener('touchend', (e) => handleEnd(e));
        this.canvas.addEventListener('touchmove', (e) => handleMove(e));
        var handleEnd = (e : any)=>{
            G.mapClick(e.touches ? e.touches[0] : e, this.canvas,(pt: any)=>{
                this.menuclickables.forEach(x=> {if(x.handleTouchPos) x.handleTouchPos(pt)});
            });
        }
        var handleStart = ()=>{
            this.isClick = true;
        }
        var handleMove = (e: any)=>{
            G.mapClick(e.touches ? e.touches[0] : e,this.canvas,()=>{});
        }
    }
}