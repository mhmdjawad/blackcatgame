import type { GameCanvasElement } from "../classes/interface";
import G from "./G";
function ccc(ctx : CanvasRenderingContext2D,color : string,x : number,y: number,w: number,h: number,r1: number,r2: number){
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x,y,w,h,r1,r2,Math.PI*2);
    ctx.fill();
    ctx.restore();
}
export default class SpriteEngine{
    black_cat : GameCanvasElement;
    red_witch : GameCanvasElement;
    mapBlueprint : GameCanvasElement;
    dungeonprint1 : GameCanvasElement;
    constructor(img : any){
        if(img == null){
            img = G.makeCanvas(128,128);
        }
        var imgCanvas = G.imgToCanvas(img);
        var mat = G.getColorMatrix(imgCanvas,(r = '')=>{
            if(r == '') return null;
            if(r == '#fff') return null;
            if(r == '#ffffff') return null;
            return r;
        });
        var cvs = G.colorsMatrixToSprite(mat,1);
        this.black_cat = G.crop(cvs,0,0,32,32);
        this.red_witch = G.crop(cvs,32,0,32,32);
        this.mapBlueprint = G.crop(cvs,0,32,64,64);
        this.dungeonprint1 = G.crop(cvs,0,80,16,16);
    }
    AnimateCat(){
        var mainSprite = G.imgToCanvas(this.black_cat);
        var sprites = [];
        var parts : any = {
            tail : [27,20,4,6],
            leftFoot : [7,29,8,3],
            rightFoot : [17,29,8,3],
            leftArm : [5,15,5,7],
            rightArm: [22,15,5,7]
        };
        function crp(values : any[]){
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
        function drawSpecs(LF : any,RF : any,T : any,LA : any,RA : any){
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
    Cave(w = 0,h = 0){
        var canvas = G.makeCanvas(w,h);
        var emoji = G.getEmojiSprite(`🪨`,w,1.3);
        canvas.ctx.drawImage(emoji,0,0);
        ccc(canvas.ctx,'#000',canvas.w/1.6,canvas.h,canvas.w/4,canvas.h/3,0,0);
        return canvas;
    }
    static GenCozyWallTile(tileSize = 64) {
        const canvas = G.makeCanvas(tileSize,tileSize);
        const ctx = canvas.ctx;
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
        var grass = SpriteEngine.GenGrassTile(w,h);
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
}