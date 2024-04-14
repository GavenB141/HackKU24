<script lang="ts">
    //@ts-nocheck
    export let items: {
        [name: string]: number
    } = {};

    export let title: string;
    export let labels: string[];

    $: order = Object.keys(items).sort((a, b)=>{
        return parseFloat(items[b].marketValue) > parseFloat(items[a].marketValue);
    })
</script>

<div class="h-full">
    <h2 class="text-xl font-bold text-center p-2 bg-black/25 rounded-t-lg mb-4 border-b border-white/50">
        {title}
    </h2>

    <div class="grid grid-cols-2 border-b border-white/50">
        <p class="text-center">{labels[0]}</p>
        <p class="text-center">{labels[1]}</p>
    </div>

    <div class="grid grid-cols-2"> 
        {#each order as key}
            <p class="text-center">{key}</p>
            <p class="text-center text-coinblue-primary">{
                parseFloat(items[key].marketValue).toFixed(2)
            }</p>
        {/each}
    </div>
</div>
