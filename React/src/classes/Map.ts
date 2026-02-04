import Pathfinder from "./Pathfinder";
import type { GameCanvasElement } from "./interface";
import type Game from "../game/game";
import G from "../util/G";
import Point from "./Point";
import { CELLSIZE } from "../util/const";
export class MapBase{
    game : Game;
    blueprintasmatrix : any[][];
    colordict : any[];
    map : GameCanvasElement = G.EmptyCanv();
    pathfindermatrix : any;
    pathFinder : Pathfinder = new Pathfinder([]);
    collisionMat : any[][] = [];

    constructor(game : Game,blueprint : GameCanvasElement){
        this.game = game;
        this.blueprintasmatrix = blueprint ? G.getColorMatrix(blueprint,(r : any)=>{
            if(r == '') return null;
            return r;
        }) : [];
        this.colordict = [
            {c:'#847e87',o: 0, l:'', s: undefined},
        ];
    }
    getMap(){
        return G.imgToCanvas(this.map);
    }
    getPathfindMatrix(colorMatrix : any[][],MAPTILES : any[]){
        var obstacle : any = {};
        for(let i in MAPTILES){
            obstacle[MAPTILES[i].c] = MAPTILES[i].o;
        }
        var obstacleMatrix : any = [];
        for(var i = 0 ; i < colorMatrix.length;i++){
            obstacleMatrix[i] = [];
            for(var j = 0 ; j < colorMatrix[i].length;j++){
                var c = colorMatrix[j][i];
                var obs = obstacle[c];
                var ispassable = obs != undefined && obs == 0;
                obstacleMatrix[i][j] = ispassable ? 0 : 1;
            }
        }
        return obstacleMatrix;
    }
    isObstacle(indexIJ = {i:0,j:0}){
        try{
            var o = this.pathfindermatrix[indexIJ.i][indexIJ.j] == 1;
            return o;
        }
        catch(e){return true;}
    }
    findPathNormPt(from = {i:0,j:0},to = {i:0,j:0}){
        var path = this.pathFinder.findPath(from.i,from.j,to.i,to.j);
        var pointPathNorm = [];
        if(path && path.length > 1){
            for(let i = 1 ; i < path.length;i++){
                var dest = path[i];
                var pt = G.Point({
                    x : dest[0] * CELLSIZE + CELLSIZE/2,
                    y : dest[1] * CELLSIZE + CELLSIZE/2
                });
                pointPathNorm.push(pt);
            }
        }
        return pointPathNorm;
    }

}
export class Portal{
    game:Game;
    animations : GameCanvasElement[];
    animate : any;
    level : number;
    sprite: GameCanvasElement;
    center :Point;
    constructor(game : Game,pos : Point){
        this.game = game;
        this.animations = [
            G.getEmojiSprite(`🌀`,CELLSIZE*2,1.3),
            G.getEmojiSprite(`🌀`,CELLSIZE*2,1),
            G.getEmojiSprite(`🌀`,CELLSIZE*2,1.1),
            G.getEmojiSprite(`🌀`,CELLSIZE*2,1.2),
        ]
        this.animate = {
            framerate : 10,
            frame : 0,
            index : 0
        }
        this.level = this.evalDifficulity(pos);
        this.sprite = this.animations[0];
        this.center = G.Point({
            x: pos.x * CELLSIZE + this.sprite.w/2,
            y: pos.y * CELLSIZE + this.sprite.h/2,
        });
    }
    evalDifficulity(pos : Point){
        var i = pos.x;
        var j = pos.y;

        const score = (i + j) / 2; // 0–64
        if (score < 8) return 1;
        if (score < 16) return 2;
        if (score < 24) return 3;
        if (score < 32) return 4;
        if (score < 40) return 5;
        if (score < 48) return 6;
        if (score < 56) return 7;
        if (score < 64) return 8;
        return 9 + Math.round(Math.random());
    }
    update(){
        this.animate.frame++;
        if(this.animate.frame > this.animate.framerate){
            this.sprite = this.animations[this.animate.index];
            this.animate.frame = 0;
            this.animate.index = this.animate.index >= this.animations.length-1 ? 0 : this.animate.index+1;
        }
    }
    draw(ctx : CanvasRenderingContext2D){
        ctx.drawImage(this.sprite,
            this.center.x - this.sprite.w/2,
            this.center.y - this.sprite.h/2
        );
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.center.x,this.center.y,2,2);
    }
    handleTouchPos(pos : Point){
        if(this.center.distance(pos) < CELLSIZE*2){
            console.log('click near me',this);
            this.game.openPortalMenu(this);
        }
    }
}
export class GameMap extends MapBase{
    cw: number;
    ch: number;
    locations_portal : any[];
    
