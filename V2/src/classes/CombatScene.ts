import Game from "../game/game";
import { GameCanvasElement } from "./interface";
import Player from "./Player";
import { CELLSIZE } from "../util/const";
import G from "../util/G";
import Collection from "./Collection";
import Point from "./Point";
import SpriteEngine from "../util/SpriteEngine";
import Cat from "./Cat";
import PixelFontE from "../util/PixelFontE";
import PackedImage4 from "../util/PackedImage4";
import ClipboardImageHandler from "../util/ClipboardImageHandler";
import { sprite_earth, sprite_fire, sprite_mana, sprite_water, sprite_wind } from "../storage/sprites";
import Tile from "../entity/Tile";
import MergeCalculator from "../util/MergeCalculator";
import Enemy from "../entity/Enemy";
import Slime from "../entity/slime";
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
        this.speed = 8;
        this.life = 64 + this.level * 8;
    }
    getSprite(type:string){
        var object = sprite_mana;
        if(type == "mana") return this.getManaSprite();
        else if(type == "water") object = sprite_water;
        else if(type == "fire") object = sprite_fire;
        else if(type == "wind") object = sprite_wind;
        else if(type == "earth") object = sprite_earth;
        var decoded = PackedImage4.decodeObj(object);
        var innersprite = G.colorsMatrixToSprite(decoded,2,(r:any)=>{return r});
        return innersprite;
    }
    getManaSprite(){
        var decoded = PackedImage4.decodeObj(sprite_mana);
        var innersprite = G.colorsMatrixToSprite(decoded,1,(r:any)=>{return r});
        return innersprite;
    }
    update(t=0){
        // this.life -= 1;
        this.center.x += this.speed;

    }
    updateAndAttack(t=0,scene:CombatScene){
        scene.wave.enemies.forEach(en=>{
            if(en.center.distance(this.center) <= CELLSIZE/2){
                if(this.level > en.life){
                    en.life = 0;
                    this.level -= en.life;
                }
                else{
                    en.life -= this.level;
                    this.life = 0;
                    return;
                }
            }
        })
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
class EnemyWave{
    center : Point;
    difficulity : number;
    progress : number;
    enemies : Enemy[];
    countSpawned : number = 0;
    countToSpawn : number = 5;
    spawnInterval : number = 6000;
    spawnTimer : number = 0;
    time:number = 0;
    constructor(center : Point,difficulity : number ){
        this.center = center;
        this.difficulity = difficulity;
        this.countToSpawn = 5 + difficulity * 2;
        this.spawnInterval = 10000 - difficulity * 500;
        this.spawnInterval = Math.max(this.spawnInterval,3000);
        this.progress = 0;
        this.enemies = [];
        this.spawnEnemy(this.spawnInterval);
    }
    nextWave(center : Point,difficulity : number){
        this.center = center;
        this.difficulity = difficulity;
        this.countToSpawn = 5 + difficulity * 2;
        this.spawnInterval = 10000 - difficulity * 500;
        this.spawnInterval = Math.max(this.spawnInterval,3000);
        this.progress = 0;
        this.enemies = [];
        this.spawnEnemy(this.spawnInterval);
    }
    spawnEnemy(t : number){
        var delta = t - this.time;
        if(this.enemies.length == 0) delta = this.spawnInterval;
        if(delta > this.spawnInterval ) return;
        for(let i = 0 ; i < 2 + this.difficulity ; i++){
            var enemy = new Slime(G.Point({
                x: this.center.x + CELLSIZE/2,
                y: this.center.y
            }),this.difficulity);
            this.enemies.push(enemy);
            this.countSpawned += 1;
            if(this.countSpawned >= this.countToSpawn) break;
        }
        this.time = t;
    }
    update(t : number = 0, scene : CombatScene){
        if(this.countSpawned < this.countToSpawn){
            this.spawnEnemy(t);
        }
        else if(this.enemies.length == 0){
            console.log("next wave");
            this.nextWave(this.center,this.difficulity + 1);
        }
        this.enemies.forEach(at=>at.updateAndAttack(t,scene));
        this.enemies = this.enemies.filter(x=>x.life > 0);
    }
    draw(canvas : GameCanvasElement){
        this.enemies.forEach(at=>at.draw(canvas));
    }
}
export default class CombatScene{
    game : Game;
    canvas : GameCanvasElement;
    resultSprite : GameCanvasElement;
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
    isgameover:boolean = false;
    player:Player;
    wave : EnemyWave;
    constructor(game:Game){
        this.game = game;
        this.attacks = [];
        var w = game.canvasDim.w;
        var h = game.canvasDim.h;
        this.markedCenters = new Collection();
        this.canvas = G.makeCanvas(w,h);
        this.player = game.getPlayer();

        this.cat = new Cat();
        this.config = {
            w : w,
            h : h,
            sceneheight:400,
            tilesize : 96
        }
        this.resultSprite = G.makeCanvas(this.config.tilesize,this.config.tilesize);
        var pool : any[] = [
            new Tile("mana",this.config.tilesize,0),
            new Tile("water",this.config.tilesize,0),
            new Tile("fire",this.config.tilesize,0),
            new Tile("earth",this.config.tilesize,0),
            new Tile("wind",this.config.tilesize,0),
        ];
        this.mergebox = new Merge1124(
            this.config.w, this.config.h - this.config.sceneheight, this.config.tilesize, pool
        )
        this.catLoc = G.Point({x:32, y:this.config.sceneheight - 32})
        this.wave = new EnemyWave(G.Point({
            x: this.config.w - 64,
            y: this.config.sceneheight - 32
        }),1);
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
        this.resultSprite = G.makeCanvas(this.config.tilesize,this.config.tilesize);
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
        var typelast = this.markedCenters.getLast()?.name;
        if(typelast == "mana"){
            this.player.AddMana(list.length);
            this.attacks.push(
                new ElementAttck(typelast,Math.floor(MergeCalculator.calculateGain(list.length)/2),G.Point({
                    x: this.catLoc.x,
                    y: this.catLoc.y
                }
                ))
            )
        }
        else if(typelast == "heart"){
            this.player.AddHealth(list.length);
        }
        else{
            if(this.player.CanUseMana(list.length)){
                this.player.UseMana(list.length);
                var result = MergeCalculator.calculateGain(list.length);
                this.attacks.push(
                    new ElementAttck(typelast,result,G.Point({
                        x: this.catLoc.x,
                        y: this.catLoc.y
                    }
                    ))
                )
            }
        }
        this.mergebox.resetTiles(this.markedCenters.objects);
    }
    addTile(level = 1){
        var last = this.markedCenters.objects.pop();
        this.mergebox.updateTile(last,level);
        this.mergebox.resetTiles(this.markedCenters.objects);
    }
    getPresentedResultSprite(){
        var list = this.markedCenters.getAll();
        var last = this.markedCenters.getLast();
        var hitgain = MergeCalculator.calculateGain(list.length);
        this.resultSprite = Tile.getTileSprite(last.name,this.config.tilesize,hitgain);
    }
    handleNewNode(newnode : any){
        var lastItem = this.markedCenters.getLast();
        var count = this.markedCenters.length();
        // allow merging same type
        if(lastItem.name != "mana" && this.player.CanUseMana(count+1) == false) return;
        if(lastItem.name == newnode.name){
            this.markedCenters.add(newnode);
        }
    }
    update(t = 0)
    {
        if(this.isgameover)return;
        this.attacks.forEach(at=>at.updateAndAttack(t,this));
        this.wave.update(t,this);
        this.attacks = this.attacks.filter(x=>x.life > 0);
        
        this.mergebox.update(t);
        var ctx = this.canvas.ctx;
        this.canvasbglayers.forEach(layer=> ctx.drawImage(layer,0,0));
        this.canvas.drawAt(this.player.sprite,G.Point({ x: this.catLoc.x, y: this.catLoc.y - this.player.sprite.h/2 }));
        this.canvas.drawAt(this.player.statSprite,G.Point({ x: 32, y: 32 }));
        this.canvas.drawRelative(this.resultSprite,G.Point({ x: this.canvas.w/2, y: this.config.tilesize+16 }));
        this.attacks.forEach(at=>at.draw(this.canvas));
        this.wave.draw(this.canvas);
        this.canvas.ctx.drawImage(this.getMarkedLinesCanvas(),0,this.config.sceneheight);
        this.canvas.ctx.drawImage(this.mergebox.canvas,0,this.config.sceneheight);
        requestAnimationFrame((t)=> this.update(t));
    }
    AttackPlayer (hitpoint:any){
        var success = this.player.UseHealth(hitpoint);
        if(!success){
            this.gameover();
        }
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