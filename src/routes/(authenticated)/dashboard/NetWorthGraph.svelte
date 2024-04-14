<script lang="ts">
    import GraphData from "$lib/components/GraphData";
    import LineGraph from "$lib/components/LineGraph.svelte";
    import { onMount } from "svelte";

    let graph = new GraphData([10], 50);

    onMount(()=>{
        let interval = setInterval(()=>{
            graph.append(graph.latest + Math.random() * 10 - 4.5);
        }, 1000);

        return ()=>{
            clearInterval(interval);
        }
    })
</script>

<LineGraph graphData={graph} />
