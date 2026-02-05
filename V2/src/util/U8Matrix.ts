export default class U8Matrix{
    static encode(matrix: any[][]){
        const h = matrix.length;
        const w = matrix[0].length;
        let bytes = [];
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x += 8) {
                let byte = 0;
                for (let b = 0; b < 8; b++) {
                    if (matrix[y][x + b]) {
                    byte |= (1 << (7 - b));
                    }
                }
                bytes.push(byte);
            }
        }
        return new Uint8Array(bytes);
    }
    static decode(bytes:any,width:number,height:number){
        const matrix = [];
        let i = 0;
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x += 8) {
                const byte = bytes[i++];
                for (let b = 0; b < 8; b++) {
                    row.push((byte >> (7 - b)) & 1);
                }
            }
            matrix.push(row);
        }
        return matrix;
    }
}