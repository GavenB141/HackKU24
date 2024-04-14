<script lang="ts">
    import Popup from "$lib/components/Popup.svelte";
    import Sidebar from "./Sidebar.svelte";
    import LineGraph from "$lib/components/LineGraph.svelte";
    import type { UserAuth, UserPortfolio } from "$lib/types";
    import Topbar from "./Topbar.svelte";
    import CoinGraph from "./CoinGraph.svelte";
    import NetWorthGraph from "./NetWorthGraph.svelte";
    import { authorizedFetch } from "$lib/userData";
    import { MessageSource } from "$lib/messageSource";

    export let data: {
        auth: UserAuth,
        portfolio: UserPortfolio
    };

    let sidebarOpen = false;

    let screenWidth = 0;
    $: mobile = screenWidth < 768;
</script>

<svelte:window bind:innerWidth={screenWidth} />

<!-- General layout concept -->
<div class="flex flex-row h-screen">
    {#if !mobile}
        <Sidebar {...data} />
    {/if}
    <div class="flex flex-col gap-4 w-full">
        <Topbar {...data} {mobile} bind:sidebarOpen={sidebarOpen} />
        {#if mobile}
            <Popup bind:open={sidebarOpen}>
                <Sidebar {...data} />
            </Popup>
        {/if}
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:h-full">
            <div class="rounded-xl w-full md:h-full p-2 bg-coingrey-lighter">
                <p class="text-center">Your net worth</p>
                <NetWorthGraph />
            </div>
            <div class="rounded-xl w-full md:h-full p-2 bg-coingrey-lighter">
                <p class="text-center">Coin value</p>
                <CoinGraph />
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 md:h-full">
            <div class="border border-blue-400 w-full md:h-full p-2">Create a coin</div>
            <div class="border border-teal-400 w-full md:h-full p-2">Leaderboard</div>
            <div class="border border-cyan-400 w-full md:h-full p-2">Top coins</div>
        </div>
        <!-- this won't actually be a <marquee/> later -->
        <marquee>Social media mechanic quick view</marquee>
    </div>
</div>
