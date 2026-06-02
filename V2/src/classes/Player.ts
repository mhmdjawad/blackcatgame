import G from "../util/G";
import MergeCalculator from "../util/MergeCalculator";
import PixelFontE from "../util/PixelFontE";
import Cat from "./Cat";
import { GameCanvasElement } from "./interface";
import Point from "./Point";

export default class Player{
    sprite : GameCanvasElement;
    statSprite : GameCanvasElement;
    life : number = 20;
    maxLife : number = 20;
    mana :number = 100;
    maxMAna : number = 100;
    manaPerOrb : number = 1;
    healthPerHeart: number = 1;
    constructor(){
        this.sprite = Cat.extractImageX(2);
        this.statSprite = this.getStatSprite();
    }
    CanUseMana(amount:number){
        return this.mana >= amount;
    }
    UseHealth(amount:number){
        if(this.life >= amount){
            this.life -= amount;
            this.updateStatSprite();
            return true;
        }
        return false;
    }
    UseMana(amount:number){
        if(this.mana >= amount){
            this.mana -= amount;
            this.updateStatSprite();
            return true;
        }
        return false;
    }
    AddMana(orbcount:number){
        var gain = MergeCalculator.calculateGain(orbcount) * this.manaPerOrb;
        this.mana += gain;
        if(this.mana > this.maxMAna) this.mana = this.maxMAna;
        this.updateStatSprite();
    }
    AddHealth(heartCount: number){
        var gain = MergeCalculator.calculateGain(heartCount) * this.healthPerHeart;
        this.life += gain;
        if(this.life > this.maxLife) this.life = this.maxLife;
        this.updateStatSprite();
    }
    getStatSprite(){
        var canvas = G.makeCanvas(400,8*3*2);
        // canvas.fill('#000');
        var HPsprt = PixelFontE.getLineShadowed(`HP`,3,'#f00','#000');
        var MPsprt = PixelFontE.getLineShadowed(`MP`,3,'#0ff','#000');
        canvas.ctx.drawImage(HPsprt,0,0);
        canvas.ctx.drawImage(MPsprt,0,8*3);
        canvas.ctx.fillStyle = '#f00';
        var hpasDist = (canvas.w - MPsprt.w) * this.life/this.maxLife; 
        var mpasDist = (canvas.w - MPsprt.w) * this.mana/this.maxMAna; 
        canvas.ctx.fillRect(HPsprt.w, 0,    hpasDist,HPsprt.h);
        canvas.ctx.fillStyle = '#0ff';
        canvas.ctx.fillRect(HPsprt.w, 8*3,  mpasDist,MPsprt.h);       
        return canvas;
    }
    updateStatSprite(){
        this.statSprite = this.getStatSprite();
    }
    update(){
        
    }
}