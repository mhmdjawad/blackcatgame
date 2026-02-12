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
import U8Matrix from "../util/U8Matrix";
import PackedImage8 from "../util/PackedImage8";
import PackedImage4 from "../util/PackedImage4";
import ColorHelper from "./ColorHelper";

const wind =  {"w":32,"h":32,"palette":[null,"#5fcde4","#0b6e82"],"data":[41,0,1,5,1,86,1,165,1,106,1,148,2,0,1,85,1,90,1,85,1,169,1,90,1,165,1,64,2,0,1,170,1,85,1,106,1,86,1,169,1,84,2,0,1,6,1,149,1,90,1,149,1,170,1,85,1,0,1,5,1,90,1,165,1,86,1,165,1,106,1,149,1,64,1,2,1,170,1,169,1,85,1,169,1,90,1,165,1,64,1,0,1,2,1,170,1,85,1,106,1,86,1,169,1,80,1,0,1,170,1,90,1,149,1,90,1,149,1,169,1,80,1,0,1,170,1,86,1,165,1,90,1,149,1,169,1,84,1,0,1,2,1,149,1,165,1,90,1,165,1,170,1,84,1,37,1,90,1,169,1,165,1,90,1,165,1,170,1,84,1,42,2,170,1,165,1,90,1,165,1,170,1,84,1,0,1,42,1,170,1,165,1,90,1,165,1,170,1,84,1,0,1,5,1,170,1,165,1,90,1,165,1,170,1,84,1,0,1,5,1,85,1,165,1,90,1,165,1,169,1,80,1,5,1,90,1,85,1,149,1,90,1,150,1,169,1,80,1,22,1,170,1,150,1,85,1,106,1,154,1,165,1,64,1,0,1,2,1,169,1,85,1,170,1,106,1,149,1,64,2,0,1,165,1,86,1,169,1,170,1,85,3,0,1,149,1,90,1,166,1,169,1,84,1,0,1,5,1,90,1,149,1,106,1,154,1,165,1,64,1,0,1,90,1,170,1,149,1,170,1,106,1,148,42,0]};
const earth = {"w":32,"h":32,"palette":[null,"#e18324","#351d05","#8e4d0a"],"data":[35,0,1,85,1,64,5,0,1,1,2,85,1,64,4,0,1,5,1,89,1,101,1,80,4,0,1,21,1,106,1,189,1,87,4,0,1,23,1,250,1,255,1,85,1,192,3,0,1,95,1,254,1,190,1,149,1,240,2,0,1,5,1,87,1,246,1,106,1,149,1,252,2,0,1,21,1,90,2,154,1,151,1,236,2,0,1,85,1,102,1,106,1,86,1,119,1,171,1,0,1,3,1,213,1,169,1,89,1,106,1,213,1,175,1,192,1,15,1,254,1,165,1,86,1,170,1,213,1,175,1,192,1,15,1,255,1,150,1,90,1,175,1,149,1,235,1,192,1,15,1,255,1,218,1,150,1,190,2,167,1,128,1,3,1,255,1,246,1,111,1,255,1,186,1,149,1,128,1,15,1,239,1,214,1,171,1,234,1,190,1,213,1,128,1,15,1,255,2,170,1,171,1,175,1,213,1,160,1,15,1,222,1,186,1,170,1,175,1,255,1,166,1,160,1,15,1,245,1,254,1,250,1,191,1,222,1,170,1,160,1,7,1,253,1,189,1,254,1,255,1,86,1,170,1,160,1,3,1,254,1,165,1,87,1,253,1,90,1,170,1,128,1,3,1,250,1,189,1,85,1,239,1,106,1,170,2,0,1,214,1,175,1,86,1,171,1,170,1,168,2,0,1,21,1,171,1,186,2,170,1,160,2,0,1,5,4,170,4,0,1,34,2,170,1,168,5,0,1,42,1,170,1,160,5,0,1,2,1,170,1,128,10,0]};
const water = {"w":32,"h":32,"palette":[null,"#1c46e1","#082694","#04103b"],"data":[11,0,1,85,1,170,5,0,1,5,1,106,1,171,1,240,4,0,1,86,1,170,1,175,1,255,3,0,1,1,1,106,1,170,1,255,1,245,1,128,2,0,1,10,1,170,1,191,1,255,1,214,1,160,2,0,1,42,1,170,2,255,1,90,1,188,2,0,1,170,1,191,1,255,1,253,1,107,1,255,1,0,1,2,1,175,2,255,1,213,1,175,1,255,1,64,1,3,2,255,1,245,1,86,1,255,1,253,1,128,1,15,2,255,1,213,1,107,1,255,1,246,1,240,1,15,1,255,1,245,1,86,1,191,1,255,1,91,1,240,1,63,1,253,1,85,1,170,1,255,1,253,1,111,1,252,1,63,1,85,1,106,1,191,1,255,1,213,1,191,1,244,1,21,1,170,1,171,2,255,1,87,1,255,1,212,1,22,1,170,1,191,1,255,1,245,1,95,1,255,1,84,1,42,1,171,2,255,1,213,1,191,1,253,1,88,1,42,1,191,1,255,1,245,1,86,1,255,1,245,1,104,1,42,2,255,1,85,1,191,1,255,1,86,1,168,1,43,1,255,1,245,1,95,1,255,1,253,1,90,1,168,1,15,1,255,1,85,1,191,1,255,1,245,1,106,1,160,1,15,1,245,1,171,2,255,1,213,1,170,1,160,1,3,1,214,1,175,1,255,1,245,1,86,1,170,1,64,1,3,1,106,1,191,1,253,1,85,1,90,1,169,1,64,1,0,1,171,1,255,1,245,1,90,1,170,1,165,2,0,1,47,1,255,1,85,1,106,1,170,1,148,2,0,1,15,1,253,1,86,2,170,1,80,2,0,1,3,1,245,2,170,1,169,1,64,3,0,1,90,1,170,1,169,1,85,4,0,1,10,1,170,1,165,1,80,5,0,1,170,1,85,11,0]};
const fire = {"w":32,"h":32,"palette":[null,"#a60c0c","#f3d015","#e18324"],"data":[37,0,1,65,4,0,1,16,1,128,1,0,1,80,1,64,3,0,1,18,1,48,1,192,1,52,1,16,2,0,2,2,1,60,1,192,1,181,1,20,2,0,1,10,1,16,2,204,1,157,1,5,2,0,1,27,1,4,1,138,1,140,1,173,1,5,1,128,1,48,1,83,1,241,1,138,1,144,1,231,1,5,1,128,1,48,1,24,1,49,1,162,1,80,1,235,1,17,1,96,1,50,1,28,1,29,1,162,1,80,1,249,1,193,1,104,1,13,1,28,1,45,1,99,1,80,1,253,1,193,1,104,1,13,1,28,1,29,1,99,1,212,1,253,1,197,1,124,1,13,1,35,1,204,1,115,1,86,1,245,1,117,1,124,1,13,1,47,1,205,1,115,1,86,1,213,1,21,1,244,1,5,1,47,1,29,1,99,1,214,1,229,1,39,1,212,1,5,1,239,1,221,1,99,1,214,1,181,1,41,1,212,1,53,1,111,1,237,1,111,1,214,1,181,1,165,1,84,1,53,1,107,1,93,1,107,1,246,1,159,1,149,1,84,1,61,1,90,1,157,1,171,1,250,1,106,1,119,1,84,1,5,1,87,1,149,1,155,1,245,1,169,1,253,1,80,1,5,1,95,1,213,1,165,1,253,1,169,1,253,1,80,1,1,1,95,1,246,1,165,1,253,1,171,1,245,1,64,1,0,1,23,1,245,1,169,1,117,1,111,1,212,2,0,1,5,1,255,1,103,1,85,1,127,1,80,2,0,1,1,1,127,1,213,1,85,1,93,1,64,3,0,1,95,3,85,4,0,1,5,2,85,1,80,5,0,2,85,11,0]};
const mana = {"w":32,"h":32,"palette":[null,"#16042f","#b682ff","#4a1594"],"data":[11,0,2,85,5,0,1,5,2,170,1,80,4,0,1,90,1,191,1,254,1,165,3,0,1,1,1,175,2,255,1,250,1,64,2,0,1,6,1,191,1,192,1,3,1,254,1,144,2,0,1,27,1,252,1,4,1,0,1,63,1,228,2,0,1,111,1,192,1,21,1,4,1,3,1,249,1,0,1,1,1,175,1,16,1,4,1,21,1,0,1,250,1,64,1,1,1,188,1,84,1,32,1,4,1,8,1,62,1,64,1,6,1,252,1,16,1,168,1,0,1,42,1,63,1,144,1,6,1,240,1,0,1,32,1,192,1,8,1,15,1,144,1,26,1,240,1,192,1,3,1,240,1,0,1,207,1,164,1,27,1,195,1,240,1,128,1,192,1,67,1,243,1,228,1,27,1,192,1,194,1,160,1,1,1,80,1,195,1,228,1,27,1,192,1,0,1,128,2,64,1,3,1,228,1,27,1,194,1,0,1,1,1,80,1,0,1,67,1,228,1,27,1,202,1,128,1,192,1,64,1,193,1,83,1,228,1,27,1,194,1,3,1,240,1,3,1,240,1,67,1,228,1,26,1,240,1,0,1,192,1,128,1,192,1,15,1,164,1,6,1,240,1,16,1,2,1,160,1,0,1,15,1,144,1,6,1,252,1,84,1,0,1,128,1,16,1,63,1,144,1,1,1,188,1,16,1,64,1,0,1,84,1,62,1,64,1,1,1,175,1,1,1,80,2,16,1,250,1,64,1,0,1,111,1,192,1,64,1,84,1,3,1,249,2,0,1,27,1,252,1,0,1,16,1,63,1,228,2,0,1,6,1,191,1,192,1,3,1,254,1,144,2,0,1,1,1,175,2,255,1,250,1,64,3,0,1,90,1,191,1,254,1,165,4,0,1,5,2,170,1,80,5,0,2,85,11,0]};

