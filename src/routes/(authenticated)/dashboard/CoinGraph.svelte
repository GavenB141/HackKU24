<script lang="ts">
    import GraphData from "$lib/components/GraphData";
    import LineGraph from "$lib/components/LineGraph.svelte";
    import { MessageSource } from "$lib/messageSource";
    import { bearerToken } from "$lib/userData";
    
    let graph = new GraphData([10], 50);
    $: if ($bearerToken) {
        new MessageSource("/api/graph", $bearerToken, (value) => {
            graph.append(value);
        });
    };
</script>

<LineGraph graphData={graph} />
