<script lang="ts">
    import BuyOrder from "./BuyOrder.svelte";
    import CoinCreation from "./CoinCreation.svelte";
    import SellOrder from "./SellOrder.svelte";

    export let label: string;
    export let selected: string;
</script>

<div class="relative">
    <div class="absolute top-1 left-1">{label}</div>
    {#if selected === "mint-coin"}
        <CoinCreation />
    {:else if selected === "purchase-coins"}
        <BuyOrder />
    {:else if selected === "sell-coins"}
        <SellOrder />
    {:else}
        <p class="pt-10">{selected}</p>
        {#if selected !== "none"}
            <p>Not currently implemented</p>
        {/if}
    {/if}
</div>
