import { GameCanvasElement } from "../interface";
import type Game from "../game/game";
export default class Cat{
    animations : GameCanvasElement[];
    constructor(game : Game){
        this.animations = game.spriteEngine?.AnimateCat() ?? []; 
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
}