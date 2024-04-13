<script>
    import Popup from "$lib/components/Popup.svelte";
    import Sidebar from "./Sidebar.svelte";

    let sidebarOpen = false;

    // todo: detect mobile and improve mobile layout
    let mobile = false;
</script>

<!-- General layout concept -->
<div class="flex flex-row h-screen">
    {#if !mobile}
        <Sidebar />
    {/if}
    <div class="flex flex-col w-full">
        {#if mobile}
            <Popup bind:open={sidebarOpen}>
                <Sidebar />
            </Popup>
            <button on:click={()=>{
                sidebarOpen = true;
            }}>
                open
            </button>
        {/if}
        <div class="flex flex-row h-full">
            <div class="border border-sky-400 w-full h-full p-2">Net worth graph</div>
            <div class="border border-green-200 w-full h-full p-2">Selected coin graph</div>
        </div>
        <div class="flex flex-row h-full">
            <div class="border border-blue-400 w-full h-full p-2">Create a coin</div>
            <div class="border border-teal-400 w-full h-full p-2">Leaderboard</div>
            <div class="border border-cyan-400 w-full h-full p-2">Top coins</div>
        </div>
        <!-- this won't actually be a <marquee/> later -->
        <marquee>Social media mechanic quick view</marquee>
    </div>
</div>
