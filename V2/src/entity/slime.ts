import type { GameCanvasElement } from "../classes/interface";
import Point from "../classes/Point";
import G from "../util/G";
import PackedImage4 from "../util/PackedImage4";
import Enemy from "./Enemy";
const slimeSprite = {"w":32,"h":32,"palette":[null,"#639bff","#5b6ee1"],"data":[83,0,2,85,5,0,1,5,2,85,1,80,4,0,4,85,3,0,1,1,4,85,1,64,2,0,1,5,4,85,1,80,2,0,1,21,4,85,1,84,2,0,6,85,1,0,1,1,1,85,1,169,2,85,1,106,1,85,1,64,1,1,1,86,1,170,2,85,1,170,1,149,1,64,1,5,1,86,1,170,2,85,1,170,1,149,1,80,1,5,1,86,1,170,2,85,1,170,1,149,1,80,1,21,1,85,1,169,2,85,1,106,1,85,1,84,1,21,6,85,1,84,1,21,6,85,1,84,1,21,6,85,1,84,1,21,6,85,1,84,1,21,6,85,1,84,1,21,6,85,1,84,1,21,6,85,1,84,1,5,6,85,1,80,1,5,6,85,1,80,1,1,6,85,1,64]};
export default class Slime extends Enemy{
    constructor(center:Point, level = 1){
        super(center,Math.ceil(3*(level*1.1)));
        this.sprite = Slime.getSprite(2);
    }
    static getSprite(mult : number = 1){
        var decoded = PackedImage4.decodeObj(slimeSprite);
        var innersprite = G.colorsMatrixToSprite(decoded,mult,(r:any)=>{return r});
        return innersprite;
    }
    update(t=0){
        var delta = t - this.time;
        if(delta > 30){
            this.time = t;
            this.center.x -= 1;
        }

    }
}