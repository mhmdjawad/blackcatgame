export default class PackedImage8{
    width:number = 0;
    height:number = 0;
    palette:any[] = [];
    data:Uint8Array = new Uint8Array();
    static encode(palette:any[],matrix : any[][]){
        var img = new PackedImage8();
        img.width = matrix[0].length;
        img.height = matrix.length;
        img.palette = palette;
        var data = new Uint8Array(img.width * img.height);
        for(let y = 0 ; y < img.height ; y++){
            for(let x = 0 ; x < img.width ; x++){
                data[y * img.width + x] = matrix[y][x];
            }
        }
        img.data = this.compressRle(data);
        return img;
    }
    static decode(width:number,height:number,palette:any[],data:Uint8Array){
        var matrix = [];
        var decompressed = this.decompressRle(data);
        for(let y = 0 ; y < height ; y++){
            var row = [];
            for(let x = 0 ; x < width ; x++){
                row.push(palette[decompressed[y * width + x]]);
            }
            matrix.push(row);
        }
        return matrix;
    }
    static compressRle(data:Uint8Array){
        var compressed = [];
        var count = 1;
        for(let i = 1 ; i < data.length ; i++){
            if(data[i] === data[i-1]){
                count++;
            }
            else{
                compressed.push(count);
                compressed.push(data[i-1]);
                count = 1;
            }   
        }
        compressed.push(count);
        compressed.push(data[data.length - 1]);
        return new Uint8Array(compressed);
    }
    static decompressRle(data:Uint8Array){
        var decompressed = [];
        for(let i = 0 ; i < data.length ; i+=2){
            var count = data[i];
            var value = data[i+1];
            for(let j = 0 ; j < count ; j++){
                decompressed.push(value);
            }
        }
        return new Uint8Array(decompressed);
    }
    static printable(packed : PackedImage8){
        var r = {
            w : packed.width,
            h : packed.height,
            palette : packed.palette,
            data : Array.from(packed.data)
        }
        return JSON.stringify(r);
    }
}