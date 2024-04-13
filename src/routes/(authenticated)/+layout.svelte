<script>
    export let data;
</script>

{#if data?.auth?.info}
    <slot />
{/if}
