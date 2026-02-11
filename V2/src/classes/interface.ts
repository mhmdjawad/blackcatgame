import type Point from "./Point";

export class GameCanvasElement extends HTMLCanvasElement {
    w: number = 0;
    h: number = 0;
    ctx: CanvasRenderingContext2D = new CanvasRenderingContext2D;
    center: { x: number; y: number } = {x:0,y:0};
    clear: () => void = ()=>{};
    fill: (color: string) => void = ()=>{};
    stroke: (color: string,thickness : number) => void = ()=>{};
    fillRect: (color: string,x:number,y:number,w:number,h:number) => void = ()=>{};
    fillPatern: (img: CanvasImageSource) => void = ()=>{};
    drawCentered : (canvas : GameCanvasElement) => void = ()=>{};
    drawBottomCenter : (canvas : GameCanvasElement, offset :number) => void = ()=>{};
    drawRelative : (canvas : GameCanvasElement, center : Point) => void = ()=>{};
    constructor(){
        super();
    }

}
export class GameTableElement extends HTMLTableElement{
    entities : HTMLTableCellElement[][] = [];
    constructor(){
        super();
    }
}
export class NavItem{
    html : string = '';
    f : string = '';
}
export class Spell{
    i : string = '';
    r: string = '';
    isattack :boolean = false;     
    dmg : number = 0;
    spd : number = 0;
}
export class GameConfig{
    music : boolean = false;
    sound : boolean = false;
    controls: boolean = false;
}
export class Animation{
    framerate : number = 0;
    frame:number = 0;
    spriteindex:number = 0;
    spritesheet : any[] = [];
}
export class CardElement{
    v:string = '';
    e:string = '';
    s:GameCanvasElement = new GameCanvasElement;
    sd:GameCanvasElement = new GameCanvasElement;
    c:string = '';
}