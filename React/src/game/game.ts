import type { GameCanvasElement,NavItem } from "../classes/interface";
import G from "../util/G";
import { CELLSIZE } from "../util/const";
import { GameEngine } from "../classes/GameEngine";
import SpriteEngine from "../util/SpriteEngine";
import { GameMap } from "../classes/Map";
import Player from "../classes/Player";
import { Portal } from "../classes/Map";
import Clickable from "../classes/Clickable";
import SoundSystem from "../util/SoundSystem";
import Intro from "../scenes/Intro";
import CombatScene from "../classes/CombatScene";
import DungeonScene from "../classes/DungeonScene";
import SummoningCatScene from "../scenes/SummoningCatScene";
let GameDimC = 10;
class Game extends GameEngine{
    spriteEngine : SpriteEngine = new SpriteEngine(null);
    cellSize : number = 0;
    objects : any[] = [];
    canvasDim : {w:number,h:number};
    canvas : GameCanvasElement = G.makeCanvas();
    gamemap : GameMap | null = null;
    gamePased : boolean = false;
    dialog : HTMLElement = G.makeDom('');
    time : number = 0;
    healthdom : HTMLElement = G.makeDom('');
    pointsdom : HTMLElement = G.makeDom('');
    leveldom : HTMLElement = G.makeDom('');
    timedom : HTMLElement = G.makeDom('');
    gameover : boolean = true;
    player : Player = {} as Player
    portals : Portal[] = [];
    menuclickables : Clickable[] = [];
    scene : any = null;
    events:any = {};
    touchPos:any = {};
    SoundSystem : SoundSystem | null = null;
    
