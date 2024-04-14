<script lang="ts">
    import GraphData from "$lib/components/GraphData";
    import LineGraph from "$lib/components/LineGraph.svelte";
    import { netWorth } from "$lib/userData";

    let graph = new GraphData([10], 25);
    netWorth.subscribe((worth) => {
        graph.append(worth);
    })
</script>

<LineGraph graphData={graph} />
