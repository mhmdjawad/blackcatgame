export default class PackedImage4 {
    width: number = 0;
    height: number = 0;
    palette: any[] = []; // max 4 colors
    data: Uint8Array = new Uint8Array();
    static encode(palette: any[], matrix: number[][]) {
        if (palette.length > 4)
            throw new Error("PackedImage4 supports max 4 colors");
        const img = new PackedImage4();
        img.width = matrix[0].length;
        img.height = matrix.length;
        img.palette = palette;
        const packed = this.pack2Bits(matrix);
        img.data = this.compressRle(packed);
        return img;
    }
    static decodeObj(o : any){
        return this.decode(o.w,o.h,o.palette,new Uint8Array(o.data));
    }
    static decode(width: number,height: number,palette: any[],data: Uint8Array) {
        const decompressed = this.decompressRle(data);
        const pixels = this.unpack2Bits(decompressed, width * height);
        const matrix: any[][] = [];
        let i = 0;
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                row.push(palette[pixels[i++]]);
            }
            matrix.push(row);
        }
        return matrix;
    }
    private static pack2Bits(matrix: number[][]): Uint8Array {
        const pixels: number[] = [];
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[0].length; x++) {
                const v = matrix[y][x];
                if (v < 0 || v > 3)
                    throw new Error("Pixel out of range (0-3)");
                pixels.push(v);
            }
        }
        const byteCount = Math.ceil(pixels.length / 4);
        const packed = new Uint8Array(byteCount);
        let p = 0;
        for (let i = 0; i < byteCount; i++) {
            let b = 0;
            for (let j = 0; j < 4; j++) {
                const v = pixels[p++] ?? 0;
                b |= (v & 0b11) << (6 - j * 2);
            }
            packed[i] = b;
        }
        return packed;
    }
    private static unpack2Bits(data: Uint8Array,pixelCount: number): Uint8Array {
        const pixels = new Uint8Array(pixelCount);
        let p = 0;
        for (let i = 0; i < data.length; i++) {
            const b = data[i];
            for (let j = 0; j < 4 && p < pixelCount; j++) {
                pixels[p++] = (b >> (6 - j * 2)) & 0b11;
            }
        }
        return pixels;
    }
    static compressRle(data: Uint8Array) {
        const compressed: number[] = [];
        let count = 1;
        for (let i = 1; i < data.length; i++) {
            if (data[i] === data[i - 1] && count < 255) {
                count++;
            } else {
                compressed.push(count, data[i - 1]);
                count = 1;
            }
        }
        compressed.push(count, data[data.length - 1]);
        return new Uint8Array(compressed);
    }
    static decompressRle(data: Uint8Array) {
        const decompressed: number[] = [];
        for (let i = 0; i < data.length; i += 2) {
            const count = data[i];
            const value = data[i + 1];
            for (let j = 0; j < count; j++) {
                decompressed.push(value);
            }
        }
        return new Uint8Array(decompressed);
    }
    static printable(packed: PackedImage4) {
        const r = {
            w: packed.width,
            h: packed.height,
            palette: packed.palette,
            data: Array.from(packed.data)
        };
        return JSON.stringify(r);
    }
}