<script lang="ts">
    import Chart from "chart.js/auto";
    import GraphData from "$lib/components/GraphData";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    export let graphData: GraphData;
    // export let label: string = "Value";

    let data = {
        labels: Array(graphData.maxSize).fill("|"),
        datasets: [
            {...graphData}
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
            plugins: {
                legend: {
                    onClick: null,
                    display: false
                }
            } 
        },
    };
   
    let chartDomObject: HTMLCanvasElement;

    onMount(() => {
        // @ts-ignore, the config is valid but TS does not agree
        let chart = new Chart(chartDomObject, config);
        chartDomObject.innerText = Chart.version;

        let interval1 = setInterval(()=>{
            data.datasets[0] = {...graphData};
        }, 1000);

        let interval2 = setInterval(()=>{
            let last = graphData.length - 1;
            data.datasets[0].data[last] = get(graphData.last);
            chart.update("resize");
        }, 50);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        }
    });
</script>

<div class="w-full h-full"><canvas bind:this={chartDomObject}></canvas></div>
