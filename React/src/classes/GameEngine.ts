import { GameConfig } from "../interface";
import Player from "./Player";
import G from "../util/G";
import { CELLSIZE, GameDimC } from "../util/const";
export class GameEngine{
    config :GameConfig;
    windowaspect : number;
    helpdom : HTMLDivElement;
    layout : HTMLDivElement = G.makeDom('');
    header : HTMLDivElement = G.makeDom('');
    body : HTMLDivElement = G.makeDom('');
    footer : HTMLDivElement = G.makeDom('');
    player: Player = new Player(this);
    constructor(){
        this.config = {
            music : false,
            sound : false,
            controls:false
        };
        this.resetBody();
        this.preLoading();
        this.windowaspect = window.innerHeight/window.innerWidth;
        // if(this.windowaspect > 1){
        //     CELLSIZE = 16*2;
        // }
        // GameDimR = Math.floor(window.innerHeight/CELLSIZE) - 2.5;
        // GameDimC = Math.floor(window.innerWidth/CELLSIZE)- 1;
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
            entities[k.r][k.c].addEventListener('touchstart',()=> this.player.keys.keydown(k.f));
            entities[k.r][k.c].addEventListener('touchend',()=> this.player.keys.keyup(k.f));
            entities[k.r][k.c].addEventListener('mousedown',()=> this.player.keys.keydown(k.f));
            entities[k.r][k.c].addEventListener('mouseup',()=> this.player.keys.keyup(k.f));
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