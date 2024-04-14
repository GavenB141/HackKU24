<script lang="ts">
    import Popup from "$lib/components/Popup.svelte";
    import Sidebar from "./Sidebar.svelte";
    import type { UserAuth, UserPortfolio } from "$lib/types";
    import Topbar from "./Topbar.svelte";
    import CoinGraph from "./CoinGraph.svelte";
    import NetWorthGraph from "./NetWorthGraph.svelte";
    import Controls from "./Controls.svelte";

    export let data: {
        auth: UserAuth,
        portfolio: UserPortfolio
    };

    let sidebarOpen = false;

    let screenWidth = 0;
    $: mobile = screenWidth < 1250;
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
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:h-full">
            <div class="rounded-xl w-full lg:h-full p-2 bg-coingrey-lighter">
                <p class="text-center">Your net worth</p>
                <NetWorthGraph />
            </div>
            <div class="rounded-xl w-full lg:h-full p-2 bg-coingrey-lighter">
                <p class="text-center">Coin value</p>
                <CoinGraph />
            </div>
        </div>
        <Controls />
        <marquee class="bg-black" hidden>Secret marquee</marquee>
    </div>
</div>
