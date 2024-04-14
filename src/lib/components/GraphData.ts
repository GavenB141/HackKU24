import { tweened, type Tweened } from "svelte/motion";
import { get } from "svelte/store";

export default class GraphData {
    label: string = "Value";
    data: number[];
    fill: FillData = createFillData();
    readonly maxSize: number;

    tension:number = 0.2;
    pointRadius:number = 0;
    pointHitRadius:number = 10;
    hoverPointRadius: number = 0;

    borderColor = (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea, data, scales } = chart;
        if (!chartArea) {
            return null;
        }
        return getGradient(ctx, chartArea, data, scales);
    }

    last: Tweened<number> = tweened(0);

    constructor(data: number[], maxSize?: number) {
        this.data = data;
        this.maxSize = maxSize ?? 50;
    } 

    get length() {
        return this.data.length
    }

    get latest() {
        return this.data[this.data.length-1];
    }

    append(value: number) {
        if(this.length >= this.maxSize) {
            this.data.shift();
            this.fill.target.value = this.data[0];
        }
        let current = this.data.length - 1;
        this.last = tweened(this.data[current], {duration: 900});
        this.last.set(value);
        this.data.push(value);
    }
}

function createFillData() : FillData {
    return {
        target: {
            value: 10,
        },

        below: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) {
                return null;
            }
            return belowGradient(ctx, chartArea, data, scales);
        },

        above: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea, data, scales } = chart;
            if (!chartArea) {
                return null;
            }
            return aboveGradient(ctx, chartArea, data, scales);
        },
    }
}

interface FillData {
    target: {
        value: number
    },
    below: (context: CanvasRenderingContext2D) => CanvasGradient,
    above: (context: CanvasRenderingContext2D) => CanvasGradient
}


function getGradient(ctx: CanvasRenderingContext2D, chartArea: any, data: any, scales: any) {
    const { bottom } = chartArea;
    const { y } = scales;
    const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
    const shift = Math.min(y.getPixelForValue(data.datasets[0].data[0]) / bottom, 1);
    gradientBorder.addColorStop(0, "rgba(75, 192, 192, 1)");
    gradientBorder.addColorStop(shift, "rgba(75, 192, 192, 1)");
    gradientBorder.addColorStop(shift, "rgba(255, 26, 104, 1)");
    gradientBorder.addColorStop(1, "rgba(255, 26, 104, 1)");
    return gradientBorder;
}
    
function belowGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { bottom } = chartArea;
    const { y } = scales;
    const gradientBackground = ctx.createLinearGradient(
        0,
        y.getPixelForValue(data.datasets[0].data[0]),
        0,
        bottom,
    );
    gradientBackground.addColorStop(0, "rgba(255, 26, 104, 0)");
    gradientBackground.addColorStop(1, "rgba(255, 26, 104, 0.1)");
    return gradientBackground;
}

function aboveGradient(ctx: any, chartArea: any, data: any, scales: any) {
    const { top } = chartArea;
    const { y } = scales;
    const gradientBackground = ctx.createLinearGradient(
        0,
        y.getPixelForValue(data.datasets[0].data[0]),
        0,
        top,
    );
    gradientBackground.addColorStop(0, "rgba(75, 192, 192, 0)");
    gradientBackground.addColorStop(1, "rgba(75, 192, 192, .1)");
    return gradientBackground;
}
 
