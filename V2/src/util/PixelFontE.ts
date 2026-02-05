import U8Matrix from "./U8Matrix";
import G from "./G";
const PixelData = [
    0,0,0,0,0,0,0,0,0,56,76,198,198,198,100,56,0,24,
    56,24,24,24,24,126,0,124,198,14,60,120,224,254,0,
    126,12,24,60,6,198,124,0,28,60,108,204,254,12,12,0,
    252,192,252,6,6,198,124,0,60,96,192,252,198,198,124,0,
    254,198,12,24,48,48,48,0,124,198,198,124,198,198,124,0,
    124,198,198,126,6,12,120,0,56,108,198,198,254,198,198,0,
    252,198,198,252,198,198,252,0,60,102,192,192,192,102,60,0,
    248,204,198,198,198,204,248,0,254,192,192,252,192,192,254,0,
    254,192,192,252,192,192,192,0,62,96,192,206,198,102,62,0,
    198,198,198,254,198,198,198,0,126,24,24,24,24,24,126,0,
    30,6,6,6,198,198,124,0,198,204,216,240,248,220,206,0,
    192,192,192,192,192,192,252,0,198,238,254,254,214,198,198,0,
    198,230,246,254,222,206,198,0,124,198,198,198,198,198,124,0,
    252,198,198,198,252,192,192,0,124,198,198,198,222,204,122,0,
    252,198,198,206,248,220,206,0,120,204,192,124,6,198,124,0,
    126,24,24,24,24,24,24,0,198,198,198,198,198,198,124,0,
    198,198,198,238,124,56,16,0,198,198,214,254,254,238,198,0,
    198,238,124,56,124,238,198,0,102,102,102,60,24,24,24,0,
    254,14,28,56,112,224,254,0,0,0,0,0,0,48,48,0,0,24,24,0,
    24,24,0,0,0,0,126,126,0,0,0];
var chars = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:-';
export default class PixelFontE{
    baseMatrix : any[][];
    constructor(){
        this.baseMatrix = U8Matrix.decode(PixelData,8,chars.length*8);
    }
    getFrame(matrix:any[][],frameIndex=0){
        const start = frameIndex * 8;
        const frame = [];
        for (let i = 0; i < 8; i++) {
            frame.push(matrix[start + i].slice());
        }
        return frame;
    }
    getChar(char:string,multiplier = 1, color = '#000'){
        var index = chars.indexOf(char.toUpperCase());
        if(index > -1){
              var frame = this.getFrame(this.baseMatrix,index);
              return G.colorsMatrixToSprite(frame,multiplier,(r:any) => {
                    if(r == 1) return color;
                    return null;
                })
        }
        else return G.makeCanvas(multiplier*8,multiplier*8);
    }
    getLine(line:string,multiplier=1,color='#000'){
        var out = G.makeCanvas(line.length * multiplier * 8, multiplier * 8);
        var canvases = line.split('').map(c => this.getChar(c,multiplier,color));
        for(let i = 0 ; i < canvases.length;i++){
            out.ctx.drawImage(canvases[i],i*multiplier*8,0);
        }
        return out;
    }
}