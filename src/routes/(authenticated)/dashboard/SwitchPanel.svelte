<script lang="ts">
    import CoinCreation from "./CoinCreation.svelte";

    export let selected: string;
</script>

{#if selected === "mint-coin"}
    <CoinCreation />
{:else}
    {selected}
{/if}
