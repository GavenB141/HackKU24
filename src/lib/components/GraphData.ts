import { tweened, type Tweened } from "svelte/motion";
import { get } from "svelte/store";

export default class GraphData {
    label: string = "Value";
    data: number[];
    fill: FillData = createFillData();
    readonly maxSize: number;

    tension:number = 0.4;
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

    private tweened_data: Tweened<any>[] = [];

    constructor(data: number[], maxSize?: number) {
        this.data = data;
        this.maxSize = maxSize ?? 50;

        for(let i = 0; i < this.maxSize; i++) {
            this.tweened_data.push(data?.[i] ? 
                tweened(data[i], {
                    duration: 500
                }) : tweened(undefined, {
                    duration: 500
                }));
        }
    } 

    get length() {
        return this.data.length
    }

    get latest() {
        return this.data[this.data.length-1];
    }

    get data_tweened() {
        let data:number[] = [];
        this.tweened_data.forEach((val)=>{
            data.push(get(val));
        })
        return data
    }

    append(value: number) {
        if(this.length >= this.maxSize) {
            this.data.shift();
            this.fill.target.value = this.data[0];
        }
        this.data.push(value);
        this.updateTweened();
    }

    private updateTweened() {
        for(let i = 0; i < this.length; i++) {
            this.tweened_data[i].set(this.data[i]);
        }
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
    const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
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
 
