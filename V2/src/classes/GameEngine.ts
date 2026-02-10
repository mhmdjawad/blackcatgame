import { GameConfig } from "./interface"
import G from "../util/G";
export class GameEngine{
    config :GameConfig;
    windowaspect : number;
    helpdom : HTMLDivElement;
    layout : HTMLDivElement = G.makeDom('');
    header : HTMLDivElement = G.makeDom('');
    body : HTMLDivElement = G.makeDom('');
    footer : HTMLDivElement = G.makeDom('');
    container : HTMLElement;
    constructor(containerId : string){
        this.config = {
            music : false,
            sound : false,
            controls:false
        };
        var containerElement = document.getElementById(containerId);
        if(containerElement == null){
            var containerDom = G.makeDom(`<div id="${containerId}"></div>`);
            document.body.appendChild(containerDom);
            this.container = containerDom;
        }
        else{
            this.container = containerElement
        }
        this.container.innerHTML = ``;
        this.resetBody();
        this.preLoading();
        this.windowaspect = window.innerHeight/window.innerWidth;
        this.helpdom = document.createElement('div');
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
        this.container.innerHTML = ``;
        this.container.appendChild(this.layout);
    }
}