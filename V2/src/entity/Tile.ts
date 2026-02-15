import ColorHelper from "../classes/ColorHelper";
import type { GameCanvasElement } from "../classes/interface";
import G from "../util/G";
import PackedImage4 from "../util/PackedImage4";
import PixelFontE from "../util/PixelFontE";
import { sprite_fire,sprite_earth, sprite_mana, sprite_water, sprite_wind } from "../storage/sprites";
export default class Tile{
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
            case "mana" : return 2;
            case "fire" : case "water" : return 1;
            case "earth" : case "wind" : return 1;
            case "heart" : return 1;
            default : return 1;
        }
    }
    static getTileSprite(type:string, size:number, level:number  = 0){
        var canvas = G.makeCanvas(size,size);
        var object = sprite_mana;
        if(type == "mana") object = sprite_mana;
        else if(type == "water") object = sprite_water;
        else if(type == "fire") object = sprite_fire;
        else if(type == "wind") object = sprite_wind;
        else if(type == "earth") object = sprite_earth;
        var decoded = PackedImage4.decodeObj(object);
        var innersprite = G.colorsMatrixToSprite(decoded,1,(r:any)=>{return r});
        var color = ColorHelper.darken(object.palette[1]??"#ffffff",2);
        var color2 = ColorHelper.darken(object.palette[1]??"#ffffff",5);
        canvas.fill(color);
        canvas.ctx.drawImage(innersprite,4,4,canvas.w - 8,canvas.h - 8);
        if(level > 0){
            var levelSprite = PixelFontE.getLineShadowed(`${level}`,2,'#fff','#000');
            canvas.drawBottomCenter(levelSprite,4);
        }
        canvas.stroke(color2,4);
        return canvas;
    }
    getSprite(type:string,size:number,level:number){
        return Tile.getTileSprite(type,size,level);
    }
    update(t=0){
        var delta = t - this.time;
        if(delta > 1000){
            this.time = t;
        }
    }
}