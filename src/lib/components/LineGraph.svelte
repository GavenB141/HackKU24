<script lang="ts">
    import Chart from "chart.js/auto";
    import GraphData from "$lib/components/GraphData";
    import { onMount } from "svelte";

    export let history: number = 50;
    export let graphData = new GraphData(Array(history).fill(10), history);
    // export let label: string = "Value";

    let data = {
        labels: Array(history).fill("|"),
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
        },
    };
   
    let chartDomObject: HTMLCanvasElement;

    onMount(() => {
        // @ts-ignore, the config is valid but TS does not agree
        let chart = new Chart(chartDomObject, config);
        chartDomObject.innerText = Chart.version;

        let interval1 = setInterval(()=>{
            graphData.append(graphData.latest + Math.random() * 10 - 4.8);
            data.datasets[0] = {...graphData};
        }, 500);

        let interval2 = setInterval(()=>{
            data.datasets[0].data = graphData.data_tweened
            chart.update("none");
        }, 50);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        }
    });
</script>

<div class="w-full h-full"><canvas bind:this={chartDomObject}></canvas></div>
