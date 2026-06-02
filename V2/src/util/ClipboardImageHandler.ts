import ColorHelper from "../classes/ColorHelper";
import G from "./G";
import PackedImage4 from "./PackedImage4";
export default class ClipboardImageHandler{
    static handlePaste(){
        document.addEventListener("paste", async (e : ClipboardEvent) => {
            const items = e.clipboardData?.items ?? [];
            for (const item of items) {
                if (item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    if(file){
                        const img = new Image();
                        img.onload = () => {
                            var canvas = G.imgToCanvas(img);
                            var palette = new Set();
                            G.getColorMatrix(canvas,(r:any)=>{ 
                                if(r == '#ffffff') r = null; // make as png white transparent
                                palette.add(r)
                            });
                            var reduced = ColorHelper.reducePalette(Array.from(palette),3,10);
                            // reduced = [null,"#d9a066","#663931","#000000"];
                            var matreduced = G.getColorMatrix(canvas,(r:any)=>{ 
                                if(r == '#ffffff') r = null;
                                var nearest = ColorHelper.mapColorToNearest(r,reduced);
                                // return nearest;
                                if(nearest == reduced[0]) return 0;
                                if(nearest == reduced[1]) return 1;
                                if(nearest == reduced[2]) return 2;
                                if(nearest == reduced[3]) return 3;
                            });

                            var encodedpack4 = PackedImage4.encode(reduced,matreduced);
                            console.log('p4',PackedImage4.printable(encodedpack4));
                            var decode = PackedImage4.decodeObj(encodedpack4);
                            var matreducesassprite = G.colorsMatrixToSprite(decode,3,(r:any)=>r);
                            console.log(palette);
                            console.log(reduced);

                            document.body.append(canvas);
                            document.body.append(matreducesassprite);
                        }
                        img.src = URL.createObjectURL(file);
                    }
                    
                }
            }

        });
    }
}