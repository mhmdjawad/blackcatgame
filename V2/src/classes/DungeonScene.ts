import Game from "../game/game";
import { Portal } from "./Map";
import Player from "./Player";
import Point from "./Point";
import G from "../util/G";
export default class DungeonScene{
    game : Game;
    portal : Portal;
    player : Player;
    playeroldpos : Point;
    constructor(game : Game,portal : Portal,player : Player){
        this.game = game;
        this.portal = portal;
        this.player = player;
        this.playeroldpos = G.Point(player.center);
        game.body.innerHTML = 'dungeon scene under construction, visit pdemia.com/bcg for updates ^_^ ....';
        var btnback = G.makeDom('<button>back</button>');
        btnback.onclick = ()=>{
            game.body.innerHTML = '';
            game.body.append(game.canvas);
            // game.gamePased = false;
            // game.dialog.remove();
            // game.update(game.time);
        }
        game.body.append(btnback);
    }
    update(){
        
    }
}