class ClipboardImageHandler{
    static handlePaste(){
        document.addEventListener("paste", async (e : ClipboardEvent) => {
            const items = e.clipboardData?.items ?? [];
            for (const item of items) {
                if (item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    if(file){
                        const img = new Image();
                        img.onload = () => {
                            var canvas = G.imgToCanvas(img);
                            var palette = new Set();
                            G.getColorMatrix(canvas,(r:any)=>{ 
                                if(r == '#ffffff') r = null; // make as png white transparent
                                palette.add(r)
                            });
                            var reduced = ColorHelper.reducePalette(Array.from(palette),3,10);
                            // reduced = [null,"#d9a066","#663931","#000000"];
                            var matreduced = G.getColorMatrix(canvas,(r:any)=>{ 
                                if(r == '#ffffff') r = null;
                                var nearest = ColorHelper.mapColorToNearest(r,reduced);
                                // return nearest;
                                if(nearest == reduced[0]) return 0;
                                if(nearest == reduced[1]) return 1;
                                if(nearest == reduced[2]) return 2;
                                if(nearest == reduced[3]) return 3;
                            });

                            var encodedpack4 = PackedImage4.encode(reduced,matreduced);
                            console.log('p4',PackedImage4.printable(encodedpack4));
                            var decode = PackedImage4.decodeObj(encodedpack4);
                            var matreducesassprite = G.colorsMatrixToSprite(decode,3,(r:any)=>r);
                            console.log(palette);
                            console.log(reduced);

                            document.body.append(canvas);
                            document.body.append(matreducesassprite);
                        }
                        img.src = URL.createObjectURL(file);
                    }
                    
                }
            }

        });
    }
}
class Tile{
    sprite : GameCanvasElement;
    type:string;
    ods:number;
    level : number;
    size : number;
    time=0;
    constructor(type : string, size:number, level : number){
        this.type = type;
        this.level = level;
        this.size = size;
        this.sprite = this.getSprite(type,size,level);
        this.ods = this.getTileOds(type);
    }
    getTileOds(type:string){
        switch(type){
            case "mana" : return 30;
            case "fire" : case "water" : return 10;
            case "earth" : case "wind" : return 6;
            default : return 1;
        }
    }
    getSprite(type:string,size:number,level:number){
        var canvas = G.makeCanvas(size,size);
        var object = mana;
        if(type == "mana") object = mana;
        else if(type == "water") object = water;
        else if(type == "fire") object = fire;
        else if(type == "wind") object = wind;
        else if(type == "earth") object = earth;
        var decoded = PackedImage4.decodeObj(object);
        var innersprite = G.colorsMatrixToSprite(decoded,1,(r:any)=>{return r});
        var color = ColorHelper.darken(object.palette[1]??"#ffffff",2);
        var color2 = ColorHelper.darken(object.palette[1]??"#ffffff",5);
        var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,'#fff','#000');
        canvas.fill(color);
        canvas.ctx.drawImage(innersprite,4,4,canvas.w - 8,canvas.h - 8);
        canvas.drawBottomCenter(levelSprite,4);
        canvas.stroke(color2,4);
        return canvas;
    }
    update(t=0){
        var delta = t - this.time;
        if(delta > 1000){
            this.time = t;
        }
    }
}
class MergeTile{
    center:Point;
    item : Tile;
    loc:{r:number,c:number}
    v:string;
    constructor(center:Point,item : Tile,loc : {r:number,c:number}){
        this.center = center;
        this.item = item;
        this.loc = loc;
        this.v = item.type[0];
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
    pickElemental:()=> Tile;
    constructor(w : number,h : number,tilesize : number,pool : any[]){
        this.w=w;
        this.h=h;
        this.tilesize=tilesize;
        this.pool = pool;
        this.pickElemental = G.createPicker<Tile>(this.pool);
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
        var grid : any = [];
        const stepX = this.tilesize + this.margin.x;
        const stepY = this.tilesize + this.margin.y;
        const startX = this.tilesize / 2 + this.margin.x / 2;
        const startY = this.tilesize / 2 + this.margin.y / 2;

        for(let i = 0; i < rows;i++){
            grid[i] = [];
            for(let j = 0; j < cols;j++){
                var center = new Point({x: startX + j * stepX,y:startY + i * stepY});
                var tile = this.pickElemental();
                var mergetile = new MergeTile(center,tile,{r:i,c:j});
                grid[i][j] = mergetile;
            }
        }
        return grid;
    }
    updateTile(mt : any,level : number){
        var newTile = new Tile(mt.name,this.tilesize,level);
        var r = mt.loc.r;
        var c = mt.loc.c;
        this.board[r][c] = this.getNewEntity(r,c,newTile);
    }
    checkZeroFct(r:number,c:number){

    }
    resetTiles(centers : MergeTile[]){
        centers.forEach((x:any)=> {
            this.board[x.loc.r][x.loc.c].v = ' ';
        });
        this.board = this.applyGravity(this.board,this.config.rows,this.config.cols,
            (go : any) => go.v == ' ',(r = 0,c = 0) => this.getNewEntity(r,c));
        this.resetGridCenters(this.board);
    }
    resetGridCenters(grid:any[][]){
        const stepX = this.tilesize + this.margin.x;
        const stepY = this.tilesize + this.margin.y;
        const startX = this.tilesize / 2 + this.margin.x / 2;
        const startY = this.tilesize / 2 + this.margin.y / 2;
        for(let i = 0 ; i < grid.length ; i++){
            for(let j = 0 ; j < grid[i].length ; j++){
                var center = new Point({x: startX + j * stepX,y:startY + i * stepY});
                grid[i][j].center = center;
                grid[i][j].loc = {r:i,c:j};
            }
        }
    }
    getPt(r = 0 , c = 0){
        const stepX = this.tilesize + this.margin.x;
        const stepY = this.tilesize + this.margin.y;
        const startX = this.tilesize / 2 + this.margin.x / 2;
        const startY = this.tilesize / 2 + this.margin.y / 2;
        const x = startX + c * stepX;
        const y = startY + r * stepY;
        return new Point({ x, y });
    }
    getNewEntity(r = 0 , c = 0, _tile : Tile | null = null){
        var tile = _tile ?? this.pickElemental();
        return new MergeTile(this.getPt(r,c),tile,{r:r,c:c});
    }
    applyGravity(grid : MergeTile[][],r =0 ,c = 0, checkZeroFct : any, newEntity : any, inverse  = true) : any{
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
}
class AfterEffect{
    center:Point;
    constructor(center:Point){
        this.center = center;
    }
}
class ElementAttck{
    sprite:GameCanvasElement;
    attackpwr:GameCanvasElement;
    center:Point;
    speed:number;
    level:number;
    life:number;
    constructor(type : string,level : number,center:Point){
        this.sprite = this.getSprite(type);
        this.attackpwr = PixelFontE.getLine(`${level}`,1,'blue');
        this.center = G.Point(center);
        this.level = level;
        this.speed = Math.max(this.level,4);
        this.life = 64 + this.level * 8;
    }
    getSprite(type:string){
        var object = mana;
        if(type == "mana") object = mana;
        else if(type == "water") object = water;
        else if(type == "fire") object = fire;
        else if(type == "wind") object = wind;
        else if(type == "earth") object = earth;
        var decoded = PackedImage4.decodeObj(object);
        var innersprite = G.colorsMatrixToSprite(decoded,1,(r:any)=>{return r});
        return innersprite;
    }
    update(t=0){
        // this.life -= 1;
        this.center.x += this.speed;

    }
    updateAndAttack(t=0,scene:CombatScene){
        scene.enemies.forEach(en=>{
            if(en.center.distance(this.center) <= CELLSIZE/2){
                en.life -= this.level;
                if(en.life <= 0){
                    scene.wave += 1;
                }
                this.life = 0;
                return;
            }
        })
        // this.life -= 1;
        this.center.x += this.speed;
        if(this.center.x > scene.game.canvasDim.w){
            this.life = 0;
        }
    }
    draw(canvas:GameCanvasElement){
        canvas.drawRelative(this.sprite,this.center);
        canvas.drawRelative(this.attackpwr,this.center);
    }
}
class Enemy{
    sprite : GameCanvasElement;
    center:Point;
    speed:number;
    life : number;
    constructor(center:Point,life = 10){
        this.center = center;
        this.speed = 1/3;
        this.life  = life;
        this.sprite = this.getSprite();
    }
    getSprite(){
        return G.getEmojiSprite('🧟',CELLSIZE*2,1.3)
    }
    draw(canvas:GameCanvasElement){
        canvas.drawRelative(this.sprite,this.center);
        canvas.drawRelative(PixelFontE.getLine(`${this.life}`,2,'red'),G.Point(
            {
                x:this.center.x,
                y:this.center.y - this.sprite.h/2 + 16
            }
        ))
    }
    updateAndAttack(t = 0 , scene : CombatScene){
        if(this.center.x > scene.catLoc.x){
            this.center.x -= this.speed;
        }
        else{
            scene.gameover();
        }
    }
    update(t = 0){
        if(this.center.x > CELLSIZE){
            this.center.x -= this.speed;
        }
        else{
            //attack player
        }
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
    cat : Cat;
    catLoc : Point;
    attacks : ElementAttck[];
    enemies : Enemy[];
    isgameover:boolean = false;
    wave :number = 1;
    constructor(game:Game){
        this.game = game;
        this.attacks = [];
        this.enemies = [];
        var w = game.canvasDim.w;
        var h = game.canvasDim.h;
        this.markedCenters = new Collection();
        this.canvas = G.makeCanvas(w,h);
        this.cat = new Cat();
        
        this.config = {
            w : w,
            h : h,
            sceneheight:400,
            tilesize : 96
        }
        var pool : any[] = [
            new Tile("mana",this.config.tilesize,1),
            new Tile("water",this.config.tilesize,1),
            new Tile("fire",this.config.tilesize,1),
            new Tile("earth",this.config.tilesize,1),
            new Tile("wind",this.config.tilesize,1),
        ];
        this.mergebox = new Merge1124(
            this.config.w, this.config.h - this.config.sceneheight, this.config.tilesize, pool
        )
        this.catLoc=G.Point({x:this.config.tilesize,y:this.config.sceneheight - 32})
        // ClipboardImageHandler.handlePaste();
        // Tile.GetSprites();
        // return;
        game.resetBody();
        var gardem = SpriteEngine.GenFlowerGarden(w,h,w);
        var dirtpath = SpriteEngine.GenDirtTile(w,this.config.tilesize*1.2);
        gardem.ctx.drawImage(dirtpath,0,this.config.sceneheight - this.config.tilesize*1.2);
        this.canvasbglayers.push(gardem);
        game.body.append(this.canvas);
        this.canvas.addEventListener('mousedown', (e:any) =>             this.handleStart(e));
        this.canvas.addEventListener('mouseup', (e: any) =>         this.handleEnd(e));
        this.canvas.addEventListener('mousemove', (e: any) =>       this.handleMove(e));
        // Touch events
        this.canvas.addEventListener('touchstart', (e:any) =>            this.handleStart(e));
        this.canvas.addEventListener('touchend', (e: any) =>        this.handleEnd(e));
        this.canvas.addEventListener('touchmove', (e: any) =>       this.handleMove(e));

        this.update(0);
        // document.body.append(this.mergebox.canvas);
    }
    gameover(){
        this.isgameover = true;
        var gameover = PixelFontE.getLineShadowed('GAME OVER',8,'red','white');
        var canvas2 = G.imgToCanvas(this.canvas);
        for(let i = 0 ; i < canvas2.h/100 ; i++){
            canvas2.ctx.drawImage(gameover,canvas2.w/2 - gameover.w/2,i*100);
        }
        this.game.body.innerHTML = '';;
        this.game.body.append(canvas2);
        canvas2.addEventListener('click',(e)=>{
            (window as any).scene = new CombatScene(this.game); 
        })
    }
    handleStart(e:any){
        this.mergeGestures.mergestart = true;
        this.handleMove(e);
    }
    handleEnd(e:any){
        var result = this.getResultActionFromCollection();
        this.mergeGestures.mergestart = false;
        this.markedCenters = new Collection();
    }
    handleMove(e:any){
        if(!this.mergeGestures.mergestart) return;
         G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt : any)=>{
            // var pointpos = new Point(pt);
            var pointpos = G.Point({x: pt.x , y: pt.y-this.config.sceneheight });
            var diagonaldist = (this.mergebox.margin.x + this.mergebox.margin.y) + this.config.tilesize * 1.5;
            var gridobj = this.mergebox.board.flat().find(o => o.center.distance(pointpos) < this.config.tilesize/2);
            if(gridobj != undefined){
                var NormalizedCenter = gridobj.center;
                var lastinsert = this.markedCenters.getLast();
                var beforelastinsert = this.markedCenters.getbeforeLast();
                var collectionItem = {
                    center : gridobj.center,
                    name : gridobj.item.type,
                    level : gridobj.item.level,
                    loc : gridobj.loc,
                }
                // adding first item in the merge sequence
                if(lastinsert == null || lastinsert == undefined){
                    this.markedCenters.add(collectionItem);
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
                this.getPresentedResultSprite();
            }
        });
    }
    getResultActionFromCollection(){
        var list = this.markedCenters.getAll();
        if(list.length < 2) return null;
        var outset = new Set(list.map(x=> x.name));
        var levels = list.map(x=> x.level);
        if(outset.size == 1){
            var beforePrev = 0;
            var prevLevel = levels[0];
            var result = levels[0];
            for(let i = 1 ; i < levels.length;i++){
                var current = levels[i];
                if(current == prevLevel){
                    if(current == beforePrev){
                        result += 2;
                    }
                    else{
                        result += 1;
                    }
                }
                else if(i > 3){
                    result += 1;
                }
                beforePrev = prevLevel;
                prevLevel = current;
            }
            //add new tile and reset other ones
            this.addTile(result);
            return "new";
        }
        else if(outset.size == 2){
            var result = list.map(x=> x.level).reduce((a,b,c)=>{return a+b});
            this.addAttack(result);
            return "attack";
        }
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
    addTile(level = 1){
        var last = this.markedCenters.objects.pop();
        this.mergebox.updateTile(last,level);
        this.mergebox.resetTiles(this.markedCenters.objects);
    }
    addAttack(level:number){
        var type = this.markedCenters.getLast().name;
        this.mergebox.resetTiles(this.markedCenters.objects);
        this.attacks.push(
            new ElementAttck(type,level,G.Point({
                x: this.catLoc.x,
                y: this.catLoc.y
            }
            ))
        )
    }
    getPresentedResultSprite(){
        var canvas = G.makeCanvas(this.config.tilesize,this.config.tilesize);
        var list = this.markedCenters.getAll();
        if(list.length < 2) return canvas;

        var out = list.map(x=> x.name[0]).join('');
        var levels = list.map(x=> x.level);
        //handle first 2-3 alone
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
        else if(lastItem.name == "mana"){
            this.markedCenters.add(newnode);
        }
        
    }
    update(t = 0)
    {
        if(this.isgameover)return;
        if(this.enemies.length == 0){
            this.enemies.push(
                new Enemy(G.Point({
                    x: this.game.canvasDim.w,
                    y: this.catLoc.y - 16
                }),this.wave*3)
            )
        }
        this.attacks.forEach(at=>at.updateAndAttack(t,this));
        this.enemies.forEach(at=>at.updateAndAttack(t,this));
        this.attacks = this.attacks.filter(x=>x.life > 0);
        this.enemies = this.enemies.filter(x=>x.life > 0);
        this.mergebox.update(t);
        var ctx = this.canvas.ctx;
        this.canvasbglayers.forEach(layer=> ctx.drawImage(layer,0,0));
        this.canvas.drawRelative(this.cat.sprite2x,this.catLoc)
        this.attacks.forEach(at=>at.draw(this.canvas));
        this.enemies.forEach(at=>at.draw(this.canvas));
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
ClipboardImageHandler.handlePaste();