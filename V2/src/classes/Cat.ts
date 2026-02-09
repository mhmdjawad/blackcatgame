import { GameCanvasElement } from "./interface";
import PackedImage8 from "../util/PackedImage8";
import G from "../util/G";
const imageInfo = {"w":32,"h":32,
    "palette":[null,"#000000","#121212","#fbf236","#d9a066","#222034"],
    "data":[7,0,1,1,16,0,1,1,13,0,1,1,1,2,1,1,14,0,1,1,1,2,1,1,12,0,1,1,2,2,1,1,12,0
        ,1,1,2,2,1,1,12,0,1,1,3,2,1,1,2,0,6,1,2,0,1,1,3,2,1,1,12,0,1,1,4,2,2,1,6,2,2
        ,1,4,2,1,1,12,0,1,1,18,2,1,1,12,0,1,1,5,2,2,3,4,2,2,3,5,2,1,1,13,0,1,1,3,2,1
        ,3,2,1,1,3,2,2,1,3,2,1,1,3,3,2,1,1,14,0,1,1,2,2,2,3,2,1,1,3,2,2,1,3,2,1,2,3,2
        ,2,1,1,14,0,1,1,3,2,1,3,2,1,1,3,2,2,1,3,2,1,1,3,3,2,1,1,14,0,1,1,4,2,2,3,4,2,
        2,3,4,2,1,1,14,0,1,1,16,2,1,1,16,0,1,1,5,2,2,4,5,2,1,1,19,0,1,1,10,2,1,1,20,0,
        1,1,10,5,1,1,19,0,1,1,12,2,1,1,17,0,1,1,14,2,1,1,15,0,1,1,16,2,1,1,13,0,1,1,18
        ,2,1,1,11,0,1,1,3,2,1,1,12,2,1,1,3,2,1,1,10,0,1,1,2,2,1,1,1,0,1,1,10,2,1,1,1,0
        ,1,1,2,2,1,1,2,0,2,1,6,0,3,1,2,0,1,1,10,2,1,1,2,0,3,1,1,0,1,1,1,2,1,1,11,0,1,1,
        10,2,1,1,6,0,1,1,1,2,1,1,11,0,1,1,10,2,7,1,2,2,1,1,12,0,1,1,2,2,1,1,2,0,1,1,11,
        2,1,1,13,0,1,1,2,2,1,1,2,0,1,1,2,2,9,1,14,0,1,1,2,2,1,1,2,0,1,1,2,2,1,1,22,0,1,
        1,2,2,1,1,2,0,1,1,2,2,1,1,22,0,1,1,2,2,1,1,2,0,1,1,2,2,1,1,19,0,3,1,3,2,1,1,2,0
        ,1,1,3,2,3,1,15,0,1,1,6,2,1,1,2,0,1,1,6,2,1,1,14,0,8,1,2,0,8,1,7,0]};
export default class Cat{
    sprite : GameCanvasElement;
    animations : GameCanvasElement[];
    constructor(){
        this.sprite = Cat.extractImage();
        this.animations = Cat.AnimateCat(G.imgToCanvas(this.sprite));
    }
    static extractImage(){
        var decoded = PackedImage8.decode(imageInfo.w,imageInfo.h,imageInfo.palette,new Uint8Array(imageInfo.data));
        var canvas = G.colorsMatrixToSprite(decoded);
        return canvas;
    }
    static AnimateCat(mainSprite : GameCanvasElement){
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
    Idle(){
        return this.sprite;
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
}