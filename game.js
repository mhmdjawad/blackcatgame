let CELLSIZE = 32;
let GameDimR = 10;
let GameDimC = 10;
const MAZESIZE = 50;
const SOUNDVOLUME = 0.15;
const floor = Math.floor;
const ELEMENTS = ['🔥','💧','🌱','🌪️','⚡','☀️','🌑'];
var songBgm = {songData: [{ i: [0, 0, 140, 0, 0, 0, 140, 0, 0, 255, 158, 158, 158, 0, 0, 0, 0, 51, 2, 1, 2, 58, 239, 0, 32, 88, 1, 157, 2 ],p: [1,1,1,1],c: [{n: [161,,,,,,,,,,,,,,,,163,,,,,,,,159],f: []}]},{ i: [0, 91, 128, 0, 0, 95, 128, 12, 0, 0, 12, 0, 72, 0, 0, 0, 0, 0, 0, 0, 2, 255, 0, 0, 32, 83, 3, 130, 4 ],p: [1,1,2,1],c: [{n: [144,,151,,149,,147,,146,,147,,146,,144,,144,,151,,149,,147,,146,,147,,146,,144],f: []},{n: [156,,163,,161,,159,,158,,159,,158,,156,,156,,163,,161,,159,,158,,159,,158,,168],f: []}]},{ i: [0, 16, 133, 0, 0, 28, 126, 12, 0, 0, 2, 0, 60, 0, 0, 0, 0, 0, 0, 0, 2, 91, 0, 0, 32, 47, 3, 157, 2 ],p: [1,2,1,2],c: [{n: [144,,151,,149,,147,,146,,147,,146,,144,,144,,151,,149,,147,,146,,147,,146,,144],f: []},{n: [168,,175,,173,,171,,170,,171,,170,,168,,168,,175,,173,,171,,170,,171,,170,,168],f: []}]},{ i: [0, 255, 116, 79, 0, 255, 116, 0, 83, 0, 4, 6, 69, 52, 0, 0, 0, 0, 0, 0, 2, 14, 0, 0, 32, 0, 0, 0, 0 ],p: [1,1,1,1],c: [{n: [144,,151,,149,,147,,146,,147,,146,,144,,144,,151,,149,,147,,146,,147,,146,,144,,,159,,,,159,,,,159,,,,,,,,,,,,159,,159],f: []}]},],rowLen: 8269,   patternLen: 32,  endPattern: 3,  numChannels: 4  };
// const EMOJI = G.getEmojiSprite(`💓`,64,1.3);
// const EMOJI = G.getEmojiSprite(`△`,64,1.3);
// const EMOJI = G.getEmojiSprite(`🎒`,64,1.3);
var ELEMENTALS = [
    {v:'m', e:'🔮', c:'#f00'},
    {v:'f', e:'🔥', c:'#f00'},
    {v:'w', e:'💧', c:'#00f'},
    {v:'e', e:'🌱', c:'#0a0'},
    {v:'i', e:'🌪️', c:'#aaa'},
    {v:'z', e:'⚡', c:'#ff0'},
    {v:'l', e:'☀️', c:'#ffb'},
    {v:'d', e:'🌑', c:'#555'},
];
var SPELLBOOK = [
    {i : 'ff', r: 'm', isattack :false, dmg : 0 , spd : 0},
    {i : 'ww', r: 'm', isattack :false, dmg : 0 , spd : 0},
    {i : 'ee', r: 'm', isattack :false, dmg : 0 , spd : 0},
    {i : 'ii', r: 'm', isattack :false, dmg : 0 , spd : 0},
    {i : 'zz', r: 'm', isattack :false, dmg : 0 , spd : 0},
    {i : 'll', r: 'm', isattack :false, dmg : 0 , spd : 0},
    {i : 'dd', r: 'm', isattack :false, dmg : 0 , spd : 0},
    {i : 'mf', r: 'f', isattack :true, dmg : 2 , spd : 0},
    {i : 'mw', r: 'w', isattack :true, dmg : 2 , spd : 0},
    {i : 'me', r: 'e', isattack :true, dmg : 2 , spd : 0},
    {i : 'mi', r: 'i', isattack :true, dmg : 2 , spd : 0},
    {i : 'mz', r: 'z', isattack :true, dmg : 2 , spd : 0},
    {i : 'ml', r: 'l', isattack :true, dmg : 2 , spd : 0},
    {i : 'md', r: 'd', isattack :true, dmg : 2 , spd : 0},
    {i : 'mff', r: 'f', isattack :true, dmg : 4 , spd : 0},
    {i : 'mww', r: 'w', isattack :true, dmg : 4 , spd : 0},
    {i : 'mee', r: 'e', isattack :true, dmg : 4 , spd : 0},
    {i : 'mii', r: 'i', isattack :true, dmg : 4 , spd : 0},
    {i : 'mzz', r: 'z', isattack :true, dmg : 4 , spd : 0},
    {i : 'mll', r: 'l', isattack :true, dmg : 4 , spd : 0},
    {i : 'mfff', r: 'f', isattack :true, dmg : 8 , spd : 0},
    {i : 'mwww', r: 'w', isattack :true, dmg : 8 , spd : 0},
    {i : 'meee', r: 'e', isattack :true, dmg : 8 , spd : 0},
    {i : 'miii', r: 'i', isattack :true, dmg : 8 , spd : 0},
    {i : 'mzzz', r: 'z', isattack :true, dmg : 8 , spd : 0},
    {i : 'mlll', r: 'l', isattack :true, dmg : 8 , spd : 0},
    {i : 'mddd', r: 'd', isattack :true, dmg : 8 , spd : 0},
    {i : 'mfi', r: 'f', isattack :true, dmg : 3 , spd : 0},
    {i : 'mfe', r: 'f', isattack :true, dmg : 4 , spd : 0},
    {i : 'mwi', r: 'w', isattack :true, dmg : 3 , spd : 0},
    {i : 'mwe', r: 'w', isattack :true, dmg : 3 , spd : 0},
];
function ccc(ctx,color,x,y,w,h,r1,r2){
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x,y,w,h,r1,r2,Math.PI*2);
    ctx.fill();
    ctx.restore();
}
function drawrect(ctx,color,x,y,w,h){
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
    ctx.restore();
}
function circleLineIntersection(x0, y0, r, a, b) {
    var A = 1 + a*a;
    var B = 2*a*(b-y0) - 2*x0;
    var C = x0*x0 + (b-y0)*(b-y0) - r*r;
    var D = B*B - 4*A*C;
    if (D < 0) return []; // No intersection
    if (D === 0) {
        var x = -B/(2*A);
        var y = a*x + b;
        return [{x, y}];
    }
    var sqrtD = Math.sqrt(D);
    var x1 = (-B + sqrtD)/(2*A);
    var x2 = (-B - sqrtD)/(2*A);
    return [
        {x: x1, y: a*x1 + b},
        {x: x2, y: a*x2 + b}
    ];
}
function drawLineOnCanvas(ctx, a, b, color = '#000', width = 2) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    if(a == Infinity){
        ctx.moveTo(b, 0);
        ctx.lineTo(b, h);
    }
    else{
        // Compute y at x=0 and x=w
        let y0 = a * 0 + b;
        let y1 = a * w + b;
        ctx.moveTo(0, y0);
        ctx.lineTo(w, y1);
    }
    ctx.stroke();
    ctx.restore();
}
function pointsOnCircle(cx, cy, r, n) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        points.push({ x, y });
    }
    return points;
}
class SpriteEngine{
    constructor(img){
        var imgCanvas = G.imgToCanvas(img);
        var mat = G.getColorMatrix(imgCanvas,(r)=>{
            if(r == '') return null;
            if(r == '#fff') return null;
            if(r == '#ffffff') return null;
            return r;
        });
        var cvs = G.colorsMatrixToSprite(mat,1);
        this.black_cat = G.crop(cvs,0,0,32,32);
        this.red_witch = G.crop(cvs,32,0,32,32);
        this.mapBlueprint = G.crop(cvs,0,32,64,64);
    }
    AnimateCat(){
        var mainSprite = G.imgToCanvas(this.black_cat);
        var sprites = [];
        var parts = {
            tail : [27,20,4,6],
            leftFoot : [7,29,8,3],
            rightFoot : [17,29,8,3],
            leftArm : [5,15,5,7],
            rightArm: [22,15,5,7]
        };
        function crp(values){
            return G.crop(mainSprite,values[0],values[1],values[2],values[3]);
        }
        var tail = crp(parts.tail);
        var tailInverse = G.mirror(tail,false);
        var leftFoot = crp(parts.leftFoot);
        var rightFoot = crp(parts.rightFoot);
        var leftArm = crp(parts.leftArm);
        var leftArmInv = G.mirror(leftArm,false);
        var rightArm = crp(parts.rightArm);
        var rightArmInv = G.mirror(rightArm,false);
        for(let i in parts){
            let p = parts[i];
            mainSprite.ctx.clearRect(p[0],p[1],p[2],p[3]);
        }       
        function drawSpecs(LF,RF,T,LA,RA){
            var clone = G.imgToCanvas(mainSprite);
            clone.ctx.drawImage(leftFoot, parts.leftFoot[0],parts.leftFoot[1] + (LF ? -2 : 0));
            clone.ctx.drawImage(rightFoot, parts.rightFoot[0],parts.rightFoot[1] + (RF? -2 : 0));
            if(T){
                clone.ctx.drawImage(tailInverse, parts.tail[0],parts.tail[1] + 4);
            }
            else{
                clone.ctx.drawImage(tail, parts.tail[0],parts.tail[1]);
            }
            if(LA){
                clone.ctx.drawImage(leftArmInv, parts.leftArm[0],parts.leftArm[1]-4);
            }
            else{
                clone.ctx.drawImage(leftArm, parts.leftArm[0],parts.leftArm[1]);
            }
            if(RA){
                clone.ctx.drawImage(rightArmInv, parts.rightArm[0],parts.rightArm[1]-4);
            }
            else{
                clone.ctx.drawImage(rightArm, parts.rightArm[0],parts.rightArm[1]);
            }
            return clone;
        }
        var spriteSpec = [
            {LF : 0 ,   RF : 0 ,    T : 0,  LA:0,   RA:0}, // idle 1 normal
            {LF : 0 ,   RF : 0 ,    T : 0,  LA:0,   RA:0}, // idle move tail
            {LF : 1 ,   RF : 0 ,    T : 0,  LA:0,   RA:1}, // left leg up tail norm
            {LF : 1 ,   RF : 0 ,    T : 1,  LA:0,   RA:0}, //left leg up tail inv
            {LF : 0 ,   RF : 1 ,    T : 0,  LA:1,   RA:0}, //right leg up tail norm
            {LF : 0 ,   RF : 1 ,    T : 1,  LA:0,   RA:0}, //right leg up tail inv
        ]; 
        for(let i in spriteSpec){
            var spec = spriteSpec[i];
            var clone = drawSpecs(spec.LF,spec.RF,spec.T,spec.LA,spec.RA);
            sprites.push(clone);
        }
        return sprites;
    }
    Cave(w,h){
        var canvas = G.makeCanvas(w,h);
        var emoji = G.getEmojiSprite(`🪨`,w,1.3);
        canvas.ctx.drawImage(emoji,0,0);
        ccc(canvas.ctx,'#000',canvas.w/1.6,canvas.h,canvas.w/4,canvas.h/3,0,0);
        return canvas;
    }
}
class Clickable{
    constructor(x,y,w,h,sprite,onclick){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sprite = sprite;
        this.onclick = onclick;
    }
    handleTouchPos(pos){
        if(this.isInside(pos.x,pos.y)){
            if(this.onclick) this.onclick(this);
            return true;
        }
        return false;
    }
    isInside(px,py){
        return px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h;
    }
    draw(ctx){
        ctx.save();
        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x,this.y,this.w,this.h);
        ctx.restore();
        ctx.drawImage(this.sprite,this.x,this.y,this.w,this.h);
    }
    update(t){}
}
class Pathfinder {
    constructor(maze) {
        this.maze = maze;
        this.rows = maze.length;
        this.cols = maze[0].length;
    }
    findPath(startRow, startCol, endRow, endCol) {
        startRow = Math.floor(startRow);
        startCol = Math.floor(startCol);
        endRow = Math.floor(endRow);
        endCol = Math.floor(endCol);
        const openSet = [];
        const closedSet = new Set();
        const cameFrom = {};
        const gScore = new Array(this.rows).fill(null).map(() => new Array(this.cols).fill(Infinity));
        gScore[startRow][startCol] = 0;
        const fScore = new Array(this.rows).fill(null).map(() => new Array(this.cols).fill(Infinity));
        fScore[startRow][startCol] = this.heuristic(startRow, startCol, endRow, endCol);
        openSet.push([startRow, startCol]);
        while (openSet.length > 0) {
            const current = this.findLowestFScore(openSet, fScore);
            const [currentRow, currentCol] = current;
            if (currentRow === endRow && currentCol === endCol) {
                return this.reconstructPath(cameFrom, current);
            }
            openSet.splice(openSet.indexOf(current), 1);
            closedSet.add(`${currentRow}-${currentCol}`);
            const neighbors = this.getNeighbors(currentRow, currentCol);
            for (const neighbor of neighbors) {
                const [neighborRow, neighborCol] = neighbor;
                if (closedSet.has(`${neighborRow}-${neighborCol}`) || this.maze[neighborRow][neighborCol]) {
                    continue;
                }
                const tentativeGScore = gScore[currentRow][currentCol] + 1;
                if (tentativeGScore < gScore[neighborRow][neighborCol]) {
                    cameFrom[`${neighborRow}-${neighborCol}`] = current;
                    gScore[neighborRow][neighborCol] = tentativeGScore;
                    fScore[neighborRow][neighborCol] = tentativeGScore + this.heuristic(neighborRow, neighborCol, endRow, endCol);
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        return null; // No path found
    }
    heuristic(row1, col1, row2, col2) {return Math.abs(row1 - row2) + Math.abs(col1 - col2);}
    findLowestFScore(nodes, fScore) {let lowestNode = nodes[0];let lowestFScore = fScore[lowestNode[0]][lowestNode[1]];for (const node of nodes) {const [row, col] = node;if (fScore[row][col] < lowestFScore) {lowestNode = node;lowestFScore = fScore[row][col];}}return lowestNode;}
    getNeighbors(row, col) {const neighbors = [];if (row > 0) {neighbors.push([row - 1, col]);}if (row < this.rows - 1) {neighbors.push([row + 1, col]);}if (col > 0) {neighbors.push([row, col - 1]);}if (col < this.cols - 1) {neighbors.push([row, col + 1]);}return neighbors;}
    reconstructPath(cameFrom, current) {const path = [current];while (cameFrom.hasOwnProperty(`${current[0]}-${current[1]}`)) {current = cameFrom[`${current[0]}-${current[1]}`];path.unshift(current);}return path;}
}
class GameMap{
    constructor(game){
        this.game = game;
        this.cw = this.game.canvasDim.w;
        this.ch = this.game.canvasDim.h;
        var dirt = GameMap.GenDirtTile(CELLSIZE,CELLSIZE);
        var walkway = GameMap.GenWalkwayTile(CELLSIZE,CELLSIZE);
        var water = GameMap.GenWaterTile(CELLSIZE,CELLSIZE);
        var tree1 = G.getEmojiSprite(`🌳`,CELLSIZE,1.3);
        var house1 = G.getEmojiSprite(`🏡`,CELLSIZE*2,1.3);
        var house2 = G.getEmojiSprite(`🏠`,CELLSIZE*2,1.3);
        var church = G.getEmojiSprite(`⛪`,CELLSIZE*3,1.3);
        var townhall = G.getEmojiSprite(`🏫`,CELLSIZE*3,1.3);
        var tent = G.getEmojiSprite(`⛺`,CELLSIZE*3,1.3);
        var portal = G.getEmojiSprite(`🌀`,CELLSIZE*2,1.3);
        var stoneBrickWall = GameMap.GenCozyWallTile(CELLSIZE);
        this.locations = [];
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
            {c:'#222034',o: 1, l:'portal', s: portal},
        ];
        this.locations = [];

        this.blueprintasmatrix = G.getColorMatrix(game.spriteEngine.mapBlueprint,(r)=>{
            if(r == '') return null;
            return r;
        });
        this.map = this.RenderMap(game.spriteEngine.mapBlueprint);
        this.pathfindermatrix = this.getPathfindMatrix(this.blueprintasmatrix,this.colordict);
        this.pathFinder = new Pathfinder(this.pathfindermatrix);
    }
    getMap(){
        return G.imgToCanvas(this.map);
    }
    draw(ctx,px,py){
        let buffer = this.map;
        let sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight;
        sx=sy=sWidth=sHeight=dx=dy=dWidth=dHeight = 0;
        let edge = {
            x : px - (this.cw / 2),
            y : py - (this.ch / 2),
        }
        sx = edge.x;
        sy = edge.y;
        if(sx <= 0) {
            sx = 0;
            px = sx + this.cw / 2;
        }
        if(sy <= 0) {
            sy = 0;
            py = sy + this.ch/2;
        }
        if(sx + this.w > buffer.width){
            sx = buffer.width - this.cw;
            px = sx + this.cw / 2;
        }
        if(sy + this.h > buffer.height){
            sy = buffer.height - this.ch;
            py = sy + this.ch/2;
        }
        dx = 0;
        dy = 0;
        sWidth  = dWidth = this.w;
        sHeight = dHeight = this.h;
        ctx.drawImage(buffer, 
            sx, 
            sy, 
            sWidth, 
            sHeight, 
            dx, 
            dy, 
            dWidth, 
            dHeight);
    }
    static GenCozyWallTile(tileSize = 64) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = tileSize;
        const ctx = canvas.getContext('2d');
        // Background color
        ctx.fillStyle = '#e6d3b3'; // warm beige
        ctx.fillRect(0, 0, tileSize, tileSize);
        // Stone colors
        const stoneColors = ['#d1bfa3', '#c2ad8f', '#b8a07d', '#e0ceb0'];
        // Draw rounded stones in a staggered pattern
        const rows = 3, cols = 4;
        const stoneW = tileSize / cols * 0.9;
        const stoneH = tileSize / rows * 0.7;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Stagger every other row
                let x = col * tileSize / cols + ((row % 2) * tileSize / (cols * 2));
                let y = row * tileSize / rows;
                ctx.beginPath();
                ctx.ellipse(
                    x + stoneW / 2,
                    y + stoneH / 2,
                    stoneW / 2,
                    stoneH / 2,
                    0,
                    0,
                    2 * Math.PI
                );
                ctx.fillStyle = stoneColors[Math.floor(Math.random() * stoneColors.length)];
                ctx.shadowColor = '#bba98a';
                ctx.shadowBlur = 4;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        // Optional: subtle highlight
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(tileSize * 0.7, tileSize * 0.3, tileSize * 0.25, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        return canvas;
    }
    static GenWaterTile(w =64, h = 64){
        const canvas = G.makeCanvas(w, h);
        const ctx = canvas.ctx;
        ctx.fillStyle = "#639bff";
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < w+h; i++) {
            const x = G.randInt(0, w);
            const y = G.randInt(0, h);
            const r = G.randInt(2, 6);
            ctx.globalAlpha = G.rand(0.15, 0.35);
            ctx.fillStyle = "#a3d8ff";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        return canvas;
    }
    static GenDirtTile(w =64, h = 64) {
        const canvas = G.makeCanvas(w, h);
        const ctx = canvas.ctx;
        ctx.fillStyle = "#a67c52";
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < w+h; i++) {
            const x = G.randInt(0, w);
            const y = G.randInt(0, h);
            const r = G.randInt(2, 5);
            ctx.globalAlpha = G.rand(0.15, 0.35);
            ctx.fillStyle = G.rand() > 0.5 ? "#c2b280" : "#7c5c36";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        return canvas;
    }
    static GenGrassTile(w =64, h = 64) {
        const canvas = G.makeCanvas(w, h);
        const ctx = canvas.ctx;
        // Base grass color
        ctx.fillStyle = "#4caf50";
        ctx.fillRect(0, 0, w, h);
        // Add random spots for texture
        for (let i = 0; i < w+h; i++) {
            const x = G.randInt(0, w);
            const y = G.randInt(0, h);
            const r = G.randInt(2, 5);
            ctx.globalAlpha = G.rand(0.18, 0.38);
            ctx.fillStyle = G.rand() > 0.5 ? "#81c784" : "#388e3c";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        return canvas;
    }
    static GenWalkwayTile(w =64, h = 64) {
        const canvas = G.makeCanvas(w, h);
        const ctx = canvas.ctx;
        // Base walkway color
        ctx.fillStyle = "#b0a99f";
        ctx.fillRect(0, 0, w, h);
        const brickW = w/4, brickH = h/4;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                // Offset every other row for a brick pattern
                let x = col * brickW + (row % 2 === 1 ? brickW / 2 : 0);
                if (x + brickW > w) continue; // Avoid overflow
                let y = row * brickH;
                ctx.fillStyle = G.rand() > 0.5 ? "#d6d2c4" : "#a59e91";
                ctx.fillRect(x, y, brickW - 2, brickH - 2);
                ctx.strokeStyle = "#8d867a";
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, brickW - 2, brickH - 2);
            }
        }
        ctx.globalAlpha = 1;
        return canvas;
    }
    static GenFlowerGarden(w = 64,h = 64, density = 8){
        var sprites = [
            G.getEmojiSprite("🌹", 12,1.3),
            G.getEmojiSprite("🌷", 12,1.3),
            G.getEmojiSprite("🌻", 12,1.3),
            G.getEmojiSprite("🌼",12,1.3),
            G.getEmojiSprite("🌱",12,1.3),
        ];
        const canvas = G.makeCanvas(w, h);
        var ctx = canvas.ctx;
        var grass = GameMap.GenGrassTile(w,h);
        ctx.fillStyle = "#4caf50";
        ctx.drawImage(grass,0,0);
        for (let i = 0; i < density; i++) {
            const x = G.randInt(0, w-12);
            const y = G.randInt(0, h-12);
            var randSprite = sprites[G.randInt(0,sprites.length)];
            ctx.drawImage(randSprite,x,y);
        }
        return canvas;
    }
    RenderMap(blueprint){
        const MAPSIZE = {w:64,h:64};
        this.collisionMat = [];
        var gardenFullCanvas = GameMap.GenFlowerGarden(MAPSIZE.w*CELLSIZE,MAPSIZE.h*CELLSIZE,CELLSIZE*CELLSIZE);
        var colortocanvasdic = {};
        this.colordict.map(x=> colortocanvasdic[x.c] = x.s); 
        var mat = G.getColorMatrix(blueprint,(r)=>{
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
    getPathfindMatrix(colorMatrix,MAPTILES){
        var obstacle = {};
        for(let i in MAPTILES){
            obstacle[MAPTILES[i].c] = MAPTILES[i].o;
        }
        var obstacleMatrix = [];
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
    isObstacle(indexIJ){
        try{
            var o = this.pathfindermatrix[indexIJ.i][indexIJ.j] == 1;
            return o;
        }
        catch(e){return true;}
    }
    findPathNormPt(from,to){
        var path = this.pathFinder.findPath(from.i,from.j,to.i,to.j);
        var pointPathNorm = [];
        if(path.length > 1){
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
class Cat{
    constructor(game){
        this.animations = game.spriteEngine.AnimateCat(); 
    }
    Idle(){
        return this.animations[0];
    }
    IdleAnimation(){
        return [
            this.animations[0],
            this.animations[1]
        ]
    }
    WalkingAnimation(){
        var frames = [];
        for(let i = 2 ; i <= 5;i++){
            frames.push(this.animations[i]);
        }
        return frames;
    }
    CarSprite(windowsprite){
        var canvas = G.makeCanvas(w,h);
        var ctx = canvas.ctx;
        // Draw wheels
        var wheelW = w * 0.22, wheelH = h * 0.18;
        ctx.save();
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.ellipse(w * 0.25, h * 0.85, wheelW/2, wheelH/2, 0, 0, Math.PI * 2);
        ctx.ellipse(w * 0.75, h * 0.85, wheelW/2, wheelH/2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        // Draw car body
        ctx.save();
        ctx.fillStyle = '#e23d3d';
        ctx.beginPath();
        ctx.moveTo(w*0.1, h*0.7);
        ctx.lineTo(w*0.1, h*0.5);
        ctx.bezierCurveTo(w*0.1, h*0.3, w*0.3, h*0.15, w*0.5, h*0.15);
        ctx.bezierCurveTo(w*0.7, h*0.15, w*0.9, h*0.3, w*0.9, h*0.5);
        ctx.lineTo(w*0.9, h*0.7);
        ctx.quadraticCurveTo(w*0.9, h*0.8, w*0.8, h*0.8);
        ctx.lineTo(w*0.2, h*0.8);
        ctx.quadraticCurveTo(w*0.1, h*0.8, w*0.1, h*0.7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        // Draw car roof (window area)
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(w*0.25, h*0.5);
        ctx.bezierCurveTo(w*0.28, h*0.28, w*0.72, h*0.28, w*0.75, h*0.5);
        ctx.lineTo(w*0.75, h*0.5);
        ctx.lineTo(w*0.25, h*0.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        // Draw window sprite and overlay with light blue
        if(windowsprite){
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.drawImage(windowsprite, w*0.28, h*0.29, w*0.44, h*0.21);
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = '#aee7ff';
            ctx.fillRect(w*0.28, h*0.29, w*0.44, h*0.21);
            ctx.globalAlpha = 1;
            ctx.restore();
        } else {
            ctx.save();
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = '#aee7ff';
            ctx.fillRect(w*0.28, h*0.29, w*0.44, h*0.21);
            ctx.globalAlpha = 1;
            ctx.restore();
        }
        // Optional: add car details (door line, lights)
        ctx.save();
        ctx.strokeStyle = '#b22222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w*0.5, h*0.7);
        ctx.lineTo(w*0.5, h*0.8);
        ctx.stroke();
        // Headlights
        ctx.fillStyle = '#fffbe0';
        ctx.beginPath();
        ctx.ellipse(w*0.88, h*0.7, w*0.04, h*0.03, 0, 0, Math.PI*2);
        ctx.fill();
        // Taillights
        ctx.fillStyle = '#ffb3b3';
        ctx.beginPath();
        ctx.ellipse(w*0.12, h*0.7, w*0.04, h*0.03, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
        return canvas;
    }
    CatInCar(){
        var canvas = G.makeCanvas(80,48);
        // canvas.fill('#fff');
        var ctx = canvas.ctx;
        var catsprite = this.Idle();
        var catInWindow = G.crop(catsprite,5,0,22,18);       
        ctx.drawImage(catInWindow,29,11);
        function ccircle(ctx,c){
            ccc(ctx,c[0],c[1],c[2],c[3],c[4],c[5],c[6]);
        }
        var circles = [
            ['#f00',8,35,7,8,0,0],
            ['#f00',16,32,5,8,0,0],
            ['#f00',70,36,9,7,0,0],
            //wheels
            ['#333',16,41,7,7,0,0],
            ['#333',65,41,7,7,0,0],
            ['#b7b7b7',16,41,4,3,0,0],
            ['#b7b7b7',65,41,4,3,0,0],
        ];
        ccircle(ctx,['#4498dda3',40,24,30,18,0,0]);
        ccircle(ctx,['#0d4b7ee3',65,28,5,9,60,120]);
        drawrect(ctx,'#f00',8,28,64,15);
        circles.forEach(c=> ccircle(ctx,c));
        return canvas;
    }
}
class CPlayer {
    constructor() {
        this.mOscillators = [
            this.osc_sin,
            this.osc_square,
            this.osc_saw,
            this.osc_tri
        ];
        this.mSong = null;
        this.mLastRow = 0;
        this.mCurrentCol = 0;
        this.mNumWords = 0;
        this.mMixBuf = null;
    }
    osc_sin(value) {
        return Math.sin(value * 6.283184);
    }
    osc_saw(value) {
        return 2 * (value % 1) - 1;
    }
    osc_square(value) {
        return (value % 1) < 0.5 ? 1 : -1;
    }
    osc_tri(value) {
        const v2 = (value % 1) * 4;
        if (v2 < 2) return v2 - 1;
        return 3 - v2;
    }
    getnotefreq(n) {
        return 0.003959503758 * (2 ** ((n - 128) / 12));
    }
    createNote(instr, n, rowLen) {
        const osc1 = this.mOscillators[instr.i[0]];
        const o1vol = instr.i[1];
        const o1xenv = instr.i[3] / 32;
        const osc2 = this.mOscillators[instr.i[4]];
        const o2vol = instr.i[5];
        const o2xenv = instr.i[8] / 32;
        const noiseVol = instr.i[9];
        const attack = instr.i[10] * instr.i[10] * 4;
        const sustain = instr.i[11] * instr.i[11] * 4;
        const release = instr.i[12] * instr.i[12] * 4;
        const releaseInv = 1 / release;
        const expDecay = -instr.i[13] / 16;
        let arp = instr.i[14];
        const arpInterval = rowLen * (2 ** (2 - instr.i[15]));
        const noteBuf = new Int32Array(attack + sustain + release);
        let c1 = 0, c2 = 0;
        let o1t = 0;
        let o2t = 0;
        for (let j = 0, j2 = 0; j < attack + sustain + release; j++, j2++) {
            if (j2 >= 0) {
                arp = (arp >> 8) | ((arp & 255) << 4);
                j2 -= arpInterval;
                o1t = this.getnotefreq(n + (arp & 15) + instr.i[2] - 128);
                o2t = this.getnotefreq(n + (arp & 15) + instr.i[6] - 128) * (1 + 0.0008 * instr.i[7]);
            }
            let e = 1;
            if (j < attack) {
                e = j / attack;
            } else if (j >= attack + sustain) {
                e = (j - attack - sustain) * releaseInv;
                e = (1 - e) * (3 ** (expDecay * e));
            }
            c1 += o1t * e ** o1xenv;
            let rsample = osc1(c1) * o1vol;
            c2 += o2t * e ** o2xenv;
            rsample += osc2(c2) * o2vol;
            if (noiseVol) {
                rsample += (2 * Math.random() - 1) * noiseVol;
            }
            noteBuf[j] = (80 * rsample * e) | 0;
        }
        return noteBuf;
    }
    initGenBuffer(song,context,callback){
        this.init(song);
        var loop = ()=>{
            var done = this.generate();
            if(done == 1){
                var buffer = this.createAudioBuffer(context);
                return callback(buffer);
            }
            else{
                requestAnimationFrame(loop);
            }
        }
        requestAnimationFrame(loop);
    }
    init(song) {
        this.mSong = song;
        this.mLastRow = song.endPattern;
        this.mCurrentCol = 0;
        this.mNumWords = song.rowLen * song.patternLen * (this.mLastRow + 1) * 2;
        this.mMixBuf = new Int32Array(this.mNumWords);
    }
    generate() {
        let i, j, b, p, row, col, n, cp, k, t, lfor, e, x, rsample, rowStartSample, f, da;
        const chnBuf = new Int32Array(this.mNumWords);
        const instr = this.mSong.songData[this.mCurrentCol];
        const rowLen = this.mSong.rowLen;
        const patternLen = this.mSong.patternLen;
        let low = 0, band = 0, high;
        let lsample, filterActive = false;
        const noteCache = [];
        for (p = 0; p <= this.mLastRow; ++p) {
            cp = instr.p[p];
            for (row = 0; row < patternLen; ++row) {
                const cmdNo = cp ? instr.c[cp - 1].f[row] : 0;
                if (cmdNo) {
                    instr.i[cmdNo - 1] = instr.c[cp - 1].f[row + patternLen] || 0;
                    if (cmdNo < 17) {
                        noteCache.length = 0;
                    }
                }
                const oscLFO = this.mOscillators[instr.i[16]];
                const lfoAmt = instr.i[17] / 512;
                const lfoFreq = (2 ** (instr.i[18] - 9)) / rowLen;
                const fxLFO = instr.i[19];
                const fxFilter = instr.i[20];
                const fxFreq = instr.i[21] * 43.23529 * 3.141592 / 44100;
                const q = 1 - instr.i[22] / 255;
                const dist = instr.i[23] * 1e-5;
                const drive = instr.i[24] / 32;
                const panAmt = instr.i[25] / 512;
                const panFreq = 6.283184 * (2 ** (instr.i[26] - 9)) / rowLen;
                const dlyAmt = instr.i[27] / 255;
                const dly = instr.i[28] * rowLen & ~1;  
                rowStartSample = (p * patternLen + row) * rowLen;
                for (col = 0; col < 4; ++col) {
                    n = cp ? instr.c[cp - 1].n[row + col * patternLen] : 0;
                    if (n) {
                        if (!noteCache[n]) {
                            noteCache[n] = this.createNote(instr, n, rowLen);
                        }
                        const noteBuf = noteCache[n];
                        for (j = 0, i = rowStartSample * 2; j < noteBuf.length; j++, i += 2) {
                          chnBuf[i] += noteBuf[j];
                        }
                    }
                }
                for (j = 0; j < rowLen; j++) {
                    k = (rowStartSample + j) * 2;
                    rsample = chnBuf[k];
                    if (rsample || filterActive) {
                        f = fxFreq;
                        if (fxLFO) {
                            f *= oscLFO(lfoFreq * k) * lfoAmt + 0.5;
                        }
                        f = 1.5 * Math.sin(f);
                        low += f * band;
                        high = q * (rsample - band) - low;
                        band += f * high;
                        rsample = fxFilter == 3 ? band : fxFilter == 1 ? high : low;
                        if (dist) {
                            rsample *= dist;
                            rsample = rsample < 1 ? rsample > -1 ? this.osc_sin(rsample * .25) : -1 : 1;
                            rsample /= dist;
                        }
                        rsample *= drive;
                        filterActive = rsample * rsample > 1e-5;
                        t = Math.sin(panFreq * k) * panAmt + 0.5;
                        lsample = rsample * (1 - t);
                        rsample *= t;
                    } else {
                        lsample = 0;
                    }
                    if (k >= dly) {
                        lsample += chnBuf[k - dly + 1] * dlyAmt;
                        rsample += chnBuf[k - dly] * dlyAmt;
                    }
                    chnBuf[k] = lsample | 0;
                    chnBuf[k + 1] = rsample | 0;
                    this.mMixBuf[k] += lsample | 0;
                    this.mMixBuf[k + 1] += rsample | 0;
                }
            }
        }
        this.mCurrentCol++;
        return this.mCurrentCol / this.mSong.numChannels;
    }
    createAudioBuffer(context) {
        const buffer = context.createBuffer(2, this.mNumWords / 2, 44100);
        for (let i = 0; i < 2; i++) {
            const data = buffer.getChannelData(i);
            for (let j = i; j < this.mNumWords; j += 2) {
                data[j >> 1] = this.mMixBuf[j] / 65536;
            }
        }
        return buffer;
    }
    createWave() {
        const headerLen = 44;
        const l1 = headerLen + this.mNumWords * 2 - 8;
        const l2 = l1 - 36;
        const wave = new Uint8Array(headerLen + this.mNumWords * 2);
        wave.set([
            82, 73, 70, 70, 
            l1 & 255, (l1 >> 8) & 255, (l1 >> 16) & 255, (l1 >> 24) & 255,
            87, 65, 86, 69, 
            102, 109, 116, 32, 
            16, 0, 0, 0, 
            1, 0, 
            2, 0, 
            68, 172, 0, 0, 
            16, 177, 2, 0, 
            4, 0, 
            16, 0, 
            100, 97, 116, 97, 
            l2 & 255, (l2 >> 8) & 255, (l2 >> 16) & 255, (l2 >> 24) & 255
        ]);
        for (let i = 0, idx = headerLen; i < this.mNumWords; ++i) {
            let y = this.mMixBuf[i];
            y = y < -32767 ? -32767 : (y > 32767 ? 32767 : y);
            wave[idx++] = y & 255;
            wave[idx++] = (y >> 8) & 255;
        }
        return wave;
    }
    getData(t, n) {
        const i = 2 * Math.floor(t * 44100);
        const d = new Array(n);
        for (let j = 0; j < 2 * n; j += 1) {
            const k = i + j;
            d[j] = t > 0 && k < this.mMixBuf.length ? this.mMixBuf[k] / 32768 : 0;
        }
        return d;
    }
}
class SoundSystem{
    constructor(autostart = true){
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioContextSingleFire = new (window.AudioContext || window.webkitAudioContext)();
        this.buffer1 = this.generateShootingSound();
        this.buffer2 = this.generateExplosion();
        var cplayer = new CPlayer();
        var cplayer2 = new CPlayer();
        this.bgmTime = 0;
        this.pausedTime = 0;
        this.startTime = 0;
        cplayer.initGenBuffer(songBgm, this.audioContext,(buffer)=>{
            this.bgmBuffer = buffer;
            if(autostart) this.startBgm();
        });
    }
    generateShootingSound() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.3; 
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() - 0.5) * 2;
        }
        const attackTime = 0.01; 
        const decayTime = 0.1;  
        const sustainLevel = 0.2; 
        const releaseTime = duration - attackTime - decayTime; 
        for (let i = 0; i < data.length; i++) {
            let time = i / sampleRate;
            if (time < attackTime) {
                data[i] *= time / attackTime; 
            } else if (time < attackTime + decayTime) {
                data[i] *= 1 - (time - attackTime) / decayTime * (1 - sustainLevel); 
            } else if (time > duration - releaseTime) {
                data[i] *= (duration - time) / releaseTime; 
            }
        }
        for (let i = 0; i < data.length; i++) {
            let time = i / sampleRate;
            data[i] *= Math.sin(2 * Math.PI * time * (440 + Math.random() * 100)); 
        }
        return buffer;
    }
    generateSound() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.01; 
        const frequency = 10; 
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
        }
        return buffer;
    }
    generateExplosion() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.5; 
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1; 
        }
        const attackTime = 0.05; 
        const decayTime = 0.2; 
        const sustainLevel = 0.0; 
        const releaseTime = duration - attackTime - decayTime; 
        for (let i = 0; i < data.length; i++) {
            let time = i / sampleRate;
            if (time < attackTime) {
                data[i] *= time / attackTime; 
            } else if (time < attackTime + decayTime) {
                data[i] *= 1 - (time - attackTime) / decayTime * (1 - sustainLevel); 
            } else if (time > duration - releaseTime) {
                data[i] *= (duration - time) / releaseTime; 
            }
        }
        return buffer;
    }
    playS1(){
        const source = this.audioContextSingleFire.createBufferSource();
        source.buffer = this.buffer1;
        source.connect(this.audioContextSingleFire.destination);
        source.start();
    }
    playS2(){
        const source = this.audioContextSingleFire.createBufferSource();
        source.buffer = this.buffer2;
        source.connect(this.audioContextSingleFire.destination);
        source.start();
    }
    startBgm(id = 1){
        if(this.bgmsource){
            this.bgmsource.stop();
            this.bgmsource = null;
        }
        if(this.bgmBuffer){
            this.bgmsource = this.audioContext.createBufferSource();
            this.bgmsource.buffer = id==1 ? this.bgmBuffer : this.bgm2Buffer;
            this.bgmsource.connect(this.audioContext.destination);
            this.bgmsource.loop = true;
            this.bgmsource.start(0, this.pausedTime);
            this.startTime = this.audioContext.currentTime - this.pausedTime;
        }
    }
    stopBgm(id){
        if(this.bgmsource){
            this.pausedTime = this.audioContext.currentTime - this.startTime;
            this.bgmsource.stop();
            this.bgmsource = null;
        }
    }
}
class G{
    static makeCanvas(w=0,h=0){
        let c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        c.w=w;
        c.h=h;
        c.ctx = c.getContext('2d');
        c.center = {x: w/2,y:h/2}
        c.clear = ()=>{
            c.ctx.clearRect(0,0,w,h);
        }
        c.fill = (color)=>{
            c.ctx.fillStyle = color;
            c.ctx.fillRect(0,0,w,h);
        }
        c.fillPatern = (img)=>{
            const pattern = c.ctx.createPattern(img, "repeat");
            c.ctx.fillStyle = pattern;
            c.ctx.fillRect(0, 0, w, h);
        }
        return c;
    }
    static GenTable(rows,cols){
        var html = ``;
        for(let i = 0 ; i < rows ; i++){
            html += `<tr>`;
            for(let j = 0 ; j < cols;j++){
                html += `<td></td>`;
            }
            html += `</tr>`;
        }
        var table = document.createElement('table');
        table.innerHTML = html;
        var entities = [];
        var trs = table.querySelectorAll('tr');
        for(let i = 0 ; i < trs.length; i++){
            var tds = trs[i].querySelectorAll('td');
            tds.forEach(x=> x.html = (html)=>x.innerHTML=html);
            entities[i] = [...tds];
        }
        table.entities = entities;
        return table;
    }
    static Point(pos){
        return new Point(pos);
    }
    static getEmojiSprite(emoji,size,factor = 1.3, color = '#000', font = 'sans-serif'){
        let canvas = G.makeCanvas(size,size);
        var ctx = canvas.ctx;
        ctx.font = `${size/factor}px ${font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color;
        ctx.fillText(emoji,size/2, size*1.1/2);
        return canvas;
    }
    static MakeRoundedRect(width, height, radius, color) {
        var canvas = G.makeCanvas(height,width);
        var ctx = canvas.ctx;
        var c = G.MakeCircle(width*radius/100,null,color);
        ctx.fillStyle = color;
        ctx.drawImage(c,0,0);
        ctx.drawImage(c,width-c.width,0);
        ctx.drawImage(c,width-c.width,height-c.height);
        ctx.drawImage(c,0,height-c.height);
        ctx.fillRect(c.width/2,1,width-c.width,height-2);
        ctx.fillRect(1,c.width/2,width-2,height-c.width);
        return canvas;
    }
    static getTextSprite(text,size, color,  factor = 0.8, font = 'sans-serif'){
        text = text.toUpperCase();
        let canvas = G.makeCanvas(size * text.length, size);
        for(let i = 0 ; i < text.length;i++){
            var ls = G.getEmojiSprite(text[i],size,factor, color, font);
            canvas.ctx.drawImage(ls,i * size,0);
        }
        return canvas;
    }
    static GetTextSpriteWithShadow(text,size, color,  factor = 0.8, font = 'sans-serif',shadow = '#fff'){
        var s1 = G.getTextSprite(text,size,color,factor,font);
        var s2 = G.getTextSprite(text,size,shadow,factor,font);
        var canvas = G.makeCanvas(s1.w+4,s1.w+4);
        canvas.ctx.drawImage(s2,1,1);
        canvas.ctx.drawImage(s1,0,0);
        return canvas;
    }
    static fuseColor(canvas,color){
        var colorbuffer= G.makeCanvas(canvas.w,canvas.h);
        colorbuffer.fill(color);
        return G.fuseImage(canvas,colorbuffer,'source-atop');
    }
    static fuseImage(canvas,canvas2,composite = 'source-atop'){
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        let ctx = buffer.ctx;
        ctx.drawImage(canvas,0,0);
        ctx.globalCompositeOperation = composite;
        for(let i = 0 ; i < canvas.width/canvas2.width;i++){
            for(let j = 0 ; j < canvas.height/canvas2.height;j++){
                ctx.drawImage(canvas2,i * canvas2.width,j * canvas2.height);
            }
        }
        return buffer;
    }
    static rotateCanvas(_image,deg){
        var image = (deg % 90 != 0) ? G.prepForRotate(_image) : _image;
        var canvas = G.makeCanvas(image.width,image.height);
        var ctx = canvas.ctx;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(deg * Math.PI / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
        return canvas;
    }
    static prepForRotate(image){
        let d = Math.sqrt( Math.pow(image.width,2)+Math.pow(image.height,2));
        let buffer = G.makeCanvas(d,d);
        buffer.ctx.drawImage(image,(d - image.width) /2,(d - image.height) /2);
        return buffer;
    }
    static mirror(canvas,hor = true){
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        let context = buffer.ctx;
        context.save();
        if(hor){
            context.scale(-1, 1);
            context.drawImage(canvas, 0, 0, canvas.width*-1, canvas.height);
        }
        else{
            context.scale(1, -1);
            context.drawImage(canvas, 0, 0, canvas.width, canvas.height*-1);
        }
        context.restore();
        return buffer;
    }
    static gridBG(color1 = "lightgrey",color2 = null, scale = 8, width=1){
        var canvas = G.makeCanvas(scale,scale);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,scale,scale);
        if(color2 == null){
            ctx.clearRect(0,0,scale-width,scale-width);
        }
        else{
            ctx.fillStyle = color2;
            ctx.fillRect(0,0,scale-width,scale-width);
        }
        return canvas;
    }
    static Lightify(canvas,opacity){
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        buffer.ctx.globalAlpha = opacity;
        buffer.ctx.drawImage(canvas,0,0);
        buffer.ctx.globalAlpha = 1;
        return buffer;
    }
    static makeDom(html){
        var h = document.createElement('div');
        h.innerHTML = html;
        return h.firstChild;
    }
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]];}return array;
    }
    static repeatCanvas(canvas,r,c=0){
        if (c == 0) c = r;
        var buffer = G.makeCanvas(canvas.width * c, canvas.height * r);
        var pattern = buffer.ctx.createPattern(canvas, 'repeat');
        buffer.ctx.fillStyle = pattern;
        buffer.ctx.fillRect(0, 0, buffer.w, buffer.h);
        return buffer;
    }
    static merge(list,w,h){
        var c = G.makeCanvas(w,h);
        for(let i in list){
            c.ctx.drawImage(list[i],0,0);
        }
        return c;
    }
    static brickPattern(color1 = "#fff",color2 = "#000", r = 1){
        var canvas = G.makeCanvas(8,8);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = color2;
        ctx.fillRect(7,0,1,4);
        ctx.fillRect(0,3,8,1);
        ctx.fillRect(4,4,1,4);
        ctx.fillRect(0,7,8,1);
        if(r > 1){return G.repeatCanvas(canvas,r,r);}
        return canvas;
    }
    static randomPattern(color1,color2,bias = 0.3,w=8,h=8){
        var canvas = G.makeCanvas(w,h);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = color2;
        for(let i = 0 ; i < h ; i ++){
            for(let j = 0 ; j < w ; j++){
                if(Math.random() < bias) ctx.fillRect(j,i,1,1);
            }
        }
        return canvas;
    }
    static MakeCircle(r,stroke = null,fill = null, sw = 1){
        var s = G.makeCanvas(r*2+2,r*2+2);
        var ctx = s.ctx;
        ctx.save();
        ctx.lineWidth = sw;
        ctx.beginPath();
        ctx.arc(s.width/2,s.height/2,r,0,Math.PI * 2,false);
        if(stroke != null){ctx.strokeStyle = stroke;ctx.stroke();}
        if(fill != null){ctx.fillStyle = fill;ctx.fill();}
        ctx.restore();
        return s;
    }
    static movePointToward(pos,rotation,distance){
        const rRad = rotation * (Math.PI / 180);
        const vx = distance * Math.cos(rRad);
        const vy = distance * Math.sin(rRad);
        return {
            x : pos.x + vx,
            y : pos.y + vy
        }
    }
    static loadImage(url,callback){
        var img = new Image();
        img.src = url;
        img.addEventListener('load',()=>{
            callback(img);
        });
    }
    static getColor(r, g, b, a){
        if(r+g+b+a == 0){return null;}
        else if(r+g+b == 0){return '#000000';}
        else if (r > 255 || g > 255 || b > 255){return '#000000';}
        return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
    }
    static getColorMatrix (canvas,changefct){
        var context = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        var imageData = context.getImageData(0, 0, width, height);
        var data = imageData.data;
        var colorMatrix = [];
        for (var i = 0; i < data.length; i += 4) {
            colorMatrix.push(
                G.getColor(
                    data[i],
                    data[i + 1],
                    data[i + 2],
                    data[i + 3]
                    )
                );
        }
        var matrix = [];
        for(let i = 0 ; i < canvas.height;i++){matrix[i] = [];}
        let c = 0, r = 0;
        for(let i = 0 ; i < colorMatrix.length;i++){
            if(c >= canvas.width){r++;c=0}
            matrix[r][c] = colorMatrix[i];
            if(changefct) matrix[r][c] = changefct(matrix[r][c]);
            c++;
        }
        return matrix;
    }
    static imgToCanvas(img){
        var c = G.makeCanvas(img.width,img.height);
        c.ctx.drawImage(img,0,0);
        return c;
    }
    static colorsMatrixToSprite(matrix,scale = 1,deform = null){
        let height = matrix.length;
        let width = Math.max(...matrix.map((row)=> row.length));
        var buffer = G.makeCanvas(width * scale,height* scale);
        var ctx = buffer.ctx;
        for(let i = 0 ; i < height;i++){
            for(let j = 0 ; j < width;j++){
                var color = matrix[i][j];
                if(deform) color = deform(color);
                if(!color || color == '') continue;
                ctx.fillStyle = color;
                ctx.fillRect(j*scale,i*scale,scale,scale);
            }
        }
        return buffer;
    }
    static magnify(img,factor){
        var imgCanvas = G.imgToCanvas(img);
        var mat = G.getColorMatrix(imgCanvas,(r)=>{
            return r;
        });
        return G.colorsMatrixToSprite(mat,factor);
    }
    static crop(canvas,x,y,width,height){
        let buffer = G.makeCanvas(width,height);
        buffer.ctx.drawImage(canvas,x,y,width,height,0,0,width,height);
        return buffer;
    }
    static randomColor(){
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {color += letters[Math.floor(Math.random() * 16)];}
        return color; 
    }
    static GenShadow(canvas,thickness,color){
        var canvasColor = G.makeCanvas(canvas.w,canvas.h);
        canvasColor.fill(color);
        var fused = G.fuseImage(canvas,canvasColor,'source-atop');
        var canvas2 = G.makeCanvas(canvas.w + thickness, canvas.h + thickness);
        canvas2.ctx.drawImage(fused,0,0,canvas2.w,canvas2.h);
        return canvas2;
    }
    static NormGrid(value,base){
        return parseInt(value/base) * base + base/2;
    }
    static GenBorder(w,h,borderStyle,bgcolor){
        var canvas = G.makeCanvas(w,h);
        canvas.ctx.fillStyle = bgcolor;
        canvas.ctx.fillRect(
            borderStyle.w/2,
            borderStyle.h/2,
            canvas.w - borderStyle.w,
            canvas.h - borderStyle.h
        );
        var rulerH = G.makeCanvas(canvas.w,borderStyle.h);
        var rulerV = G.makeCanvas(borderStyle.w,canvas.h);
        var cx = 0;
        var s1 = borderStyle;
        while(cx < canvas.w-s1.w){
            rulerH.ctx.drawImage(s1,cx,0);
            cx += s1.w/2;
        }
        var cy = 0;
        while(cy < canvas.h-s1.h){
            rulerV.ctx.drawImage(s1,0,cy);
            cy += s1.h/2;
        }
        canvas.ctx.drawImage(rulerH,0,-2);
        canvas.ctx.drawImage(rulerH,0,canvas.h-rulerH.h+2);
        canvas.ctx.drawImage(rulerV,-1,0);
        canvas.ctx.drawImage(rulerV,canvas.w - rulerV.w+1,0);
        return canvas;
    }
    static GenerateCursor(){
        var canvas = G.makeCanvas(CELLSIZE,CELLSIZE);
        var ctx = canvas.ctx;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,canvas.w,canvas.h);
        ctx.clearRect(2,2,canvas.w-4,canvas.h-4);
        ctx.clearRect(CELLSIZE/4,0,CELLSIZE/2,CELLSIZE);
        ctx.clearRect(0,CELLSIZE/4,CELLSIZE,CELLSIZE/2);
        return canvas;
    }
    static mapClick(e,canvas,callback){
        var rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        var x = (e.clientX - rect.left)* scaleX + window.scrollX;
        var y = (e.clientY - rect.top)* scaleY+ window.scrollY;
        callback(G.Point({x,y}));
    }
    static magnifyByMatrix(canvas,mult = 2){
        var mat = G.getColorMatrix(canvas);
        return G.colorsMatrixToSprite(mat,mult);
    }
    static rand (a=1, b=0){ return b + (a-b)*Math.random();}
    static randInt (a=1, b=0){ return G.rand(a,b)|0;}
}
class Point{
    constructor(pos){
        this.x = pos.x;
        this.y = pos.y;
    }
    moveToward(p2,dist=1){
        var vx = this.x == p2.x ? 0 : this.x < p2.x ? dist : -dist;
        var vy = this.y == p2.y ? 0 : this.y < p2.y ? dist : -dist;
        this.x += vx;
        this.y += vy;
    }
    distance(p2){
        let distance = 0;
        distance += Math.pow((this.x - p2.x), 2);
        distance += Math.pow((this.y - p2.y), 2);
        distance = Math.sqrt(distance);
        return distance;
    }
    getAngleTo(target){
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        let angleRadians = Math.atan2(dy, dx);
        return angleRadians * 180/Math.PI;
    }
    moveByAngle(rotation,distance){
        const rRad = rotation * (Math.PI / 180);
        const vx = distance * Math.cos(rRad);
        const vy = distance * Math.sin(rRad);
        this.x = this.x + vx;
        this.y = this.y + vy;
    }
}
class GameEnginge{
    constructor(c){
        this.config = {
            music : false,
            sound : false,
            controls:false
        };
        this.resetBody();
        this.preLoading();
        this.windowaspect = window.innerHeight/window.innerWidth;
        if(this.windowaspect > 1){
            CELLSIZE = 16*2;
        }
        GameDimR = Math.floor(window.innerHeight/CELLSIZE) - 2.5;
        GameDimC = Math.floor(window.innerWidth/CELLSIZE)- 1;
        this.helpdom = document.createElement('div');
        document.body.innerHTML = ``;
    }
    preLoading(){
        var about = G.makeDom(`<div>Loading....</div>`);
        this.body.append(about);
    }
    resetBody(){
        var div_w_class = `<div class='_class_'></div>`;
        this.layout = G.makeDom(div_w_class.replace('_class_','layout'));
        this.header = G.makeDom(div_w_class.replace('_class_','header'));
        this.body = G.makeDom(div_w_class.replace('_class_','body'));
        this.footer = G.makeDom(div_w_class.replace('_class_','footer'));
        this.layout.appendChild(this.header);
        this.layout.appendChild(this.body);
        this.layout.appendChild(this.footer);
        document.body.innerHTML = ``;
        document.body.appendChild(this.layout);
    }
    prepFootercontrols(){
        if(this.config.controls == false){
            this.footer.innerHTML = '';
            return;
        }
        this.footer.innerHTML = '';
        var table = G.GenTable(2,3);
        table.classList.add('gamecontrolstable');
        table.style.width = GameDimC * CELLSIZE + "px";
        var entities = table.entities;
        var keys = [
            {html : '<span> <h1>w</h1> </span>', f : 'w' , r : 0 , c : 1},
            {html : '<span> <h1>s</h1> </span>', f : 's' , r : 1 , c : 1},
            {html : '<span> <h1>a</h1> </span>', f : 'a' , r : 0 , c : 0},
            {html : '<span> <h1>d</h1> </span>', f : 'd' , r : 0 , c : 2},
        ]
        keys.forEach(k=>{
            var dom = G.makeDom(k.html);
            entities[k.r][k.c].addEventListener('touchstart',(e)=> this.player.keys.keydown(k.f));
            entities[k.r][k.c].addEventListener('touchend',(e)=> this.player.keys.keyup(k.f));
            entities[k.r][k.c].addEventListener('mousedown',(e)=> this.player.keys.keydown(k.f));
            entities[k.r][k.c].addEventListener('mouseup',(e)=> this.player.keys.keyup(k.f));
            entities[k.r][k.c].append(dom) ;
            entities[k.r][k.c].style.border = '2px solid black';
            entities[k.r][k.c].style.background = 'blue';
            entities[k.r][k.c].style.color = '#fff';
        })
        entities[0][2].rowSpan = 2;
        entities[1][2].remove();
        entities[0][0].rowSpan = 2;
        entities[1][0].remove();
        this.footer.appendChild(table);
    }
}
class Player{
    constructor(game){
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
        this.cat = new Cat(game);
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
    update(t){
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
    draw(ctx){
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
    handleTouchPos(pos){
        if(pos.y < CELLSIZE) return;
        var cameraXY = this.getCameraStartXY();
        var indexIJ = {
            i : Math.floor(G.NormGrid(cameraXY.x + pos.x,CELLSIZE) / CELLSIZE),
            j : Math.floor(G.NormGrid(cameraXY.y + pos.y,CELLSIZE) / CELLSIZE),
        }
        if(this.moving == false){
            if(!this.game.gamemap.isObstacle(indexIJ)){
                var origin = {
                    i : Math.floor(this.center.x/CELLSIZE),
                    j : Math.floor(this.center.y/CELLSIZE),
                }
                this.pathplan = this.game.gamemap.findPathNormPt(origin,indexIJ);
            }
        }
    }
}
class ChatButton{
    constructor(card,text,callback){
        this.text = text;
        this.buttonsprite = this.drawButton();
    }
    drawButton(){
        var textSprite = G.getTextSprite(this.text,20,'#fff',1.3);
        var border = G.getTextSprite('▄',4,'#fff',1.3);
        var buttonBorder = G.GenBorder(textSprite.w+8,textSprite.h+8,border,'#7a7818');
        buttonBorder.ctx.drawImage(textSprite,4,4);
        return buttonBorder;
    }
}
class ChatCard{
    constructor(w,h){
        this.w = 500;
        this.h = 250;
        this.coreCard = this.getCoreCard(w,h);
        var canvas = G.makeCanvas(this.w,this.h);
        canvas.ctx.drawImage(this.coreCard,0,0);
        var s1 = G.getTextSprite(`▣`,8,'#7a7818',1.3);
        var picborder = G.GenBorder(64,64,s1,'#c3c139');
        var we = G.getEmojiSprite('🧙',64,1.3);
        canvas.ctx.drawImage(picborder,
            canvas.w - picborder.w - 16,
            16
        );
        canvas.ctx.drawImage(we,
            canvas.w - picborder.w - 16,
            16
        );
        var t1 = G.GetTextSpriteWithShadow(`Hello? .....`,16,'#7a7818',1,'cursive');
        canvas.ctx.drawImage(t1,16,64);
        this.canvas = canvas;
        this.drawButtons();
    }
    drawButtons(){
        this.buttons = [
            new ChatButton(this,'Hello',(e)=>{console.log('hello')}),
            new ChatButton(this,'Skip',(e)=>{console.log('skip')}),
        ];
        var cx = 16;
        var cy = this.canvas.h - CELLSIZE;
        for(let i in this.buttons){
            var btn = this.buttons[i];
            var sprite = btn.buttonsprite;
            this.canvas.ctx.drawImage(
                sprite,
                cx,
                cy
            );
            cx += sprite.w + CELLSIZE;
        }
    }
    getCoreCard(w,h){
        var s1 = G.getTextSprite(`▩`,16,'#c3c139',1.3);
        return G.GenBorder(w,h,s1,'#e7e570');
    }
    draw(ctx,x,y){
        ctx.drawImage(this.canvas,
            x - this.canvas.w/2
            ,
            y - this.canvas.h/2
        );
    }
}
class Minigame1{
    constructor(game){
        this.game = game;
        this.game.resetBody();
        this.body = game.body;
        this.canvasDim = game.canvasDim;
        this.cat = new Cat(game);
        this.catSprite = this.cat.Idle();
        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.mousePos = {x:0,y:0};
        this.canvas.addEventListener('click',(e)=>{this.handleClick(e);});
        this.ctx = this.canvas.ctx;
        this.body.append(this.canvas);
        console.log('mg1');
        this.paused = false;
        this.sceneEnded = false;
        this.s1 = G.getTextSprite(`⟐⟑⟇⟒⟓⟔⟁`,14,'#ffffff',1.3);
        this.chatcard = new ChatCard(500,250);
        this.cursorSprite = G.GenerateCursor();
        this.update(0);
    }
    handleClick(e){
        G.mapClick(e,this.canvas,(pt)=>{
            var x = pt.x;
            var y = pt.y;
            x = Math.floor(x/CELLSIZE) * CELLSIZE + CELLSIZE / 2;
            y = Math.floor(y/CELLSIZE) * CELLSIZE + CELLSIZE / 2;
            this.mousePos = {x:x-CELLSIZE/2,y:y-CELLSIZE/2};
        });
    }
    update(t){
        if(this.paused) return;
        this.canvas.fill('#aaa');
        // this.ctx.fillStyle = '#fff';
        this.ctx.fillText(t,10,10);
        for(let i = 0 ; i < 130; i++){
            this.ctx.drawImage(this.s1,
                G.randInt(-64,this.canvas.w),
                G.randInt(-64,this.canvas.h)
            );
        }
        this.chatcard.draw(this.ctx,this.canvas.w/2,this.canvas.h/2);
        if(this.mousePos){
            this.canvas.ctx.drawImage(this.cursorSprite,
                this.mousePos.x,
                this.mousePos.y,
            );
        }
        // this.ctx.drawImage(this.catSprite, this.canvas.w/2,this.canvas.h/2);
        requestAnimationFrame(newtime=>this.update(newtime));
    }
}
class Collection{
    constructor(){
        this.coordinates = new Set();
        this.objects = [];
        this.score = 0;
    }
    length() {return this.objects.length}
    removeLast(){
        var last = this.objects.pop();
        const key = JSON.stringify(last);
        this.coordinates.delete(key);
        this.score = this.getSquenceScore();
    }
    getLast(){
        if(this.objects.length > 0) return this.objects[this.objects.length - 1];
    }
    getbeforeLast(){
        if(this.objects.length > 1){
            return this.objects[this.objects.length - 2];
        }
    }
    add(obj){
        const key = JSON.stringify(obj);
        if (!this.coordinates.has(key)) {
            this.coordinates.add(key);
            this.objects.push(obj);
            return true;
        }
        return false;
    }
    has(obj){
        return this.coordinates.has(JSON.stringify(obj));
    }
    getAll(){
        return [...this.objects];
    }
    getSequence(){
        var vals = this.objects.map(x=>x.val);
        if(vals.length == 0) return ' ';
        return vals.join('');
    }
    getSquenceScore(){
        return 0;
    }
}
class CombatCard{
    constructor(attrib){
        this.updateCanvas(attrib);
    }
    updateCanvas(attrib){
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
    draw(ctx){
        ctx.drawImage(this.shadow,this.x - 2,this.y - 2);
        ctx.drawImage(this.canvas,this.x,this.y);
    }
}
class CombatScene{
    constructor(game,player = null, mob = null, ambient = null ,endscenefct = ()=>{}){
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
            new Clickable(0,0,CELLSIZE*1.5,CELLSIZE*1.5,G.getEmojiSprite('🚪',CELLSIZE*1.5,1.4),(e)=>{endscenefct(this)}),
            new Clickable(CELLSIZE*1.5,0,CELLSIZE*1.5,CELLSIZE*1.5,G.getEmojiSprite('🎒',CELLSIZE*1.5,1.4),(e)=>{this.inventory()}),
        ];
        this.playercardattrib = {
                name : 'player',
                health : 90,
                healthmax : 100,
                sprite : G.magnify(game.spriteEngine.black_cat,2),
                x : CELLSIZE * 3,
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
                sprite : G.getEmojiSprite('🧟',64,1.3),
                x : this.canvas.w - CELLSIZE * 3 - CELLSIZE * 3,
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
        this.canvas.addEventListener('mousedown', (e) => handleStart(e));
        this.canvas.addEventListener('mouseup', (e) => handleEnd(e));
        this.canvas.addEventListener('mousemove', (e) => handleMove(e));
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => handleStart(e));
        this.canvas.addEventListener('touchend', (e) => handleEnd(e));
        this.canvas.addEventListener('touchmove', (e) => handleMove(e));
        var handleEnd = (e)=>{
            this.touchPos = null;
            if(this.markedCenters.objects.length > 0){
                var seq = this.markedCenters.getSequence();
                var spell = SPELLBOOK.find(x=> x.i == seq);
                if(spell){
                    if(spell.isattack){
                            this.markedCenters.objects.forEach(x=> {
                                this.grid[x.r][x.c].val = 0;
                            });
                            this.grid = this.applyGravity(this.grid,this.rows,this.cols,(go) => go.val == 0,(r,c) => this.getNewEntity(r,c));
                            this.resetGridCenters(this.grid);
                            this.mobcardattrib.health -= spell.dmg;
                            this.cards = [
                                new CombatCard(this.playercardattrib),
                                new CombatCard(this.mobcardattrib)
                            ];
                    }
                    else{
                        var last = this.markedCenters.getLast();
                        this.markedCenters.objects.forEach(x=> {
                            this.grid[x.r][x.c].val = 0;
                        });
                        last.val = spell.r;
                        last.sprite = this.elementals.find(x=> x.v == spell.r).s;
                        this.grid = this.applyGravity(this.grid,this.rows,this.cols,(go) => go.val == 0,(r,c) => this.getNewEntity(r,c));
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
            G.mapClick(e.touches ? e.touches[0] : e, this.canvas,(pt)=>{
                this.menuclickables.forEach(x=> {if(x.handleTouchPos) x.handleTouchPos(pt)});
            });
        }
        var handleStart = (e)=>{
            this.isClick = true;
        }
        var handleMove = (e)=>{
            G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt)=>{
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
        this.update(0);
    }
    getAmbient(scene){
        var canvas = G.makeCanvas(this.w,this.h);
        var gardem = GameMap.GenFlowerGarden(this.w,this.h,this.w);
        canvas.ctx.drawImage(gardem,0,0);
        var bigTree = G.getEmojiSprite('🌳',this.w/2,1.2);
        canvas.ctx.drawImage(bigTree,-bigTree.w/2,0);
        canvas.ctx.drawImage(bigTree,this.w-bigTree.w/2,0);
        return G.Lightify(canvas,0.5);
        return canvas;
    }
    applyGravity(grid,r,c, checkZeroFct, newEntity, inverse  = true){
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
    resetGridCenters(grid){
        for(let i in grid){
            for(let j in grid[i]){
                var cx = this.x + j * this.blocksize + this.blocksize/2;
                var cy = this.y + i * this.blocksize + this.blocksize/2;
                var center = new Point({x: cx,y:cy});
                grid[i][j].center = center;
                grid[i][j].r = i;
                grid[i][j].c = j;
            }
        }
    }
    getNewEntity(r,c){
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
            return canvas;
        }
        var sprites = {}; this.elementals.forEach(x=> sprites[x.v] = x.s);
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
    getSprite(v,light){
        var emojisprt = G.getEmojiSprite(v,this.tilesize,1.3);
        if(light){
            return G.fuseImage(this.roundRectS1,emojisprt);
        }
        else{
            return G.fuseImage(this.roundRectS2,emojisprt);
        }
    }
    update(t){
        if(this.mobcardattrib.health <= 0){
            return this.endscenefct(this);
        }
        var ctx = this.canvas.ctx;
        this.canvas.fill('#000');
        ctx.drawImage(this.ambient,0,0);
        // this.canvas.ctx.drawImage(this.currentgamecanvas,0,0);
        ctx.fillStyle = '#fff';
        ctx.fillText(Math.floor(t/1000),10,10);
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
        requestAnimationFrame(newtime=>this.update(newtime));
    }
    newBoard(){
        this.currentPointer = {x:-Infinity,y:-Infinity};
        this.markedCenters = new Collection();
        var grid = [];
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
class Game extends GameEnginge{
    constructor(c){
        super(c);
        this.canvasDim = {w :600 , h :600};
        // document.body.append(G.getEmojiSprite(`🚗`,64,1.3));
        G.loadImage('sh1.gif?'+Math.random(),img=>{
            this.cellSize = CELLSIZE;
            this.spriteEngine = new SpriteEngine(img);
            this.objects = [];
            // document.body.append(this.spriteEngine.Cave());
            // var cat = new Cat(this);
            // var catincar = cat.CatInCar();
            // document.body.append(catincar);
            // this.scene = new Minigame1(this);
            this.mainScene();
        })
        return;
    }
    prepheader(){
        var headerTable = G.GenTable(2,6);
        headerTable.style.width = this.canvasDim.w + "px";
        var entities = headerTable.entities;
        this.healthdom = document.createElement('div');
        this.pointsdom = document.createElement('div');
        this.leveldom = document.createElement('div');
        this.timedom = document.createElement('div');
        // entities[0][0].append(G.getEmojiSprite('💓',32,1.4));
        // entities[1][0].append(this.healthdom);
        // entities[0][1].append(G.getEmojiSprite('⓭',32,1.4));
        // entities[1][1].append(this.pointsdom);
        // entities[0][2].append(G.getEmojiSprite('⌛',32,1.4));
        // entities[1][2].append(this.timedom);
        // entities[0][4].append(`Level`);
        // entities[1][4].append(this.leveldom);
        entities[0][5].rowSpan = 2;
        entities[0][5].append(G.getEmojiSprite('📋',40,1.4));
        entities[1][5].remove();
        entities[0][5].onclick = ()=>{this.showMenu();}
        this.header.append(headerTable);
    }
    mainScene(){
        this.gameover = true;
        this.gamePased = true;
        this.resetBody();
        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.canvas.fill('#000');
        this.getMainMenuBg(this.canvas);
        this.body.append(this.canvas);
        this.showMenu();
    }
    showMenu(){
        this.gamePased = true;
        if(this.dialog != null){this.dialog.remove();}
        this.dialog = Object.assign(document.createElement('div'), { className: 'menuDialog'});
        var navItems = [];
        if(this.gameover){
            navItems.push({html : '<button >New Game</button>', f:'newgame'});
            navItems.push({html : '<button >Practice Combat</button>', f:'paracticecombat'});
        }
        else{
            navItems.push({html : '<button >Resume</button>', f:'resume'});
        }
        navItems.push(...[
            {html : `<button >Music ${this.config.music ? 'ON': 'OFF'}</button>`,   f:'music'},
        ]);
        if(!this.gameover){
            navItems.push({html : '<button >Quit</button>',   f:'quit'},);
        }
        var nav = G.GenTable(navItems.length,1);
        for(let i in navItems){
            var dom = G.makeDom(navItems[i].html)
            nav.entities[i][0].append(dom);
            nav.entities[i][0].onclick = ()=>{
                this.ApplyMenuItem(navItems[i].f);
            }
        }
        this.dialog.append(nav);
        this.body.append(this.dialog);
    }
    newGame(){
        this.resetBody();
        this.body.innerHTML = '';
        this.gamemap = new GameMap(this);
        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.body.innerHTML = '';
        this.body.appendChild(this.canvas);
        this.body.appendChild(this.helpdom);
        this.player = new Player(this);
        this.menuclickables = [
            new Clickable(0,0,CELLSIZE*1.5,CELLSIZE*1.5,G.getEmojiSprite('📋',CELLSIZE*1.5,1.4),(e)=>{this.showMenu()})
        ]
        this.objects = [
            this.player
        ]
        this.body.innerHTML = '';
        this.body.appendChild(this.canvas);
        this.body.appendChild(this.helpdom);
        this.update(0);
        this.events = {
            touchstart : false
        }
        window.addEventListener('keyup',(e)=>{
            if(e.key=='Escape'){
                this.showMenu();
            }
        })
        this.touchPos = null;
        this.canvas.addEventListener('mousedown', (e) => handleStart(e));
        this.canvas.addEventListener('mouseup', () => handleEnd());
        this.canvas.addEventListener('mousemove', (e) => handleMove(e));
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => handleStart(e));
        this.canvas.addEventListener('touchend', () => handleEnd());
        this.canvas.addEventListener('touchmove', (e) => handleMove(e));
        var handleEnd =()=>{this.touchPos = null;}
        var handleStart = (e)=>{
            G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt)=>{
                var x = pt.x;
                var y = pt.y;
                this.touchPos = { x: x, y: y };
            });
        }
        var handleMove = (e)=>{
            if (this.touchPos) {
                G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt)=>{
                    var x = pt.x;
                    var y = pt.y;
                    this.touchPos = { x: x, y: y };
                });
            }
        }
        return;
    }
    ApplyMenuItem(item){
        if(item == 'newgame'){
            this.gamePased = false;
            this.gameover = false;
            this.newGame();
        }
        else if(item == 'resume'){
            this.gamePased = false;
            this.dialog.remove();
            this.update(this.time);
        }
        else if(item == 'music'){
            if(!this.SoundSystem){
                this.SoundSystem = new SoundSystem();
            }
            var currentval = this.config.music;
            if(currentval){
                this.SoundSystem.stopBgm();
            }
            else{
                this.SoundSystem.startBgm();
            }
            this.config.music = !this.config.music;
            this.dialog.remove();
            this.showMenu();
        }
        else if(item == 'quit'){
            if(document.webkitIsFullScreen) document.exitFullscreen();
            this.gamePased = true;
            this.gameover = true;
            this.dialog.remove();
            this.mainScene();
        }
        else if(item == 'paracticecombat'){
            this.gamePased = true;
            this.dialog.remove();
            this.scene = new CombatScene(this,null,null,'garden',(e)=>{
                console.log('combat training over');
                this.scene = null;
                this.gamePased = true;
                this.gameover = true;
                this.dialog.remove();
                this.mainScene();
            });
        }
    }
    parseNum(v){
        if(v >= 10000000000) return `${(v/10000000000).toFixed(1)}T`;
        if(v >= 100000000) return `${(v/100000000).toFixed(1)}B`;
        if(v >= 1000000) return `${(v/1000000).toFixed(1)}M`;
        if(v >= 1000) return `${(v/1000).toFixed(1)}k`;
        return `${v}`;
    }
    updateBuffer(){
        var basemaplayout = this.gamemap.map;
        var ctx = basemaplayout.ctx;
        //draw player and objects on map
        this.player.draw(ctx);
        var startXY = this.player.getCameraStartXY();
        var cropmap = G.crop(basemaplayout,
            startXY.x,
            startXY.y,
            this.canvasDim.w,
            this.canvasDim.h
        );
        return cropmap;
    }
    genOverlayHidden(map,playerpos,r ){
        var mapOverlay = G.makeCanvas(map.w,map.h);
        mapOverlay.fill('#200445bf');
        var mapSee = G.makeCanvas(map.w,map.h);
        var circle = G.MakeCircle(r,null,'#fff');
        mapSee.ctx.drawImage(circle,playerpos.x - circle.w/2, playerpos.y - circle.h/2);
        var overlay = G.fuseImage(mapOverlay,mapSee,'destination-out');
        return overlay;
    }
    drawVisibilityOverlay(ctx, playerPos, visibilityRadius, darkness = 0.9) {
        ctx.save();
        ctx.globalAlpha = darkness; // 0.0 (transparent) to 1.0 (fully dark)
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(
            playerPos.x,
            playerPos.y,
            visibilityRadius,
            0, Math.PI * 2
        );
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.restore();
    }
    update(t){
        if(this.gamePased == true){return;}
        if(this.gameover == true) return this.gameOverScene();
        this.objects.forEach(x=> x.update(t));
        var basemaplayout = this.gamemap.getMap();
        var bufferctx = basemaplayout.ctx;
        
        // var overlay = this.genOverlayHidden(basemaplayout,this.player.center,this.player.visibility);
        //draw player and objects on map
        this.objects.sort((a, b) => {return a.pos ? a.pos?.y : Infinity - b.pos ? b.pos?.y : Infinity;});
        this.objects.forEach(x=> x.draw(bufferctx));
        // this.drawVisibilityOverlay(bufferctx,this.player.center,this.player.visibility);
        var startX = Math.max(0,this.player.center.x - this.canvasDim.w / 2);
        var startY = Math.max(0,this.player.center.y - this.canvasDim.h / 2);
        var crop = G.crop(basemaplayout,
            startX,
            startY,
            this.canvasDim.w,
            this.canvasDim.h
        );
        


        // this.canvas.fill('#fff');
        this.canvas.ctx.drawImage(crop,0,0);
        this.canvas.ctx.fillRect
        this.menuclickables.forEach(x=> x.draw(this.canvas.ctx));
        if(this.touchPos){
            this.objects.forEach(x=> {if(x.handleTouchPos) x.handleTouchPos(this.touchPos)});
            this.menuclickables.forEach(x=> {if(x.handleTouchPos) x.handleTouchPos(this.touchPos)});
            this.touchPos = null;
        }
        this.time = t;
        requestAnimationFrame(newtime=>this.update(newtime));
    }
    parseTime(s){
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);
        h = h == 0 ? '' : h < 10 ? `0${h}:` : `${h}:`;
        m = Math.floor(m % 60);
        m = m == 0 ? '' : m < 10 ? `0${m}:` : `${m}:`;
        s = Math.floor(s % 60);
        return `${h}${m}${s}`;
    }
    getThumbnail(){
        var canvas = G.makeCanvas(320,320);
        var space = G.randomPattern('#000','#fff',0.001,500,500);
        var gamename = G.getTextSprite(`FAMILIAR`,   16, `#fff`, 1.5, 'cursive');
        var pos = G.Point({x:canvas.w/2,y:canvas.h/2});
        canvas.fillPatern(space);
        canvas.ctx.drawImage(gamename,canvas.w/2-gamename.w/2,canvas.h-gamename.h*2);
        return canvas;
    }
    getCover(){
        var canvas = G.makeCanvas(800,500);
        var space = G.randomPattern('#000','#fff',0.001,500,500);
        var gamename = G.getTextSprite(`FAMILIAR`,   32, `#fff`, 1.5, 'cursive');
        var pos = G.Point({x:canvas.w/2,y:canvas.h/2});
        canvas.fillPatern(space);
        canvas.ctx.drawImage(gamename,0,canvas.h-gamename.h*2);
        return canvas;
    }
    getMainMenuBg(canvas){
        var scene = new SummoningCatScene(this);
        scene.draw(canvas);
        function update(t){
            scene.update(t);
            scene.draw(canvas);
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }
}
class SummoningCatScene{
    constructor(game){
        this.game = game;
        this.cat = new Cat(game);
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
        var centerX = this.canvas.w/2;
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
    draw(canvas){
        canvas.ctx.drawImage(this.canvas,0,0);
    }
    update(t){
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
document.addEventListener('DOMContentLoaded', function () {
    window.game = new Game("");
}, false);