    constructor(){
        super();
        this.canvasDim = {w :600 , h :600};
        G.loadImage('sh1.gif?'+Math.random(),(img : any)=>{
            this.cellSize = CELLSIZE;
            this.spriteEngine = new SpriteEngine(img);
            this.objects = [];
            // new MakeCoverAndThumbnail(this);
            this.mainScene();
        })
        return;
    }
    prepheader(){
        var headerTable = G.GenTable(2,6);
        headerTable.style.width = this.canvasDim.w + "px";
        var entities = headerTable.entities;
        this.healthdom = document.createElement('div');
        this.pointsdom = document.createElement('div');
        this.leveldom = document.createElement('div');
        this.timedom = document.createElement('div');
        // entities[0][0].append(G.getEmojiSprite('💓',32,1.4));
        // entities[1][0].append(this.healthdom);
        // entities[0][1].append(G.getEmojiSprite('⓭',32,1.4));
        // entities[1][1].append(this.pointsdom);
        // entities[0][2].append(G.getEmojiSprite('⌛',32,1.4));
        // entities[1][2].append(this.timedom);
        // entities[0][4].append(`Level`);
        // entities[1][4].append(this.leveldom);
        entities[0][5].rowSpan = 2;
        entities[0][5].append(G.getEmojiSprite('📋',40,1.4));
        entities[1][5].remove();
        entities[0][5].onclick = ()=>{this.showMenu();}
        this.header.append(headerTable);
    }
    mainScene(){
        this.gameover = true;
        this.gamePased = true;
        this.resetBody();
        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.canvas.fill('#000');
        this.getMainMenuBg(this.canvas);
        this.body.append(this.canvas);
        this.showMenu();
    }
    showMenu(){
        this.gamePased = true;
        if(this.dialog != null){this.dialog.remove();}
        this.dialog = Object.assign(document.createElement('div'), { className: 'menuDialog'});
        var navItems : NavItem[] = [];
        if(this.gameover){
            navItems.push({html : '<button >New Game</button>', f:'newgame'});
            navItems.push({html : '<button >Practice Combat</button>', f:'paracticecombat'});
        }
        else{
            navItems.push({html : '<button >Resume</button>', f:'resume'});
        }
        navItems.push(...[
            {html : `<button> About </button>`,   f:'about'},
            {html : `<button >Music ${this.config.music ? 'ON': 'OFF'}</button>`,   f:'music'},
        ]);
        if(!this.gameover){
            navItems.push({html : '<button >Quit</button>',   f:'quit'},);
        }
        var nav = G.GenTable(navItems.length,1);
        for(let i in navItems){
            var dom = G.makeDom(navItems[i].html)
            nav.entities[i][0].append(dom);
            nav.entities[i][0].onclick = ()=>{
                this.ApplyMenuItem(navItems[i].f);
            }
        }
        this.dialog.append(nav);
        this.body.append(this.dialog);
    }
    newGame(){
        this.resetBody();
        this.body.innerHTML = '';
        this.gamemap = new GameMap(this);
        this.portals = this.gamemap.locations_portal.map(loc => new Portal(this,loc));

        this.canvas = G.makeCanvas(this.canvasDim.w,this.canvasDim.h);
        this.body.innerHTML = '';
        this.body.appendChild(this.canvas);
        this.body.appendChild(this.helpdom);
        this.player = new Player(this);
        this.menuclickables = [
            new Clickable(0,0,CELLSIZE*1.5,CELLSIZE*1.5,G.getEmojiSprite('📋',CELLSIZE*1.5,1.4),()=>{this.showMenu()})
        ]
        this.objects = [
            this.player,
            ...this.portals
        ]
        this.body.innerHTML = '';
        this.body.appendChild(this.canvas);
        this.body.appendChild(this.helpdom);
        this.update(0);
        this.scene = new Intro(this);
        this.events = {
            touchstart : false
        }
        this.touchPos = null;
        this.canvas.addEventListener('mousedown', (e) => handleStart(e));
        this.canvas.addEventListener('mouseup', () => handleEnd());
        this.canvas.addEventListener('mousemove', (e) => handleMove(e));
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => handleStart(e));
        this.canvas.addEventListener('touchend', () => handleEnd());
        this.canvas.addEventListener('touchmove', (e) => handleMove(e));
        var handleEnd =()=>{this.touchPos = null;}
        var handleStart = (e : any)=>{
            G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt: any)=>{
                var x = pt.x;
                var y = pt.y;
                this.touchPos = { x: x, y: y };
            });
        }
        var handleMove = (e: any)=>{
            if (this.touchPos) {
                G.mapClick(e.touches ? e.touches[0] : e,this.canvas,(pt: any)=>{
                    var x = pt.x;
                    var y = pt.y;
                    this.touchPos = { x: x, y: y };
                });
            }
        }
        return;
    }
    ApplyMenuItem(item: any){
        if(item == 'newgame'){
            this.gamePased = false;
            this.gameover = false;
            this.newGame();
        }
        else if(item == 'resume'){
            this.gamePased = false;
            this.dialog.remove();
            this.update(this.time);
        }
        else if(item == 'music'){
            if(!this.SoundSystem){
                this.SoundSystem = new SoundSystem();
            }
            var currentval = this.config.music;
            if(currentval){
                this.SoundSystem.stopBgm();
            }
            else{
                this.SoundSystem.startBgm();
            }
            this.config.music = !this.config.music;
            this.dialog.remove();
            this.showMenu();
        }
        else if(item == 'quit'){
            if(document.fullscreenEnabled) document.exitFullscreen();
            this.gamePased = true;
            this.gameover = true;
            this.dialog.remove();
            this.mainScene();
        }
        else if(item == `about`){
            if(this.dialog != null){this.dialog.remove();}
            this.dialog = Object.assign(document.createElement('div'), { className: 'menuDialog'});
            this.dialog.style.width = `${GameDimC*CELLSIZE}px`;
            var h2 = `
                <div class="helpDiv" color='#fff'>
                    <h1>GAME STILL UNDER CONSTRUCTION</h1>
                    <h3>entry in js13k games 2025</h3>
                    <h3>visit <a href="https://pdemia.com/bcg">pdemia.com/bcg<a> for updates</h3>
                    <h3>last update 12/9/2025 </h3>
                    <p>mohammad0jawad@gmail.com</p>
                </div>
            `;
            var mdom = G.makeDom('<button>Back</button>');
            mdom.onclick = ()=>{
                this.gamePased = false;
                this.dialog.remove();
                this.showMenu();
                // this.update(this.time);
            }
            this.dialog.innerHTML += h2;
            this.dialog.append(mdom);
            this.body.append(this.dialog);
        }
        else if(item == 'paracticecombat'){
            this.gamePased = true;
            this.dialog.remove();
            this.scene = new CombatScene(this,null,null,'garden',()=>{
                console.log('combat training over');
                this.scene = null;
                this.gamePased = true;
                this.gameover = true;
                this.dialog.remove();
                this.mainScene();
            });
        }
    }
    parseNum(v : number){
        if(v >= 10000000000) return `${(v/10000000000).toFixed(1)}T`;
        if(v >= 100000000) return `${(v/100000000).toFixed(1)}B`;
        if(v >= 1000000) return `${(v/1000000).toFixed(1)}M`;
        if(v >= 1000) return `${(v/1000).toFixed(1)}k`;
        return `${v}`;
    }
    updateBuffer(){
        var gamemap = this.gamemap as GameMap;
        var basemaplayout = gamemap.map;
        var ctx = basemaplayout.ctx;
        //draw player and objects on map
        this.player.draw(ctx);
        var startXY = this.player.getCameraStartXY();
        var cropmap = G.crop(basemaplayout,
            startXY.x,
            startXY.y,
            this.canvasDim.w,
            this.canvasDim.h
        );
        return cropmap;
    }
    gameOverScene(){

    }
    update(t = 0){
        if(this.gamePased == true){return;}
        if(this.gameover == true) return this.gameOverScene();
        this.objects.forEach(x=> x.update(t));
        var basemaplayout = this.gamemap?.getMap() ?? G.EmptyCanv();
        var bufferctx = basemaplayout.ctx;
        //draw player and objects on map
        this.objects.sort((a, b) => {return a.pos ? a.pos?.y : Infinity - b.pos ? b.pos?.y : Infinity;});
        this.objects.forEach(x=> x.draw(bufferctx));
        var startX = Math.max(0,this.player.center.x - this.canvasDim.w / 2);
        var startY = Math.max(0,this.player.center.y - this.canvasDim.h / 2);
        var crop = G.crop(basemaplayout,
            startX,
            startY,
            this.canvasDim.w,
            this.canvasDim.h
        );
        this.canvas.fill('#88bfff');
        this.canvas.ctx.drawImage(crop,0,0);
        this.canvas.ctx.fillRect
        this.menuclickables.forEach(x=> x.draw(this.canvas.ctx));
        if(this.touchPos){
            this.objects.forEach(x=> {if(x.handleTouchPos) x.handleTouchPos(this.touchPos)});
            this.menuclickables.forEach(x=> {if(x.handleTouchPos) x.handleTouchPos(this.touchPos)});
            this.touchPos = null;
        }
        this.time = t;
        requestAnimationFrame(newtime=>this.update(newtime));
    }
    openPortalMenu(portal : Portal){
        if(this.dialog != null){this.dialog.remove();}
        this.dialog = Object.assign(document.createElement('div'), { className: 'menuDialog'});
        var infodom = G.makeDom(`<div><h3>Portal Level ${portal.level}<h3></div>`);
        infodom.style.height = this.canvas.height/2 + 'px';
        this.dialog.append(infodom);
        var nav = G.GenTable(2,1);
        nav.entities[0][0].innerHTML = '<button >Enter</button>';
        nav.entities[0][0].onclick = ()=>{
            this.dialog.remove();
            this.gamePased = true;//disable main flow
            this.scene = new DungeonScene(this,portal,this.player);
        }
        nav.entities[1][0].innerHTML = '<button >Leave</button>';
        nav.entities[1][0].onclick = ()=>{
            this.dialog.remove();
        }
        this.dialog.append(nav);
        this.body.append(this.dialog);
    }
    getMainMenuBg(canvas : GameCanvasElement){
        var scene = new SummoningCatScene(this);
        scene.draw(canvas);
        function update(){
            scene.update();
            scene.draw(canvas);
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }
}
export default Game;