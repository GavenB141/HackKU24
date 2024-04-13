<script lang="ts">
    import { fly } from "svelte/transition";

    export let open: boolean = true;
</script>

{#if open}
    <div transition:fly={{x: -100}} class="fixed top-0 left-0 z-10">
        <slot />
    </div>
    <button 
        transition:fly
        on:click={(e)=>{
            e.stopPropagation();
            open = false
        }}
        class="fixed top-0 left-0 h-full w-full bg-white/10 hover:bg-white/10 active:bg-white/10 p-0 border-none"
    ></button>
{/if}
