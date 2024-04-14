<script lang="ts">
    import CoinCreation from "./CoinCreation.svelte";

    export let selected: string;
</script>

{#if selected === "mint-coin"}
    <CoinCreation />
{:else}
    <p>{selected}</p>
    {#if selected !== "none"}
        <p>To be implemented</p>
    {/if}
{/if}