    constructor(game :Game){
        super(game,game.spriteEngine?.mapBlueprint);
        this.cw = this.game.canvasDim.w;
        this.ch = this.game.canvasDim.h;
        var dirt = SpriteEngine.GenDirtTile(CELLSIZE,CELLSIZE);
        var walkway = SpriteEngine.GenWalkwayTile(CELLSIZE,CELLSIZE);
        var water = SpriteEngine.GenWaterTile(CELLSIZE,CELLSIZE);
        var tree1 = G.getEmojiSprite(`🌳`,CELLSIZE,1.3);
        var house1 = G.getEmojiSprite(`🏡`,CELLSIZE*2,1.3);
        var house2 = G.getEmojiSprite(`🏠`,CELLSIZE*2,1.3);
        var church = G.getEmojiSprite(`⛪`,CELLSIZE*3,1.3);
        var townhall = G.getEmojiSprite(`🏫`,CELLSIZE*3,1.3);
        var tent = G.getEmojiSprite(`⛺`,CELLSIZE*3,1.3);
        // var portal = G.getEmojiSprite(`🌀`,CELLSIZE*2,1.3);
        var stoneBrickWall = SpriteEngine.GenCozyWallTile(CELLSIZE);
        this.locations_portal = [];
        this.colordict = [
            {c:'#99e550',o: 0, l:'', s: undefined},
            {c:'#639bff',o: 1, l:'', s: water},
            {c:'#6abe30',o: 1, l:'', s: tree1},
            {c:'#76428a',o: 1, l:'house1', s: house1},
            {c:'#d77bba',o: 1, l:'house2', s: house2},
            {c:'#d9a066',o: 0, l:'', s: dirt},
            {c:'#767676',o: 1, l:'', s: stoneBrickWall},
            {c:'#8f974a',o: 1, l:'church', s: church},
            {c:'#fbf236',o: 1, l:'townhall', s: townhall},
            {c:'#663931',o: 0, l:'', s: walkway},
            {c:'#524b24',o: 1, l:'tent', s: tent},
            {c:'#222034',o: 1, l:'portal', s: undefined},
        ];
        for(let i = 0 ; i < 64; i++){
            for(let j = 0 ; j < 64 ;j++){
                var col = this.blueprintasmatrix[j][i];
                if(col == '#222034'){
                    this.locations_portal.push({i:i,j:j});
                }
            }
        }
        this.map = this.RenderMap(game.spriteEngine.mapBlueprint);
        this.pathfindermatrix = this.getPathfindMatrix(this.blueprintasmatrix,this.colordict);
        this.pathFinder = new Pathfinder(this.pathfindermatrix);
    }
    RenderMap(blueprint : GameCanvasElement){
        const MAPSIZE = {w:64,h:64};
        this.collisionMat = [];
        var gardenFullCanvas = SpriteEngine.GenFlowerGarden(MAPSIZE.w*CELLSIZE,MAPSIZE.h*CELLSIZE,CELLSIZE*CELLSIZE);
        var colortocanvasdic : any = {};
        this.colordict.map(x=> colortocanvasdic[x.c] = x.s); 
        var mat = G.getColorMatrix(blueprint,(r = '')=>{
            if(r == '') return null;
            return r;
        });
        var buffer = G.makeCanvas(MAPSIZE.w*CELLSIZE,MAPSIZE.h*CELLSIZE);
        var ctx = buffer.ctx;
        ctx.drawImage(gardenFullCanvas,0,0);
        for(let i = 0 ; i < 64; i++){
            for(let j = 0 ; j < 64 ;j++){
                var col = mat[j][i];
                var spritetodraw = colortocanvasdic[col];
                if(spritetodraw!=undefined){
                    ctx.drawImage(spritetodraw,i*CELLSIZE,j*CELLSIZE);
                }
            }
        }
        return buffer;
    }
}