<script lang="ts">
    import { slide } from "svelte/transition";

    
    let openCategory = ["none", "none"];
    let index = 0;
    export let selected = ["none", "none"];
</script>

<div class="text-3xl font-bold text-left p-2 w-full bg-black/25 rounded-t-lg flex flex-row justify-between">
    <h2>Actions</h2>
    <div class="flex flex-row gap-2">
        <button class={`border-none active:bg-white/50 
            ${index==0?"bg-white/10 hover:bg-white/10":"bg-transparent hover:bg-white/5"}`}
            on:click={()=>{index = 0;}}
        >
            1
        </button>
        <button class={`border-none active:bg-white/50 
            ${index==1?"bg-white/10 hover:bg-white/10":"bg-transparent hover:bg-white/5"}`}
            on:click={()=>{index = 1;}}
        >
            2
        </button>
    </div> 
</div>
<div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col w-full items-center ">
        <button 
            on:click={()=>{openCategory[index] = "coins"}}
            class:bg-black={openCategory[index] == "coins"}
            class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
            border-white/50 rounded-none text-left text-xl w-full py-4"
        >Coins</button> 
        <button 
            on:click={()=>{openCategory[index] = "mining"}}
            class:bg-black={openCategory[index] == "mining"}
            class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
            border-white/50 rounded-none text-left text-xl w-full py-4"
        >Mining</button>
        <button 
            on:click={()=>{openCategory[index] = "leaderboards"; selected[index] = "leaderboards"}}
            class:bg-black={openCategory[index] == "leaderboards"}
            class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
            border-white/50 rounded-none text-left text-xl w-full py-4"
        >Leaderboard</button>
    </div>

    <div class="flex flex-col w-full items-center">
        {#if openCategory[index] == "coins"}
            <div transition:slide class="flex flex-col w-full">
                <button 
                    on:click={()=>{selected[index]="purchase-coins"}}
                    class:bg-black={selected[index] == "purchase-coins"}
                    class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
                    border-white/50 rounded-none text-left w-full py-4"
                > - Purchase order</button>
                <button 
                    on:click={()=>{selected[index]="sell-coins"}}
                    class:bg-black={selected[index] == "sell-coins"}
                    class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
                    border-white/50 rounded-none text-left w-full py-4"
                > - Sell order</button>
                <button 
                    on:click={()=>{selected[index]="mint-coin"}}
                    class:bg-black={selected[index] == "mint-coin"}
                    class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
                    border-white/50 rounded-none text-left w-full py-4"
                > - Mint new coin</button> 
            </div>
        {:else if openCategory[index] == "mining"}
            <div transition:slide class="flex flex-col w-full">
                <button 
                    on:click={()=>{selected[index]="purchase-cards"}}
                    class:bg-black={selected[index] == "purchase-cards"}
                    class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
                    border-white/50 rounded-none text-left w-full py-4"
                > - Purchase mining cards</button>
                <button 
                    on:click={()=>{selected[index]="allocate-cards"}}
                    class:bg-black={selected[index] == "allocate-cards"}
                    class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
                    border-white/50 rounded-none text-left w-full py-4"
                > - Allocate mining cards</button>
                <button 
                    on:click={()=>{selected[index]="view-mining"}}
                    class:bg-black={selected[index] == "view-mining"}
                    class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
                    border-white/50 rounded-none text-left w-full py-4"
                > - View mining data</button> 
            </div>
        {:else if openCategory[index] == "leaderboards"}
            <div transition:slide class="flex flex-col w-full">
                <button 
                    on:click={()=>{selected[index]="top-players"}}
                    class:bg-black={selected[index] == "top-players"}
                    class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
                    border-white/50 rounded-none text-left w-full py-4"
                > - Top players</button>
                <button 
                    on:click={()=>{selected[index]="top-coins"}}
                    class:bg-black={selected[index] == "top-coins"}
                    class="bg-transparent hover:bg-white/20 active:bg-white/20 border-0 border-t
                    border-white/50 rounded-none text-left w-full py-4"
                > - Top coins</button>
            </div>
        {/if}
    </div>
</div>
