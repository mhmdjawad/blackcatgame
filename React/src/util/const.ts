import { Spell } from "../interface";
export const CELLSIZE = 64;
export const GameDimC = 10;
export const ELEMENTS = ['🔥','💧','🌱','🌪️','⚡','☀️','🌑'];
// const EMOJI = G.getEmojiSprite(`💓`,64,1.3);
// const EMOJI = G.getEmojiSprite(`△`,64,1.3);
// const EMOJI = G.getEmojiSprite(`🎒`,64,1.3);
export var ELEMENTALS = [
    {v:'m', e:'🔮', c:'#f00'},
    {v:'f', e:'🔥', c:'#f00'},
    {v:'w', e:'💧', c:'#00f'},
    {v:'e', e:'🌱', c:'#0a0'},
    {v:'i', e:'🌪️', c:'#aaa'},
    {v:'z', e:'⚡', c:'#ff0'},
    {v:'l', e:'☀️', c:'#ffb'},
    {v:'d', e:'🌑', c:'#555'},
];
export const SPELLBOOK : Spell[] = [
    {i : 'mmmmmm', r: 'm',  isattack :true,     dmg : 100 , spd : 0},
    {i : 'mmmmm', r: 'm',  isattack :true,     dmg : 40 , spd : 0},
    {i : 'mmmm', r: 'm',  isattack :true,     dmg : 15 , spd : 0},
    {i : 'mmm', r: 'm',  isattack :true,     dmg : 5 , spd : 0},
    {i : 'mm', r: 'm',  isattack :true,     dmg : 3 , spd : 0},
    {i : 'ff', r: 'm',  isattack :false,    dmg : 0 , spd : 0},
    {i : 'ww', r: 'm',  isattack :false,    dmg : 0 , spd : 0},
    {i : 'ee', r: 'm',  isattack :false,    dmg : 0 , spd : 0},
    {i : 'ii', r: 'm',  isattack :false,    dmg : 0 , spd : 0},
    {i : 'zz', r: 'm',  isattack :false,    dmg : 0 , spd : 0},
    {i : 'll', r: 'm',  isattack :false,    dmg : 0 , spd : 0},
    {i : 'dd', r: 'm',  isattack :false,    dmg : 0 , spd : 0},
    {i : 'mf', r: 'f',  isattack :true,     dmg : 3 , spd : 0},
    {i : 'mw', r: 'w',  isattack :true,     dmg : 3 , spd : 0},
    {i : 'me', r: 'e',  isattack :true,     dmg : 3 , spd : 0},
    {i : 'mi', r: 'i',  isattack :true,     dmg : 3 , spd : 0},
    {i : 'mz', r: 'z',  isattack :true,     dmg : 3 , spd : 0},
    {i : 'ml', r: 'l',  isattack :true,     dmg : 3 , spd : 0},
    {i : 'md', r: 'd',  isattack :true,     dmg : 3 , spd : 0},
    {i : 'mff', r: 'f',     isattack :true,     dmg : 7 , spd : 0},
    {i : 'mww', r: 'w',     isattack :true,     dmg : 7 , spd : 0},
    {i : 'mee', r: 'e',     isattack :true,     dmg : 7 , spd : 0},
    {i : 'mii', r: 'i',     isattack :true,     dmg : 7 , spd : 0},
    {i : 'mzz', r: 'z',     isattack :true,     dmg : 7 , spd : 0},
    {i : 'mll', r: 'l',     isattack :true,     dmg : 7 , spd : 0},
    {i : 'mdd', r: 'ld',    isattack :true,     dmg : 7 , spd : 0},
    {i : 'mfff', r: 'f',    isattack :true,     dmg : 15 , spd : 0},
    {i : 'mwww', r: 'w',    isattack :true,     dmg : 15 , spd : 0},
    {i : 'meee', r: 'e',    isattack :true,     dmg : 15 , spd : 0},
    {i : 'miii', r: 'i',    isattack :true,     dmg : 15 , spd : 0},
    {i : 'mzzz', r: 'z',    isattack :true,     dmg : 15 , spd : 0},
    {i : 'mlll', r: 'l',    isattack :true,     dmg : 15 , spd : 0},
    {i : 'mddd', r: 'd',    isattack :true,     dmg : 15 , spd : 0},
    {i : 'mfi', r: 'f',     isattack :true,     dmg : 8 , spd : 0},
    {i : 'mfe', r: 'f',     isattack :true,     dmg : 8 , spd : 0},
    {i : 'mwi', r: 'w',     isattack :true,     dmg : 8 , spd : 0},
    {i : 'mwe', r: 'w',     isattack :true,     dmg : 8 , spd : 0},
];
