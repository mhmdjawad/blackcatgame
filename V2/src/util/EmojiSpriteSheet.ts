import G from "./G";
const EmojiSheet = [
['🔥','💧','🪨','💨','⚡','🌑','☀️'],
['🗡️','🩹','🛡️'],
['🏠','🕳️','🦖'],
['🦗','🦌','🪞'],
]
export default class EmojiSpriteSheet{
    static GenerateSpriteSheet(size :number){
        console.log(EmojiSheet);
        (window as any).EmojiSheet = EmojiSheet;
        var rows = EmojiSheet.length;
        var cols = EmojiSheet[0].length;
        var w = cols*size;
        var h = rows*size;
        var canvas = G.makeCanvas(w,h);
        for(let i = 0; i < EmojiSheet.length; i++){
            for(let j = 0; j < EmojiSheet[i].length; j++){
                var c = EmojiSheet[i][j];
                if(c == '') continue;
                var sprite = G.getEmojiSprite(c,size,1.1);
                canvas.ctx.drawImage(sprite,j*size,i*size);
            }
        }
        return canvas;
    }
}