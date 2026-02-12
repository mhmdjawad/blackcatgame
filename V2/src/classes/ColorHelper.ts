export type RGB = {
    r: number;
    g: number;
    b: number;
};

export default class ColorHelper {

    /* ================= PRIVATE ================= */

    private static hexToRgb(hex: string): RGB {

        hex = hex.replace("#", "");

        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16)
        };
    }


    private static rgbToHexRGB(c: RGB): string {

        return (
            "#" +
            [c.r, c.g, c.b]
                .map(v => v.toString(16).padStart(2, "0"))
                .join("")
        );
    }


    private static colorDistance(a: RGB, b: RGB): number {

        return (
            (a.r - b.r) ** 2 +
            (a.g - b.g) ** 2 +
            (a.b - b.b) ** 2
        );
    }


    /* ================= PUBLIC ================= */

    /**
     * Maps a color to the nearest palette entry.
     * null maps to null if present.
     */
    static mapColorToNearest(
        color: string | null,
        palette: (string | null)[]
    ): string | null {

        if (color === null) {
            return palette.includes(null) ? null : palette[0] ?? null;
        }

        const src = this.hexToRgb(color);

        let best: string | null = null;
        let bestDist = Infinity;

        for (const p of palette) {

            if (p === null) continue;

            const d = this.colorDistance(
                src,
                this.hexToRgb(p)
            );

            if (d < bestDist) {
                bestDist = d;
                best = p;
            }
        }

        return best;
    }


    /**
     * Reduce colors to N palette entries (K-Means)
     */
    static reducePalette(
        colors: any[],
        count: number,
        iterations = 10
    ): (string | null)[] {

        const hasNull = colors.includes(null);

        const list = colors.filter(
            c => c !== null
        ) as string[];

        if (!list.length) {
            return hasNull ? [null] : [];
        }

        if (list.length <= count) {
            return hasNull ? [null, ...list] : list;
        }

        const points = list.map(c => this.hexToRgb(c));


        /* ---- Init centers ---- */

        let centers: RGB[] = [];

        const step = Math.max(
            1,
            Math.floor(points.length / count)
        );

        for (let i = 0; i < count; i++) {

            centers.push({
                ...points[i * step] || points[0]
            });
        }


        /* ---- K-Means ---- */

        for (let it = 0; it < iterations; it++) {

            const groups: RGB[][] = Array.from(
                { length: count },
                () => []
            );


            for (const p of points) {

                let best = 0;
                let bestDist = Infinity;

                for (let i = 0; i < centers.length; i++) {

                    const d = this.colorDistance(
                        p,
                        centers[i]
                    );

                    if (d < bestDist) {
                        bestDist = d;
                        best = i;
                    }
                }

                groups[best].push(p);
            }


            for (let i = 0; i < count; i++) {

                if (!groups[i].length) continue;

                let r = 0, g = 0, b = 0;

                for (const p of groups[i]) {
                    r += p.r;
                    g += p.g;
                    b += p.b;
                }

                centers[i] = {
                    r: Math.round(r / groups[i].length),
                    g: Math.round(g / groups[i].length),
                    b: Math.round(b / groups[i].length)
                };
            }
        }


        const reduced = centers.map(c =>
            this.rgbToHexRGB(c)
        );

        return hasNull ? [null, ...reduced] : reduced;
    }


    /**
     * Darken color by repeating factor
     */
    static darken(color: string, times: number): string {

        let { r, g, b } = this.parseColor(color);

        for (let i = 0; i < times; i++) {

            r = Math.floor(r * 0.9);
            g = Math.floor(g * 0.9);
            b = Math.floor(b * 0.9);
        }

        return this.rgbToHex(r, g, b);
    }


    /**
     * Parse hex or rgb()
     */
    static parseColor(color: string): RGB {

        if (color.startsWith("#")) {

            const hex = color.slice(1);

            return {
                r: parseInt(hex.substr(0, 2), 16),
                g: parseInt(hex.substr(2, 2), 16),
                b: parseInt(hex.substr(4, 2), 16),
            };
        }

        if (color.startsWith("rgb")) {

            const nums = color.match(/\d+/g)!.map(Number);

            return {
                r: nums[0],
                g: nums[1],
                b: nums[2],
            };
        }

        throw new Error("Unsupported color: " + color);
    }


    /**
     * RGB → HEX
     */
    static rgbToHex(r: number, g: number, b: number): string {

        return (
            "#" +
            [r, g, b]
                .map(v => v.toString(16).padStart(2, "0"))
                .join("")
        );
    }
}
