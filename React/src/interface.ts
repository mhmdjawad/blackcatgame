class GameCanvasElement extends HTMLCanvasElement {
    w: number = 0;
    h: number = 0;
    ctx: CanvasRenderingContext2D = new CanvasRenderingContext2D;
    center: { x: number; y: number } = {x:0,y:0};
    clear: () => void = ()=>{};
    fill: (color: string) => void = ()=>{};
    fillPatern: (img: CanvasImageSource) => void = ()=>{};
    constructor(){
        super();
    }

}
class GameTableElement extends HTMLTableElement{
    entities : HTMLTableCellElement[][] = [];
    constructor(){
        super();
    }
}
class NavItem{
    html : string = '';
    f : string = '';
}
class Spell{
    i : string = '';
    r: string = '';
    isattack :boolean = false;     
    dmg : number = 0;
    spd : number = 0;
}
class GameConfig{
    music : boolean = false;
    sound : boolean = false;
    controls: boolean = false;
}
class Animation{
    framerate : number = 0;
    frame:number = 0;
    spriteindex:number = 0;
    spritesheet : any[] = [];
}
class CardElement{
    v:string = '';
    e:string = '';
    s:GameCanvasElement = new GameCanvasElement;
    sd:GameCanvasElement = new GameCanvasElement;
    c:string = '';
}
export {GameCanvasElement,GameTableElement,NavItem,Spell, GameConfig, Animation, CardElement}