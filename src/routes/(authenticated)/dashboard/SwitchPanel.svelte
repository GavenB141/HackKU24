<script lang="ts">
    import BuyOrder from "./BuyOrder.svelte";
import CoinCreation from "./CoinCreation.svelte";
    import SellOrder from "./SellOrder.svelte";

    export let selected: string;
</script>

{#if selected === "mint-coin"}
    <CoinCreation />
{:else if selected === "purchase-coins"}
    <BuyOrder />
{:else if selected === "sell-coins"}
    <SellOrder />
{:else}
    <p>{selected}</p>
    {#if selected !== "none"}
        <p>To be implemented</p>
    {/if}
{/if}
