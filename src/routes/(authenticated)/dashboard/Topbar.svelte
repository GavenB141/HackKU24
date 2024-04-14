<script lang="ts">
    import type { UserAuth } from "$lib/types";
    import { portfolio } from "$lib/userData";

    export let auth: UserAuth;
    export let mobile: boolean;
    export let sidebarOpen: boolean;

    $: liquidBalance = $portfolio.liquid;
</script>

<div class="w-full flex flex-row items-center justify-between p-2">
    {#if mobile}
        <button class="text-coinblue-primary text-base bg-white/5 -ml-2 p-2 pr-4 rounded-r-full border-none rounded-none"
            on:click={()=>{
                sidebarOpen = true;
            }}
        >{liquidBalance.round(2).toString()}</button>
    {/if}
    <h1 class="w-full text-center font-black font-mono">
        <span class="bit">bit</span><span class="pinch">pinch</span>
    </h1>
    <button 
        class = "h-fit text-nowrap"
        on:click={ () => auth.client?.logout(true) }
    >Log Out</button>
</div>

<style>
    .bit {
        color: #11a9BC;
    }
    .pinch {
        color: #84D6D7; 
    }
</style>
