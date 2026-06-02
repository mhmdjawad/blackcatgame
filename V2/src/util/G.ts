import type { GameCanvasElement, GameTableElement } from "../classes/interface";
import Point from "../classes/Point";
const CELLSIZE = 64;
export default class G{
    static EmptyCanv(){
        return this.makeCanvas();
    }
    static makeCanvas(w=0,h=0){
        let c = document.createElement('canvas') as GameCanvasElement;
        c.width = w;
        c.height = h;
        c.w=w;
        c.h=h;
        c.ctx = c.getContext('2d') ?? new CanvasRenderingContext2D;
        c.center = {x: w/2,y:h/2}
        c.clear = ()=>{
            c.ctx.clearRect(0,0,w,h);
        }
        c.fill = (color)=>{
            c.ctx.fillStyle = color;
            c.ctx.fillRect(0,0,w,h);
        }
        c.stroke = (color, thickness)=>{
            var canv2 = document.createElement('canvas');
            canv2.width = w;
            canv2.height = h;
            var ctx2 = canv2.getContext('2d');
            if(ctx2 != null){
                ctx2.fillStyle = color;
                ctx2.fillRect(0,0,w,w);
                ctx2.clearRect(thickness,thickness,w-thickness*2,h-thickness*2);
                c.ctx.drawImage(canv2,0,0);
            }
        }
        c.fillRect = (color,_x,_y,_w,_h)=>{
            c.ctx.fillStyle = color;
            c.ctx.fillRect(_x,_y,_w,_h);
        }
        c.fillPatern = (img)=>{
            const pattern = c.ctx.createPattern(img, "repeat") as CanvasPattern;
            if(c.ctx != null) c.ctx.fillStyle = pattern;
            c.ctx.fillRect(0, 0, w, h);
        }
        c.drawCentered = (canvas : GameCanvasElement) =>{
            c.ctx.drawImage(canvas,c.w/2-canvas.w/2,c.h/2-canvas.h/2);
        }
        c.drawBottomCenter = (canvas:GameCanvasElement, offset : number = 0)=>{
            c.ctx.drawImage(canvas,c.w/2-canvas.w/2,c.h-canvas.h - offset);
        }
        c.drawRelative = (canvas : GameCanvasElement, center : Point) =>{
            c.ctx.drawImage(canvas,center.x -canvas.w/2, center.y -canvas.h /2);
        }
        c.drawAt = (canvas : GameCanvasElement, center : Point) =>{
            c.ctx.drawImage(canvas,center.x, center.y);
        }
        return c;
    }
    static GenTable(rows = 0,cols = 0){
        var html = ``;
        for(let i = 0 ; i < rows ; i++){
            html += `<tr>`;
            for(let j = 0 ; j < cols;j++){
                html += `<td></td>`;
            }
            html += `</tr>`;
        }
        var table = document.createElement('table') as GameTableElement;
        table.innerHTML = html;
        var entities = [];
        var trs = table.querySelectorAll('tr');
        for(let i = 0 ; i < trs.length; i++){
            var tds = trs[i].querySelectorAll('td');
            // tds.forEach(x=> x.html = (html)=>x.innerHTML=html);
            entities[i] = [...tds];
        }
        table.entities = entities;
        return table;
    }
    static Point(pos = {x:0,y:0}){
        return new Point(pos);
    }
    static getEmojiSprite(emoji = ' ',size = 1,factor = 1.3, color = '#000', font = 'sans-serif'){
        let canvas = G.makeCanvas(size,size);
        var ctx = canvas.ctx;
        ctx.font = `${size/factor}px ${font}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color;
        ctx.fillText(emoji,size/2, size*1.1/2);
        return canvas;
    }
    static MakeRoundedRect(width = 0, height = 0, radius = 0 , color = '#000') {
        var canvas = G.makeCanvas(height,width);
        var ctx = canvas.ctx;
        var c = G.MakeCircle(width*radius/100,null,color);
        ctx.fillStyle = color;
        ctx.drawImage(c,0,0);
        ctx.drawImage(c,width-c.width,0);
        ctx.drawImage(c,width-c.width,height-c.height);
        ctx.drawImage(c,0,height-c.height);
        ctx.fillRect(c.width/2,1,width-c.width,height-2);
        ctx.fillRect(1,c.width/2,width-2,height-c.width);
        return canvas;
    }
    static getTextSprite(text = ' ',size = 1, color = '#000',  factor = 0.8, font = 'sans-serif'){
        text = text.toUpperCase();
        let canvas = G.makeCanvas(size * text.length, size);
        for(let i = 0 ; i < text.length;i++){
            var ls = G.getEmojiSprite(text[i],size,factor, color, font);
            canvas.ctx.drawImage(ls,i * size,0);
        }
        return canvas;
    }
    static GetTextSpriteWithShadow(text = ' ',size = 1, color = '#000',  factor = 0.8, font = 'sans-serif',shadow = '#fff'){
        var s1 = G.getTextSprite(text,size,color,factor,font);
        var s2 = G.getTextSprite(text,size,shadow,factor,font);
        var canvas = G.makeCanvas(s1.w+4,s1.w+4);
        canvas.ctx.drawImage(s2,1,1);
        canvas.ctx.drawImage(s1,0,0);
        return canvas;
    }
    static fuseColor(canvas : GameCanvasElement,color = '#000'){
        var colorbuffer= G.makeCanvas(canvas.w,canvas.h);
        colorbuffer.fill(color);
        return G.fuseImage(canvas,colorbuffer,'source-atop');
    }
    static fuseImage(canvas :GameCanvasElement,canvas2 : GameCanvasElement,composite = 'source-atop' as GlobalCompositeOperation){
        if(!canvas || !canvas2) return canvas;
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        let ctx = buffer.ctx;
        ctx.drawImage(canvas,0,0);
        ctx.globalCompositeOperation = composite;
        for(let i = 0 ; i < canvas.width/canvas2.width;i++){
            for(let j = 0 ; j < canvas.height/canvas2.height;j++){
                ctx.drawImage(canvas2,i * canvas2.width,j * canvas2.height);
            }
        }
        return buffer;
    }
    static rotateCanvas(_image : GameCanvasElement,deg = 0){
        var image = (deg % 90 != 0) ? G.prepForRotate(_image) : _image;
        var canvas = G.makeCanvas(image.width,image.height);
        var ctx = canvas.ctx;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(deg * Math.PI / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
        return canvas;
    }
    static prepForRotate(image : GameCanvasElement){
        let d = Math.sqrt( Math.pow(image.width,2)+Math.pow(image.height,2));
        let buffer = G.makeCanvas(d,d);
        buffer.ctx.drawImage(image,(d - image.width) /2,(d - image.height) /2);
        return buffer;
    }
    static mirror(canvas :GameCanvasElement,hor = true){
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        let context = buffer.ctx;
        context.save();
        if(hor){
            context.scale(-1, 1);
            context.drawImage(canvas, 0, 0, canvas.width*-1, canvas.height);
        }
        else{
            context.scale(1, -1);
            context.drawImage(canvas, 0, 0, canvas.width, canvas.height*-1);
        }
        context.restore();
        return buffer;
    }
    static gridBG(color1 = "lightgrey",color2 = null, scale = 8, width=1){
        var canvas = G.makeCanvas(scale,scale);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,scale,scale);
        if(color2 == null){
            ctx.clearRect(0,0,scale-width,scale-width);
        }
        else{
            ctx.fillStyle = color2;
            ctx.fillRect(0,0,scale-width,scale-width);
        }
        return canvas;
    }
    static Lightify(canvas : GameCanvasElement,opacity = 1){
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        buffer.ctx.globalAlpha = opacity;
        buffer.ctx.drawImage(canvas,0,0);
        buffer.ctx.globalAlpha = 1;
        return buffer;
    }
    static makeDom(html : string) : HTMLDivElement{
        var h = document.createElement('div');
        h.innerHTML = html;
        return h.firstChild as HTMLDivElement;
    }
    static shuffleArray(array = []) {
        for (let i = array.length - 1; i > 0; i--) {const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]];}return array;
    }
    static repeatCanvas(canvas : GameCanvasElement,r = 1, c=1){
        if (c == 0) c = r;
        var buffer = G.makeCanvas(canvas.width * c, canvas.height * r);
        var pattern = buffer.ctx.createPattern(canvas, 'repeat') as CanvasPattern;
        buffer.ctx.fillStyle = pattern;
        buffer.ctx.fillRect(0, 0, buffer.w, buffer.h);
        return buffer;
    }
    static merge(list :GameCanvasElement[] = [],w = 0,h = 0){
        var c = G.makeCanvas(w,h);
        for(let i in list){
            c.ctx.drawImage(list[i],0,0);
        }
        return c;
    }
    static brickPattern(color1 = "#fff",color2 = "#000", r = 1){
        var canvas = G.makeCanvas(8,8);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = color2;
        ctx.fillRect(7,0,1,4);
        ctx.fillRect(0,3,8,1);
        ctx.fillRect(4,4,1,4);
        ctx.fillRect(0,7,8,1);
        if(r > 1){return G.repeatCanvas(canvas,r,r);}
        return canvas;
    }
    static randomPattern(color1 = '#000',color2 = '#fff',bias = 0.3,w=8,h=8){
        var canvas = G.makeCanvas(w,h);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = color2;
        for(let i = 0 ; i < h ; i ++){
            for(let j = 0 ; j < w ; j++){
                if(Math.random() < bias) ctx.fillRect(j,i,1,1);
            }
        }
        return canvas;
    }
    static MakeCircle(r = 1,stroke : any = null,fill : any = null, sw = 1){
        var s = G.makeCanvas(r*2+2,r*2+2);
        var ctx = s.ctx;
        ctx.save();
        ctx.lineWidth = sw;
        ctx.beginPath();
        ctx.arc(s.width/2,s.height/2,r,0,Math.PI * 2,false);
        if(stroke != null){ctx.strokeStyle = stroke;ctx.stroke();}
        if(fill != null){ctx.fillStyle = fill;ctx.fill();}
        ctx.restore();
        return s;
    }
    static movePointToward(pos : Point,rotation = 0,distance = 0){
        const rRad = rotation * (Math.PI / 180);
        const vx = distance * Math.cos(rRad);
        const vy = distance * Math.sin(rRad);
        return {
            x : pos.x + vx,
            y : pos.y + vy
        }
    }
    static loadImage(url = "",callback : Function){
        var img = new Image();
        img.src = url;
        img.addEventListener('load',()=>{
            callback(img);
        });
    }
    static getColor(r = 0, g = 0, b = 0, a = 0){
        if(r+g+b+a == 0){return null;}
        else if(r+g+b == 0){return '#000000';}
        else if (r > 255 || g > 255 || b > 255){return '#000000';}
        return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
    }
    static getColorMatrix (canvas : GameCanvasElement,changefct : Function | null = null) : any[][]{
        var matrix : any[][] = [];
        if(canvas.w <= 1 || canvas.h <= 1) return matrix;
        var context = canvas.ctx;
        var width = canvas.width;
        var height = canvas.height;
        var imageData = context.getImageData(0, 0, width, height);
        var data = imageData.data;
        var colorMatrix = [];
        for (var i = 0; i < data.length; i += 4) {
            colorMatrix.push(
                G.getColor(
                    data[i],
                    data[i + 1],
                    data[i + 2],
                    data[i + 3]
                    )
                );
        }
        
        for(let i = 0 ; i < canvas.height;i++){matrix[i] = [];}
        let c = 0, r = 0;
        for(let i = 0 ; i < colorMatrix.length;i++){
            if(c >= canvas.width){r++;c=0}
            matrix[r][c] = colorMatrix[i];
            if(changefct) matrix[r][c] = changefct(matrix[r][c]);
            c++;
        }
        return matrix;
    }
    static getImageDataWithPalette(canvas : GameCanvasElement){
        var palette : any[] = [null];
        var matrixInColor = G.getColorMatrix(canvas,(c : any)=>{
            if(c && !palette.includes(c)) palette.push(c);
            return c;
        });
        var palettemap :any = {};
        for(let i  = 0 ; i < palette.length ; i++){
            palettemap[palette[i]] = i;
        }
        var matrix = matrixInColor.map((row:any[]) => row.map((color:any) => palettemap[color]));
        return { palette, matrix };
    }
    static imgToCanvas(img : any){
        var c = G.makeCanvas(img.width,img.height);
        c.ctx.drawImage(img,0,0);
        return c;
    }
    static colorsMatrixToSprite(matrix : any[][],scale = 1,deform = (c: any | null)=>{return c;}){
        let height = matrix.length;
        let width = Math.max(...matrix.map((row)=> row.length));
        var buffer = G.makeCanvas(width * scale,height* scale);
        var ctx = buffer.ctx;
        for(let i = 0 ; i < height;i++){
            for(let j = 0 ; j < width;j++){
                var color = matrix[i][j];
                if(deform) color = deform(color);
                if(!color || color == '') continue;
                ctx.fillStyle = color;
                ctx.fillRect(j*scale,i*scale,scale,scale);
            }
        }
        return buffer;
    }
    static magnify(img :GameCanvasElement,factor = 1){
        var imgCanvas = G.imgToCanvas(img);
        var mat = G.getColorMatrix(imgCanvas,(r ='')=>{
            return r;
        });
        return G.colorsMatrixToSprite(mat,factor);
    }
    static crop(canvas : GameCanvasElement,x = 0,y = 0,width = 1,height = 1){
        let buffer = G.makeCanvas(width,height);
        buffer.ctx.drawImage(canvas,x,y,width,height,0,0,width,height);
        return buffer;
    }
    static randomColor(){
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {color += letters[Math.floor(Math.random() * 16)];}
        return color; 
    }
    static GenShadow(canvas:GameCanvasElement,thickness = 1,color = '#000'){
        var canvasColor = G.makeCanvas(canvas.w,canvas.h);
        canvasColor.fill(color);
        var fused = G.fuseImage(canvas,canvasColor,'source-atop');
        var canvas2 = G.makeCanvas(canvas.w + thickness, canvas.h + thickness);
        canvas2.ctx.drawImage(fused,0,0,canvas2.w,canvas2.h);
        return canvas2;
    }
    static NormGrid(value = 0,base = 0){
        return (value/base) * base + base/2;
    }
    static GenBorder(w = 1,h = 1,borderStyle :any,bgcolor = '#fff'){
        var canvas = G.makeCanvas(w,h);
        canvas.ctx.fillStyle = bgcolor;
        canvas.ctx.fillRect(
            borderStyle.w/2,
            borderStyle.h/2,
            canvas.w - borderStyle.w,
            canvas.h - borderStyle.h
        );
        var rulerH = G.makeCanvas(canvas.w,borderStyle.h);
        var rulerV = G.makeCanvas(borderStyle.w,canvas.h);
        var cx = 0;
        var s1 = borderStyle;
        while(cx < canvas.w-s1.w){
            rulerH.ctx.drawImage(s1,cx,0);
            cx += s1.w/2;
        }
        var cy = 0;
        while(cy < canvas.h-s1.h){
            rulerV.ctx.drawImage(s1,0,cy);
            cy += s1.h/2;
        }
        canvas.ctx.drawImage(rulerH,0,-2);
        canvas.ctx.drawImage(rulerH,0,canvas.h-rulerH.h+2);
        canvas.ctx.drawImage(rulerV,-1,0);
        canvas.ctx.drawImage(rulerV,canvas.w - rulerV.w+1,0);
        return canvas;
    }
    static GenerateCursor(){
        var canvas = G.makeCanvas(CELLSIZE,CELLSIZE);
        var ctx = canvas.ctx;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,canvas.w,canvas.h);
        ctx.clearRect(2,2,canvas.w-4,canvas.h-4);
        ctx.clearRect(CELLSIZE/4,0,CELLSIZE/2,CELLSIZE);
        ctx.clearRect(0,CELLSIZE/4,CELLSIZE,CELLSIZE/2);
        return canvas;
    }
    static mapClick(e : any,canvas : any,callback : any){
        var rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        var x = (e.clientX - rect.left)* scaleX + window.scrollX;
        var y = (e.clientY - rect.top)* scaleY+ window.scrollY;
        callback(G.Point({x,y}));
    }
    static magnifyByMatrix(canvas : GameCanvasElement,mult = 2){
        var mat = G.getColorMatrix(canvas);
        return G.colorsMatrixToSprite(mat,mult);
    }
    static parseTime(s: number){
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);
        m = Math.floor(m % 60);
        s = Math.floor(s % 60);
        return `${h<10?0:''}${h}:${m<10?0:''}${m}:${s<10?0:''}${s}`;
    }
    static createPicker<T extends { ods: number }>(arr: T[]) {
        const total = arr.reduce((s, x) => s + x.ods, 0);
        return (): T => {
            let r = Math.random() * total;
            for (const item of arr) {
                r -= item.ods;
                if (r < 0) return item;
            }
            // Fallback (should never happen)
            return arr[arr.length - 1];
        };
    }
    static genTexture(width:number,height:number,pool: any[], noise : number){
        var canvas = G.makeCanvas(width,height);
        canvas.fill(pool[0].v);
        var stepw = width/noise;
        var setph = width/noise;
        var picker = G.createPicker<any>(pool);
        for(let i = 0 ; i < height;i+= setph){
            for(let j = 0 ; j < width;j += stepw){
                canvas.ctx.fillStyle = picker().v;
                canvas.ctx.fillRect(i,j,1,1);
            }
        }
        return canvas;
    }
    static shapeTexture(width:number,height:number,shape:any, shapesize:any,color:any, xinc :number, yinc : number){
        var canvas = G.makeCanvas(width,height);
        var deltaSprite = G.getTextSprite(shape,shapesize,color,1);
        var cx = -xinc;
        var cy = -yinc;
        for(let i = 0 ; i < height;i++){
            for(let j = 0 ; j < width; j++){
                canvas.ctx.drawImage(deltaSprite,cx,cy);
                cx += xinc;
            }
            cy += yinc;
            cx = -xinc;
        }
        return canvas;
    }
    static lineColors(width:number,height:number,colors: string[]){
        var canvas = G.makeCanvas(width,height);
        var colx = 0;
        for(let i = 0 ; i < height;i++){
            canvas.fillRect(colors[colx],0,i,width,height);
            if(++colx > colors.length) colx = 0;
        }
        return canvas;
    }
    static hueSat(color:string, factor1:number, factor2:number){
        // adjust a color from string #rrggbb / #rgb using factors
        // factor1: hue shift in degrees (positive or negative)
        // factor2: saturation multiplier (1 = unchanged, 0 = desaturate)
        try{
            if(!color) return color;
            let hex = color.replace('#','').trim();
            if(hex.length === 3) hex = hex.split('').map(ch=>ch+ch).join('');
            if(hex.length !== 6) return color;
            const r = parseInt(hex.slice(0,2),16);
            const g = parseInt(hex.slice(2,4),16);
            const b = parseInt(hex.slice(4,6),16);

            // RGB -> HSL
            const rf = r/255, gf = g/255, bf = b/255;
            const max = Math.max(rf,gf,bf), min = Math.min(rf,gf,bf);
            let h = 0, s = 0, l = (max + min) / 2;
            if(max !== min){
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case rf: h = (gf - bf) / d + (gf < bf ? 6 : 0); break;
                    case gf: h = (bf - rf) / d + 2; break;
                    case bf: h = (rf - gf) / d + 4; break;
                }
                h = h * 60; // degrees
            }

            // apply factors
            if(typeof factor1 === 'number'){
                h = (h + factor1) % 360;
                if(h < 0) h += 360;
            }
            if(typeof factor2 === 'number'){
                s = Math.max(0, Math.min(1, s * factor2));
            }

            // HSL -> RGB
            const hue2rgb = (p:number, q:number, t:number) => {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            let rf2:number, gf2:number, bf2:number;
            if(s === 0){
                rf2 = gf2 = bf2 = l; // achromatic
            } else {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                const hk = h / 360;
                rf2 = hue2rgb(p, q, hk + 1/3);
                gf2 = hue2rgb(p, q, hk);
                bf2 = hue2rgb(p, q, hk - 1/3);
            }

            const toHex = (n:number) => Math.max(0, Math.min(255, Math.round(n * 255))).toString(16).padStart(2, '0');
            return `#${toHex(rf2)}${toHex(gf2)}${toHex(bf2)}`;
        }
        catch(e){
            return color;
        }
    }
    static colorToPalette(color:string, count:number, factor:number){
        // return a set of colors (count) that in center is original color
        // and alongside is lightified and darken colors based on factor
        try{
            if(!color) return [];
            // normalize hex
            let hex = color.replace('#','').trim();
            if(hex.length === 3) hex = hex.split('').map(ch=>ch+ch).join('');
            if(hex.length !== 6) return [color];
            const r = parseInt(hex.slice(0,2),16);
            const g = parseInt(hex.slice(2,4),16);
            const b = parseInt(hex.slice(4,6),16);

            // RGB -> HSL
            const rf = r/255, gf = g/255, bf = b/255;
            const max = Math.max(rf,gf,bf), min = Math.min(rf,gf,bf);
            let h = 0, s = 0, l = (max + min) / 2;
            if(max !== min){
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case rf: h = (gf - bf) / d + (gf < bf ? 6 : 0); break;
                    case gf: h = (bf - rf) / d + 2; break;
                    case bf: h = (rf - gf) / d + 4; break;
                }
                h = h * 60;
            }

            const hue2rgb = (p:number, q:number, t:number) => {
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const palette: string[] = [];
            if(count <= 1){ return [color]; }
            const centerIndex = Math.floor((count - 1) / 2);
            // step is amount of lightness change per index (factor controls spread)
            const step = typeof factor === 'number' ? factor : 0.08;

            for(let i = 0; i < count; i++){
                const offset = i - centerIndex;
                // scale offset to spread for even counts
                const adj = offset * step;
                let newL = l + adj;
                newL = Math.max(0, Math.min(1, newL));

                // convert back to RGB
                let rf2:number, gf2:number, bf2:number;
                if(s === 0){ rf2 = gf2 = bf2 = newL; }
                else{
                    const q = newL < 0.5 ? newL * (1 + s) : newL + s - newL * s;
                    const p = 2 * newL - q;
                    const hk = h / 360;
                    rf2 = hue2rgb(p, q, hk + 1/3);
                    gf2 = hue2rgb(p, q, hk);
                    bf2 = hue2rgb(p, q, hk - 1/3);
                }
                const toHex = (n:number) => Math.max(0, Math.min(255, Math.round(n * 255))).toString(16).padStart(2, '0');
                palette.push(`#${toHex(rf2)}${toHex(gf2)}${toHex(bf2)}`);
            }
            return palette;
        }
        catch(e){
            return [color];
        }
    }
    static coloredRect(w:number,h:number,color:string){
        var canvas = G.makeCanvas(w,h);
        canvas.fill(color);
        return canvas;
    }
    static lerpColor(color1:string,color2:string,t = 0.5){
        // linear interpolate between 2 colors by t (0-1)
        try{
            if(!color1 || !color2) return color1 || color2 || null;
            let hex1 = color1.replace('#','').trim();
            let hex2 = color2.replace('#','').trim();
            if(hex1.length === 3) hex1 = hex1.split('').map(ch=>ch+ch).join('');
            if(hex2.length === 3) hex2 = hex2.split('').map(ch=>ch+ch).join('');
            if(hex1.length !== 6 || hex2.length !== 6) return t < 0.5 ? color1 : color2;
            const r1 = parseInt(hex1.slice(0,2),16);
            const g1 = parseInt(hex1.slice(2,4),16);
            const b1 = parseInt(hex1.slice(4,6),16);
            const r2 = parseInt(hex2.slice(0,2),16);
            const g2 = parseInt(hex2.slice(2,4),16);
            const b2 = parseInt(hex2.slice(4,6),16);
            const r = Math.round(r1 + (r2 - r1) * t);
            const g = Math.round(g1 + (g2 - g1) * t);
            const b = Math.round(b1 + (b2 - b1) * t);
            return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        }
        catch(e){
            return t < 0.5 ? color1 : color2;
        }
    }
    static rand (a=1, b=0){ return b + (a-b)*Math.random();}
    static randInt (a=1, b=0){ return G.rand(a,b)|0;}
}