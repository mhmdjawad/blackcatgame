import Game from "../game/game";
import { GameCanvasElement } from "./interface";
import Player from "./Player";
import Clickable from "./Clickable";
import CombatCard from "./CombatCard";
import { CardElement,Spell } from "./interface";
import { CELLSIZE } from "../util/const";
import G from "../util/G";
import Collection from "./Collection";
import { SPELLBOOK } from "../util/const";
import Point from "./Point";
import SpriteEngine from "../util/SpriteEngine";
import Cat from "./Cat";
import PixelFontE from "../util/PixelFontE";

class Tile{
    frames : GameCanvasElement[];
    sprite : GameCanvasElement;
    frame : number = 0;
    type:string;
    ods:number;
    level : number;
    size : number;
    time=0;
    
    constructor(type : string, size:number, level : number){
        this.type = type;
        this.level = level;
        this.size = size;
        this.frames = this.getFrames();
        this.sprite = this.frames[0];
        this.ods = 1;
        this.update(0);
    }
    getFrames(): GameCanvasElement[] {
        var c = G.makeCanvas(this.size,this.size);
        c.stroke('#000',4);
        return [c];
    }
    update(t=0){
        var delta = t - this.time;
        if(delta > 1000){
            this.frame++;
            if(this.frame >= this.frames.length) this.frame = 0;
            this.sprite = this.frames[this.frame];
            this.time = t;
        }
        requestAnimationFrame((t)=>this.update(t));
    }
}
class ManaTile extends Tile{
    constructor(size :number, level = 1){
        super('mana',size,level);
    }
    override getFrames(){
        var canvases : GameCanvasElement[] = [];
        var size = this.size;
        var level = this.level;
        var palette = ['#bb51bb','#083e7f','#ff00ff','#794087'];
        // var base = G.getEmojiSprite('✨',size, 1.3);
        var palet2 = G.colorToPalette(palette[1],5,0.05);
        var base = G.getEmojiSprite('⭐',size, 1.3);
        var base_small = G.getEmojiSprite('⭐',size*0.8, 1.3);
        base_small = G.fuseColor(base_small,palette[0])
        var innerSprites = [];
        var deg = 0;
        for(let i in palet2){
            deg -= 45;
            var fused = G.fuseColor(base,palet2[i]);
            fused.drawCentered(base_small);
            var rotated = G.rotateCanvas(fused,deg);
            innerSprites.push(rotated)
        }
        var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,'#fff','#000');
        for(let i = 0 ;i < innerSprites.length;i++){
            var canvas1 = G.makeCanvas(size,size);
            canvas1.fill(palette[3]);
            canvas1.drawCentered(innerSprites[i]);
            canvas1.drawBottomCenter(levelSprite,4);
            canvas1.stroke(palette[2],3);
            canvases.push(canvas1);
        }
        return canvases;
    }
}
class WaterTile extends Tile{
    constructor(size:number, level = 1){
        super('water',size,level);
    }
    override getFrames(){
        var canvases : GameCanvasElement[] = [];
        var size = this.size;
        var level = this.level;
        var palette = ['#060c6e','#2f37b9','#242ed3','#7980f1'];
        var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,palette[2],'#000');
        var shapeTexture1 = G.shapeTexture(size,size,'~',size/3,palette[1],10,14);
        var shapeTexture2 = G.shapeTexture(size,size,'~',size/3,palette[1],12,16);
        var shapeTexture3 = G.shapeTexture(size,size,'~',size/3,palette[1],14,18);
        var circle = G.MakeCircle(size*0.3,palette[1],palette[0],2);
        var fused1 = G.fuseImage(circle,shapeTexture1,'source-atop');
        var fused2 = G.fuseImage(circle,shapeTexture2,'source-atop');
        var fused3 = G.fuseImage(circle,shapeTexture3,'source-atop');
        var innerSprites = [
            fused1,
            fused2,
            fused3,
        ]
        for(let i = 0 ;i < innerSprites.length;i++){
            var canvas1 = G.makeCanvas(size,size);
            canvas1.fill(palette[3]);
            canvas1.drawCentered(innerSprites[i]);
            canvas1.drawBottomCenter(levelSprite,4);
            canvas1.stroke(palette[2],3);
            canvases.push(canvas1);
        }
        return canvases;
    }
}
class FireTile extends Tile{
    constructor(size :number, level = 1){
        super('fire',size,level);
    }
    override getFrames(){
        var canvases : GameCanvasElement[] = [];
        var size = this.size;
        var level = this.level;
        var palette = ['#ff0000','#ffa500','#ffff00',"#7e0606"];
        var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,palette[2],'#000');
        var innerSprites = []
        var palet2 = G.colorToPalette(palette[1],3,0.05);
        var base = G.getEmojiSprite('🔥',size, 1.3);
        var base_small = G.getEmojiSprite('🔥',size*0.8, 1.3);
        var megaSprites = palet2.map(color => G.fuseColor(base,color));
        var miniSprites = palet2.map(color => G.fuseColor(base_small,color));
        var innerSprites = [];
        for(let i = 0 ; i < palet2.length;i++){
            for(let j = 0 ; j < palet2.length;j++){
                if(i == j) continue;
                var canv = G.makeCanvas(size,size);
                canv.drawCentered(megaSprites[i]);
                canv.drawCentered(miniSprites[j]);
                innerSprites.push(canv);
            }
        }
        var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,'#fff','#000');
        for(let i = 0 ;i < innerSprites.length;i++){
            var canvas1 = G.makeCanvas(size,size);
            canvas1.fill(palette[0]);
            canvas1.drawCentered(innerSprites[i]);
            canvas1.drawBottomCenter(levelSprite,4);
            canvas1.stroke(palette[3],3);
            canvases.push(canvas1);
        }
        return canvases;
    }
}
class EarthTile extends Tile{
    constructor(size :number, level = 1){
        super('earth',size,level);
    }
    override getFrames(){
        var canvases : GameCanvasElement[] = [];
        var size = this.size;
        var level = this.level;
        var palette = ['#cb8c11','#946002','#64570b',"#a52a2a"];
        var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,palette[2],'#000');
        var innerSprites = []
        var base = G.getEmojiSprite('🪨',size, 1.3);
        base = G.fuseColor(base,palette[1]);
        var innerSprites = [];
        for(let i = 0 ; i < 2 ; i++){
            var canv = G.makeCanvas(size,size);
            var x = canv.w/2 - base.w/2;
            var y = canv.h/2 - base.h/2;
            if(i %2 == 0){
                x += 2;
                y -= 2;
            }
            else{
                x -= 2;
                y += 2;
            }
            canv.ctx.drawImage(base,x,y);
            innerSprites.push(canv);
        }
        var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,'#fff','#000');
        for(let i = 0 ;i < innerSprites.length;i++){
            var canvas1 = G.makeCanvas(size,size);
            canvas1.fill(palette[0]);
            canvas1.drawCentered(innerSprites[i]);
            canvas1.drawBottomCenter(levelSprite,4);
            canvas1.stroke(palette[2],3);
            canvases.push(canvas1);
        }
        return canvases;
    }
}
class WindTile extends Tile{
    constructor(size :number, level = 1){
        super('wind',size,level);
    }
    override getFrames(){
        var canvases : GameCanvasElement[] = [];
        var size = this.size;
        var level = this.level;
        var palette = ['#59fff6','#0faba3','#07625d','#86dad5'];
        var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,palette[2],'#000');
        var shapeTexture1 = G.shapeTexture(size,size,')',size/2,palette[1],size/8,size/2+2);
        var shapeTexture2 = G.shapeTexture(size,size,')',size/2,palette[1],size/6,size/2+2);
        var shapeTexture3 = G.shapeTexture(size,size,')',size/2,palette[1],size/5,size/2+2);
        var circle = G.MakeCircle(size*0.3,palette[1],palette[0],2);
        var fused1 = G.fuseImage(circle,shapeTexture1,'source-atop');
        var fused2 = G.fuseImage(circle,shapeTexture2,'source-atop');
        var fused3 = G.fuseImage(circle,shapeTexture3,'source-atop');
        var innerSprites = [
            fused1,
            fused2,
            fused3,
        ]
        for(let i = 0 ;i < innerSprites.length;i++){
            var canvas1 = G.makeCanvas(size,size);
            canvas1.fill(palette[3]);
            canvas1.drawCentered(innerSprites[i]);
            canvas1.drawBottomCenter(levelSprite,4);
            canvas1.stroke(palette[2],3);
            canvases.push(canvas1);
        }
        return canvases;
    }
}
class MergeTile{
    center:Point;
    item : Tile;
    constructor(center:Point,item : Tile){
        this.center = center;
        this.item = item;
    }
    type(){
        return this.item.type;
    }
    level(){
        return this.item.level;
    }
    draw(canvas : GameCanvasElement){
        canvas.drawRelative(this.item.sprite,this.center);
    }
}
class Merge1124{
    w:number;
    h:number;
    tilesize:number;
    pool:any;
    canvas :GameCanvasElement;
    config:any;
    x=0;
    y=0;
    board : MergeTile[][];
    margin : {x:number,y : number}
    constructor(w : number,h : number,tilesize : number,pool : any[]){
        this.w=w;
        this.h=h;
        this.tilesize=tilesize;
        this.pool = pool;
        this.config = {
            cols : Math.floor(this.w/this.tilesize - 2),
            rows : Math.floor(this.h/this.tilesize - 2),
        }
        var cols = this.config.cols;
        var rows = this.config.rows;
        this.margin= {
            x : Math.floor((w - tilesize * cols ) / cols),
            y : Math.floor((h - tilesize * rows ) / rows)
        }
        this.board = this.newBoard(rows,cols,this.margin.x,this.margin.y);
        this.canvas = G.makeCanvas(w,h);
    }
    update(t :number){
        this.board.flat().forEach(tile=> tile.item.update(t));
        this.canvas.clear();
        for(let i = 0 ; i < this.config.rows ;i++){
            for(let j = 0 ; j < this.config.cols ;j++){
                var tile = this.board[i][j];
                tile.draw(this.canvas);
            }
        }
    }
    newBoard(rows:number,cols:number, mx : number, my:number){
        const pickElemental = G.createPicker<Tile>(this.pool);
        var grid : any = [];
        var cx = this.tilesize/2 + mx/2;
        var cy = this.tilesize/2 + my/2;
        for(let i = 0; i < rows;i++){
            grid[i] = [];
            for(let j = 0; j < cols;j++){
                var center = new Point({x: cx,y:cy});
                var tile = pickElemental();
                var mergetile = new MergeTile(center,tile);
                grid[i][j] = mergetile;
                cx += this.tilesize + mx;
            }
            cx = cx = this.tilesize/2 + mx/2;
            cy += this.tilesize + my;
        }
        return grid;
    }
}
export default class CombatScene{
    game : Game;
    canvas : GameCanvasElement;
    config : {
        w:number,
        h:number,
        sceneheight:number,
        tilesize : number
    };
    mergebox : Merge1124 ;
    mergestart = false;
    mergeGestures = {
        mergestart : false
    };
    markedCenters:Collection;
    canvasbglayers : GameCanvasElement [] = [];
    constructor(game:Game){
        this.game = game;
        var w = game.canvasDim.w;
        var h = game.canvasDim.h;
        this.markedCenters = new Collection();
        this.canvas = G.makeCanvas(w,h);
        this.config = {
            w : w,
            h : h,
            sceneheight:300,
            tilesize : 96
        }
        var pool : any[] = [
            new ManaTile(this.config.tilesize,1),
            new WaterTile(this.config.tilesize,1),
            new FireTile(this.config.tilesize,1),
            new EarthTile(this.config.tilesize,1),
            new WindTile(this.config.tilesize,1),
        ];
        this.mergebox = new Merge1124(
            this.config.w, this.config.h - this.config.sceneheight, this.config.tilesize, pool
        )
        // document.body.innerHTML = '';
        // pool.forEach(t=>{
        //     t.frames.forEach( (f : GameCanvasElement) => document.body.append(f));
        // })
        // return;
        game.resetBody();
        var gardem = SpriteEngine.GenFlowerGarden(w,h,w);
        this.canvasbglayers.push(gardem);

        game.body.append(this.canvas);
        this.canvas.addEventListener('mousedown', () =>             this.handleStart());
        this.canvas.addEventListener('mouseup', (e: any) =>         this.handleEnd(e));
        this.canvas.addEventListener('mousemove', (e: any) =>       this.handleMove(e));
        // Touch events
        this.canvas.addEventListener('touchstart', () =>            this.handleStart());
        this.canvas.addEventListener('touchend', (e: any) =>        this.handleEnd(e));
        this.canvas.addEventListener('touchmove', (e: any) =>       this.handleMove(e));

        this.update(0);
        // document.body.append(this.mergebox.canvas);
    }
    handleStart(){
        this.mergeGestures.mergestart = true;
    }
    handleEnd(e:any){
        this.mergeGestures.mergestart = false;
        this.markedCenters = new Collection();
    }
    handleMove(e:any){
        if(!this.mergeGestures.mergestart) return;
         G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt : any)=>{
            // var pointpos = new Point(pt);
            var pointpos = G.Point({x: pt.x , y: pt.y-300 });
            var diagonaldist = (this.mergebox.margin.x + this.mergebox.margin.y) + this.config.tilesize * 1.5;
            var gridobj = this.mergebox.board.flat().find(o => o.center.distance(pointpos) < this.config.tilesize/2);
            if(gridobj != undefined){
                var NormalizedCenter = gridobj.center;
                var lastinsert = this.markedCenters.getLast();
                var beforelastinsert = this.markedCenters.getbeforeLast();
                var collectionItem = {
                    center : gridobj.center,
                    name : gridobj.item.type,
                    level : gridobj.item.level
                }
                // adding first item in the merge sequence
                if(lastinsert == null || lastinsert == undefined){
                    this.markedCenters.add(collectionItem);
                    console.log('add1',this.markedCenters);
                }
                // are we still in same tile?
                else if(NormalizedCenter.distance(lastinsert.center) == 0){
                    return;
                }
                // withdraw last item if we route back to before last
                else if(beforelastinsert != null && NormalizedCenter.distance(beforelastinsert.center) < this.config.tilesize/2){
                    this.markedCenters.removeLast();
                }
                //add new item if it fit
                else if(NormalizedCenter.distance(lastinsert.center) < diagonaldist ){
                    this.handleNewNode(collectionItem);
                }
            }
        });
    }
    getResultActionFromCollection(){
        var list = this.markedCenters.getAll();
        /* 
        m mana
        e element
        m1m1 => m2
        m1m1m1 => m4
        e1e1 => e2
        e1e1e1 => e4
        m1e1 => attack with element lvl 1 at mana 1
        m1e1e1 => attack with element lvl 2 at mana 1
        m1e1e1e1 => attack with element lvl 4 at mana 1
        */


    }
    getPresentedResultSprite(){
        var canvas = G.makeCanvas(this.config.tilesize,this.config.tilesize);
        var list = this.markedCenters.getAll();
        if(list.length < 2) return canvas;
        if(list.length == 2){
            
        }
        if(list.length >= 3){

        }
    }
    handleNewNode(newnode : any){
        var lastItem = this.markedCenters.getLast();
        var count = this.markedCenters.length();
        // allow merging same type
        if(lastItem.name == newnode.name){
            //allow merging same level or +1 of length > 2
            if(lastItem.level == newnode.level){
                this.markedCenters.add(newnode);
            }
            else if(count >=2 && lastItem.level == newnode.level+1){
                this.markedCenters.add(newnode);
            }
        }
        // if starting from mana
        if(this.markedCenters.getFirst().name == "mana"){
            this.markedCenters.add(newnode);
        }
        
    }
    update(t = 0)
    {
        this.mergebox.update(t);
        var ctx = this.canvas.ctx;

        this.canvasbglayers.forEach(layer=> ctx.drawImage(layer,0,0));
        this.canvas.ctx.drawImage(this.getMarkedLinesCanvas(),0,this.config.sceneheight);
        this.canvas.ctx.drawImage(this.mergebox.canvas,0,this.config.sceneheight);
        requestAnimationFrame((t)=> this.update(t));
    }
    getMarkedLinesCanvas(){
        const Canvas = G.makeCanvas(this.config.w, this.config.h - this.config.sceneheight);
        var ctx = Canvas.ctx;
        var markedCentersObj = this.markedCenters.getAll();
        if(markedCentersObj.length > 1){
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = this.config.tilesize/6;
            ctx.beginPath();
            ctx.moveTo(markedCentersObj[0].center.x,markedCentersObj[0].center.y);
            for(let i = 1;i < markedCentersObj.length;i++){
                ctx.lineTo(markedCentersObj[i].center.x,markedCentersObj[i].center.y);
            }
            ctx.stroke();
        }
        var cursorSprite = G.makeCanvas(this.config.tilesize + 8, this.config.tilesize + 8);
        cursorSprite.fill('gold');
        for(let i = 0;i < markedCentersObj.length;i++){
            Canvas.drawRelative(cursorSprite,markedCentersObj[i].center);
        }
        return Canvas;
    }
}
export class OldCombatScene{
    game : Game;
    canvasDim : {w:number,h:number};
    w : number;
    h : number;
    x : number;
    y : number;
    rows : number;
    cols : number;
    currentgamecanvas : GameCanvasElement;
    player : Player | null;
    mob : any;
    blocksize: number;
    ambient : any;
    endscenefct : any;
    tilesize : any;
    canvas : any;
    isClick : any;
    markedCenters : any;
    roundRectS1 : any;
    roundRectS2 : any;
    combatlogo : any;
    arrowSprite : any;
    explosionsprite : any;
    menuclickables : Clickable[];
    playercardattrib : any;
    mobcardattrib : any;
    cards : CombatCard[];
    elementals : CardElement[];
    touchPos : any;
    currentPointer : any;
    grid : any[][] = [];
    constructor(game : Game,player = null, mob = null, ambient = '' ,endscenefct : Function | null){
        game.body.innerHTML = '';
        this.game = game;
        this.canvasDim = game.canvasDim;
        this.w = this.canvasDim.w;
        this.h = this.canvasDim.h;
        this.currentgamecanvas = G.imgToCanvas(game.canvas);
        this.player = player;
        this.mob = mob;
        this.ambient = this.getAmbient(ambient);
        this.endscenefct = endscenefct;
        this.blocksize = CELLSIZE*1.85;
        this.tilesize = this.blocksize * 0.82;
        this.canvas = G.makeCanvas(this.w,this.h);
        game.body.append(this.canvas);
        this.isClick = false;
        this.markedCenters = new Collection();
        this.roundRectS1 = G.MakeRoundedRect(this.tilesize, this.tilesize, 12.5, '#fff');
        this.roundRectS2 = G.MakeRoundedRect(this.tilesize, this.tilesize, 12.5, '#8c8c8c');
        this.combatlogo = G.getEmojiSprite('⚔',CELLSIZE*3,1.3,'#fff');
        this.arrowSprite = G.getEmojiSprite('➡',this.tilesize,1.3,'#fff');
        this.explosionsprite = G.getEmojiSprite('💥',this.tilesize,1.3,'#fff');
        this.menuclickables = [
            new Clickable(0,0,CELLSIZE*1.5,CELLSIZE*1.5,G.getEmojiSprite('🚪',CELLSIZE*1.5,1.4),()=>{ endscenefct && endscenefct(this)}),
            // new Clickable(CELLSIZE*1.5,0,CELLSIZE*1.5,CELLSIZE*1.5,G.getEmojiSprite('🎒',CELLSIZE*1.5,1.4),(e)=>{this.inventory()}),
        ];
        this.playercardattrib = {
                name : 'player',
                health : 90,
                healthmax : 100,
                sprite : G.magnify(Cat.extractImage(),4),
                x : 32,
                y : this.canvas.h/5,
                w : CELLSIZE * 3,
                h : CELLSIZE * 3.5,
                color: 'gold',
                shadow:'#fff'
        };
        this.mobcardattrib = {
                name : 'target',
                health : 33,
                healthmax : 100,
                sprite : G.getEmojiSprite('🧟',CELLSIZE*2,1.3),
                x : this.canvas.w - 32 - CELLSIZE*3,
                y : this.canvas.h/5,
                w : CELLSIZE * 3,
                h : CELLSIZE * 3.5,
                color: 'gold',
                shadow:'#fff'
        }
        this.cards = [
            new CombatCard(this.playercardattrib),
            new CombatCard(this.mobcardattrib)
        ];
        this.elementals = [
            {v:'m', e:'🔮', s:this.getSprite('🔮',false), sd:this.getSprite('🔮',true) ,c:'#f00'},
            {v:'f', e:'🔥', s:this.getSprite('🔥',false), sd:this.getSprite('🔥',true) ,c:'#f00'},
            {v:'w', e:'💧', s:this.getSprite('💧',false), sd:this.getSprite('💧',true) ,c:'#00f'},
            {v:'e', e:'🌱', s:this.getSprite('🌱',false), sd:this.getSprite('🌱',true) ,c:'#0a0'},
            {v:'i', e:'🌪️', s:this.getSprite('🌪️',false), sd:this.getSprite('🌪️',true) ,c:'#aaa'},
            {v:'z', e:'⚡', s:this.getSprite('⚡',false), sd:this.getSprite('⚡',true) ,c:'#ff0'},
            {v:'l', e:'☀️', s:this.getSprite('☀️',false), sd:this.getSprite('☀️',true) ,c:'#ffb'},
            {v:'d', e:'🌑', s:this.getSprite('🌑',false), sd:this.getSprite('🌑',true) ,c:'#555'},
        ];
        this.x = 0;
        this.y = this.canvas.h/2;
        this.rows = Math.floor(this.canvas.h/this.blocksize/2);
        this.cols = Math.floor(this.canvas.w/this.blocksize);
        this.touchPos = null;
        this.canvas.addEventListener('mousedown', () => handleStart());
        this.canvas.addEventListener('mouseup', (e: any) => handleEnd(e));
        this.canvas.addEventListener('mousemove', (e: any) => handleMove(e));
        // Touch events
        this.canvas.addEventListener('touchstart', () => handleStart());
        this.canvas.addEventListener('touchend', (e: any) => handleEnd(e));
        this.canvas.addEventListener('touchmove', (e: any) => handleMove(e));
        var handleEnd = (e :any)=>{
            this.touchPos = null;
            if(this.markedCenters.objects.length > 0){
                var seq = this.markedCenters.getSequence();
                var spell = SPELLBOOK.find(x=> x.i == seq) as Spell;
                if(spell){
                    if(spell.isattack){
                            this.markedCenters.objects.forEach((x:any)=> {
                                this.grid[x.r][x.c].val = 0;
                            });
                            this.grid = this.applyGravity(this.grid,this.rows,this.cols,(go :any) => go.val == 0,(r : any,c : any) => this.getNewEntity(r,c));
                            this.resetGridCenters(this.grid);
                            this.mobcardattrib.health -= spell.dmg;
                            this.cards = [
                                new CombatCard(this.playercardattrib),
                                new CombatCard(this.mobcardattrib)
                            ];
                    }
                    else{
                        var last = this.markedCenters.getLast();
                        this.markedCenters.objects.forEach((x:any)=> {
                            this.grid[x.r][x.c].val = 0;
                        });
                        last.val = spell.r;
                        last.sprite = this.elementals.find((x:any)=> x.v == spell.r)?.s;
                        this.grid = this.applyGravity(this.grid,this.rows,this.cols,(go : any) => go.val == 0,(r = 0,c = 0) => this.getNewEntity(r,c));
                        this.resetGridCenters(this.grid);
                        this.playercardattrib.health -= 5;
                        this.cards = [
                            new CombatCard(this.playercardattrib),
                            new CombatCard(this.mobcardattrib)
                        ];
                    }
                }
            }
            this.isClick = false;
            this.markedCenters = new Collection();
            G.mapClick(e.touches ? e.touches[0] : e, this.canvas,(pt: any)=>{
                this.menuclickables.forEach( (x: any)=> {if(x.handleTouchPos) x.handleTouchPos(pt)});
            });
        }
        var handleStart = ()=>{
            this.isClick = true;
        }
        var handleMove = (e : any)=>{
            G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt : any)=>{
                var pointpos = new Point(pt);
                var gridobj = this.grid.flat().find(o => pointpos.distance(o.center) < this.blocksize/2);
                if(gridobj != undefined){
                    var NormalizedCenter = this.currentPointer = gridobj.center;
                    if(this.isClick){
                        var lastinsert = this.markedCenters.getLast();
                        var beforelastinsert = this.markedCenters.getbeforeLast();
                        if(lastinsert == null || lastinsert == undefined){
                            this.markedCenters.add(gridobj);
                        }
                        else if(beforelastinsert != null && NormalizedCenter.distance(beforelastinsert.center) < this.blocksize/2){
                            this.markedCenters.removeLast();
                        }
                        else if(NormalizedCenter.distance(lastinsert.center) < this.blocksize*1.5){
                            this.markedCenters.add(gridobj);
                        }
                    }
                }
            });
        }
        this.newBoard();
        this.update();
    }
    getAmbient(scene : string){
        var canvas = G.makeCanvas(this.w,this.h);
        if(scene == 'dungeon'){

        }
        else{
            var gardem = SpriteEngine.GenFlowerGarden(this.w,this.h,this.w);
            canvas.ctx.drawImage(gardem,0,0);
            var bigTree = G.getEmojiSprite('🌳',this.w/2,1.2);
            canvas.ctx.drawImage(bigTree,-bigTree.w/2,0);
            canvas.ctx.drawImage(bigTree,this.w-bigTree.w/2,0);
        }
        
        return G.Lightify(canvas,0.5);
    }
    applyGravity(grid : any[][],r =0 ,c = 0, checkZeroFct : any, newEntity : any, inverse  = true) : any{
        if(grid.flat().find(x=> checkZeroFct(x)) == null) return grid;
        for (let col = 0; col < c; col++) {
            const nonMoving = [];
            for (let row = 0; row < r; row++) {
                if (!checkZeroFct(grid[row][col])) {
                    nonMoving.push(grid[row][col]);
                }
            }
            if (inverse) {
                for (let row = 0; row < r; row++) {
                    grid[row][col] = row >= r - nonMoving.length 
                        ? nonMoving[row - (r - nonMoving.length)] 
                        : newEntity(row, col);
                }
            } else {
                for (let row = 0; row < r; row++) {
                    grid[row][col] = row < nonMoving.length ? nonMoving[row] : newEntity(row, col);
                }
            }
        }
        return this.applyGravity(grid,r,c, checkZeroFct, newEntity, inverse);
    }
    resetGridCenters(grid : any[][]){
        for(let i = 0 ; i < grid.length ; i++){
            for(let j = 0 ; j < grid[i].length ; j++){
                var cx = this.x + j * this.blocksize + this.blocksize/2;
                var cy = this.y + i * this.blocksize + this.blocksize/2;
                var center = new Point({x: cx,y:cy});
                grid[i][j].center = center;
                grid[i][j].r = i;
                grid[i][j].c = j;
            }
        }
    }
    getNewEntity(r = 0,c = 0){
        var cx = this.x + r * this.blocksize + this.blocksize/2;
        var cy = this.y + c * this.blocksize + this.blocksize/2;
        var center = new Point({x: cx,y:cy});
        var randomval = this.elementals[G.randInt(0,this.elementals.length)]
        return {
            center : center,
            val : randomval.v,
            sprite: randomval.s
        };
    }
    getGussingWordSprite(){
        var sequence = this.markedCenters.getSequence();
        var w = this.tilesize;
        var h = this.tilesize;
        if(sequence == ' '){
            return G.makeCanvas();
        }
        var sprites : any= {}; 
        this.elementals.forEach(x=> sprites[x.v] = x.s);
        var spell = SPELLBOOK.find(x=> x.i == sequence);
        if(spell){
            var canvas = G.makeCanvas(sequence.length * w + w*2,h);
            canvas.fill('green');
            var cx = 0;
            for(let i = 0; i < sequence.length; i++){
                var c = sequence[i];
                if(sprites[c]){
                    canvas.ctx.drawImage(sprites[c],cx,0);    
                }
                cx += w;
            }
            if(spell.dmg){
                canvas.ctx.drawImage(this.arrowSprite,cx,0);cx += w;
                var s2 = G.fuseImage(this.explosionsprite,sprites[spell.r],'source-atop');
                canvas.ctx.drawImage(s2,cx,0);cx += w;
            }
            else{
                canvas.ctx.drawImage(this.arrowSprite,cx,0);cx += w;
                canvas.ctx.drawImage(sprites[spell.r],cx,0);cx += w;
            }
            return canvas;
        }
        else{
            var canvas = G.makeCanvas(sequence.length * w,h);
            canvas.fill('red');
            var cx = 0;
            for(let i = 0; i < sequence.length; i++){
                var c = sequence[i];
                if(sprites[c]){
                    canvas.ctx.drawImage(sprites[c],cx,0);    
                }
                cx += w;
            }
            return canvas;
        }
    }
    getSprite(v = ' ',light = false){
        var emojisprt = G.getEmojiSprite(v,this.tilesize,1.3);
        if(light){
            return G.fuseImage(this.roundRectS1,emojisprt);
        }
        else{
            return G.fuseImage(this.roundRectS2,emojisprt);
        }
    }
    update(){
        if(this.mobcardattrib.health <= 0){
            this.endscenefct(this);
            return;
        }
        var ctx = this.canvas.ctx;
        this.canvas.fill('#000');
        ctx.drawImage(this.ambient,0,0);
        ctx.fillStyle = '#fff';
        ctx.drawImage(this.combatlogo,this.canvas.w/2-this.combatlogo.w/2,this.canvas.h/5 - this.combatlogo.h);
        var markedCentersObj = this.markedCenters.getAll();
        if(markedCentersObj.length > 1){
            var ts1 = this.getGussingWordSprite();
            ctx.drawImage(ts1,
                this.x + this.w/2 - ts1.w/2,
                this.y-this.blocksize
            );
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = this.blocksize/6;
            ctx.beginPath();
            ctx.moveTo(markedCentersObj[0].center.x,markedCentersObj[0].center.y);
            for(let i = 1;i < markedCentersObj.length;i++){
                ctx.lineTo(markedCentersObj[i].center.x,markedCentersObj[i].center.y);
            }
            ctx.stroke();
        }
        for(let i = 0 ; i < this.rows ;i++){
            for(let j = 0 ; j < this.cols ;j++){
                var gobj = this.grid[i][j];
                var light = false;
                if(((i % 2 == 0 || j %2 == 0) && !(i % 2 == 0 && j %2 == 0) )){
                    light = true;
                }
                var elem = this.elementals.find(x=>x.v == gobj.val);
                if(elem){
                    var sprite = light ? elem.sd : elem.s;
                    var cx = gobj.center.x - sprite.w/2;
                    var cy = gobj.center.y - sprite.h/2;
                    ctx.drawImage(sprite,cx,cy);
                }
            }
        }
        this.cards.forEach(x=> x.draw(ctx));
        this.menuclickables.forEach(x=> x.draw(this.canvas.ctx));
        requestAnimationFrame(()=>this.update());
    }
    newBoard(){
        this.currentPointer = {x:-Infinity,y:-Infinity};
        this.markedCenters = new Collection();
        var grid : any = [];
        for(let i = 0; i < this.rows;i++){
            grid[i] = [];
            for(let j = 0; j < this.cols;j++){
                var cx = this.x + j * this.blocksize + this.blocksize/2;
                var cy = this.y + i * this.blocksize + this.blocksize/2;
                var center = new Point({x: cx,y:cy});
                var randomval = this.elementals[G.randInt(0,this.elementals.length)]
                grid[i][j] = {
                    r:i,
                    c:j,
                    center : center,
                    val : randomval.v,
                    sprite: randomval.s
                };
            }
        }
        this.grid = grid;
    }
}