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
        new CombatScene(this,null,null,"grassland",()=>{
            this.mainScene();
        });
    }
    mainScene(){
        this.resetBody();
        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.canvas.fill('#000');
        this.body.append(this.canvas);
        this.canvas.ctx.drawImage(
            this.pixelFont.getLine('Home',3,'#fff'),
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
class FireSphere{
    ctx : CanvasRenderingContext2D ;
    constructor(ctx : CanvasRenderingContext2D){
        this.ctx = ctx;
    }
    
    draw(ctx : CanvasRenderingContext2D){
        // var palette = ['#ff0000','#ffa000','#ff5800','#fecc00'];
        // var palette = ['#30edf1','#0a99d1','#065590','#2892e1'];
        var palette = ['#59fff6','#0faba3','#07625d','#86dad5'];
        
        var shapeTexture1 = G.shapeTexture(64,64,')',16,palette[1],10,  14);
        var shapeTexture2 = G.shapeTexture(64,64,')',16,palette[2],12,  14);
        var shapeTexture3 = G.shapeTexture(64,64,')',16,palette[3],14,  14);
        var circle = G.MakeCircle(32*0.8,palette[1],palette[0],2);
        var fused1 = G.fuseImage(circle,shapeTexture1,'source-atop');
        var fused2 = G.fuseImage(circle,shapeTexture2,'source-atop');
        var fused3 = G.fuseImage(circle,shapeTexture3,'source-atop');
        
        // document.body.append(lines1);
        var time = 0;
        var frame = 0;
        var frames = [
            fused1,fused2,fused3
        ]
        let upd = (t:number)=>{
            var delta = t-time;
            if(true || delta > 220){
                // document.body.innerHTML = '';
                // document.body.append(frames[frame]);
                frame = ++frame > frames.length-1 ? 0 : frame;
                time = t;
                this.ctx.drawImage(frames[frame],0,0);
            }
            // requestAnimationFrame(upd);
        }
        upd(0);

        // var mag = G.magnifyByMatrix(texture2,6);
        // ctx.drawImage(mag,0,0);
        // ctx.drawImage(this.canvas,ctx.canvas.width/2 - this.canvas.w/2,ctx.canvas.height/2 - this.canvas.h/2);
    }
    drawLines(canvas : GameCanvasElement,color : any,count : number, offset : number, angle : number){
        canvas.ctx.save();
        canvas.ctx.globalCompositeOperation = 'source-atop';
        canvas.ctx.strokeStyle = color;
        canvas.ctx.lineWidth = 1;
        var cx = offset;
        var delta = canvas.w/count;
        for(let i = 0 ;i < count; i++){
            canvas.ctx.moveTo(cx-angle,canvas.h);
            canvas.ctx.lineTo(cx+angle,0);
            canvas.ctx.stroke();
            cx += delta;
        }
        canvas.ctx.restore();
    }
    setctx(ctx:CanvasRenderingContext2D){
        this.ctx = ctx;
    }
    update(){

    }
    getBase(){

    }
    getAnimation1(){




    }
}
class DummyCombatScene{
    canvas : GameCanvasElement = G.EmptyCanv();
    tilesize : number = 64;
    roundRectS1 : GameCanvasElement = G.EmptyCanv();

    constructor(game : Game){
        var w = game.canvasDim.w;
        var h = game.canvasDim.h;
        var canvas = G.makeCanvas(w, h);
        this.canvas = G.makeCanvas(w, h);

        var s = new FireSphere(this.canvas.ctx);
        s.draw(this.canvas.ctx);

        return;
        
        this.tilesize = 128;
        var sceneh = 300;
        var tilesperrow = Math.floor(w/(this.tilesize)) - 1;
        var tilespercol = Math.floor((h-sceneh)/(this.tilesize)) - 1;
        var freemargin = (w - tilesperrow*this.tilesize) / tilesperrow;
        this.roundRectS1 = G.MakeRoundedRect(this.tilesize, this.tilesize, 12.5, '#ffffff');
        
        
        var treeImg = G.getEmojiSprite('🌳',128,1);
        var treeImg2 = G.getEmojiSprite('🌲',64,1);
        var cloudImg = G.getEmojiSprite('☁️',128,1.2);
        var catSprite = Cat.extractImage();
        var catSprite64 = G.magnifyByMatrix(catSprite,2);
        var mobSprite = G.getEmojiSprite('🧟',64,1.2);
        var portalSprite = G.getEmojiSprite('🌀',64,1.2);
        canvas.ctx.fillStyle = 'blue';
        canvas.ctx.fillRect(0,0,w,sceneh);
        canvas.ctx.fillStyle = 'red';
        canvas.ctx.fillRect(0,sceneh,w,h-sceneh);

        //draw sky
        canvas.ctx.fillStyle = 'rgb(19, 178, 206)';
        canvas.ctx.fillRect(0,0,w,sceneh);
        //draw clouds
        for(let i = -2 ; i < 15; i++){
            canvas.ctx.drawImage(cloudImg,i*168,0);
        }
        //draw trees
        for(let i = -2 ; i < 15; i++){
            canvas.ctx.drawImage(treeImg2,i*64,sceneh-64*2-treeImg2.height+5);
        }
        for(let i = -2 ; i < 15; i++){
            canvas.ctx.drawImage(treeImg,i*100,sceneh-64*2-treeImg.height+10);
        }
        //draw road
        var dirtSprite = SpriteEngine.GenDirtTile(w,64*2);
        canvas.ctx.drawImage(dirtSprite,0,sceneh-64*2);
        canvas.ctx.drawImage(catSprite64,0,sceneh-64-32);
        canvas.ctx.drawImage(portalSprite,w-64,sceneh-64 - 64, 64,64*2);
        canvas.ctx.drawImage(mobSprite,w-64-64,sceneh-64 - 32);
        var gardem = SpriteEngine.GenFlowerGarden(w,h-sceneh,w);
        canvas.ctx.drawImage(gardem,0,sceneh);

        var elementals = [
            {v:'s', e:'✨', s: G.getEmojiSprite('✨',this.tilesize,1.3), c:'rgb(68, 7, 80)', ods : 30},
            {v:'d', e:'🛡️', s: G.getEmojiSprite('🛡️',this.tilesize,1.3), c:'rgb(8, 59, 4)', ods : 5},
            {v:'h', e:'🩹', s: G.getEmojiSprite('🩹',this.tilesize,1.3), c:'rgb(3, 15, 83)', ods : 5},
            {v:'h', e:'🪨', s: G.getEmojiSprite('🪨',this.tilesize,1.3), c:'rgb(122, 73, 8)', ods : 15},
            {v:'f', e:'🔥', s: G.getEmojiSprite('🔥',this.tilesize,1.3), c:'rgb(226, 45, 45)', ods : 15},
            {v:'w', e:'💧', s: G.getEmojiSprite('💧',this.tilesize,1.3), c:'rgb(13, 13, 201)', ods : 15},
            {v:'i', e:'💨', s: G.getEmojiSprite('🌪️',this.tilesize,1.3), c:'#13c5ad', ods : 15},
        ];
        const pickElemental = this.createPicker<any>(elementals);
        var cy = sceneh + this.tilesize/2;
        var cx = freemargin/2;
        canvas.ctx.fillStyle = '#b6b6b6';
        const fillRect = (color: string, x:number, y:number, w:number, h:number) => {
            canvas.ctx.fillStyle = color;
            canvas.ctx.fillRect(x, y, w, h);
        }
        for(let i = 0 ;i < tilespercol; i++){
            for(let j = 0 ; j < tilesperrow ; j++){
                var el = pickElemental();
                fillRect('#fff', cx, cy, this.tilesize, this.tilesize);
                fillRect(el.c, cx+2, cy+2, this.tilesize -4, this.tilesize - 4);
                canvas.ctx.drawImage(el.s,cx,cy,this.tilesize,this.tilesize);
                cx += this.tilesize + freemargin;
            }
            cx = freemargin/2;
            cy += this.tilesize + freemargin;
        }
        this.canvas = canvas;
    }
    createPicker<T extends { ods: number }>(arr: T[]) {
        const total = arr.reduce((s, x) => s + x.ods, 0);
        return (): T => {
            let r = Math.random() * total;
            for (const item of arr) {
                r -= item.ods;
                if (r < 0) return item;
            }
            // Fallback (should never happen)
            return arr[arr.length - 1];
        };
    }
    getSprite(v = ' '){
        var emojisprt = G.getEmojiSprite(v,this.tilesize,1.3);
        return G.fuseImage(this.roundRectS1,emojisprt);
    }
}
export default Game;