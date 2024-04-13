<script lang="ts">
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";

    export let datapoints: number[] = [10, 12, 13, 8.5, 6, 9, 11, 4];
    export let label: string = "Value";
    export let history: number = 50;

    let data = {
        labels: Array(history).fill("|"),
        datasets: [
            {
                label,
                data: [...datapoints, ...Array(history).fill(null)],
                fill: {
                    target: {
                        value: datapoints[0],
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
                },
                borderColor: (context: any) => {
                    const chart = context.chart;
                    const { ctx, chartArea, data, scales } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    return getGradient(ctx, chartArea, data, scales);
                },
                tension: 0.4,
                pointRadius: 0,
                pointHitRadius: 10,
                hoverPointRadius: 0,
            },
        ],
    };

    const config = {
        type: "line",
        data,
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        },
    };

    function getGradient(ctx: any, chartArea: any, data: any, scales: any) {
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
    
    let chartDomObject: HTMLCanvasElement;

    onMount(() => {
        // @ts-ignore, the config is valid but TS does not agree
        let chart = new Chart(chartDomObject, config);
        chartDomObject.innerText = Chart.version;

        let interval = setInterval(()=>{
            if(datapoints.length >= history){
                datapoints.shift();
            }
            datapoints.push(datapoints[datapoints.length-1] + (Math.random() * 10) - 4.8);
            data.datasets[0].data = [
                ...datapoints, 
                ...Array(history-datapoints.length).fill(null)
            ];
            data.datasets[0].fill.target.value = datapoints[0];

            chart.update("resize");
        }, 1000);

        return () => {clearInterval(interval)}
    });
</script>

<div class="w-full h-full"><canvas bind:this={chartDomObject}></canvas></div>
