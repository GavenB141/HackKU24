<script lang="ts">
    import { authorizedFetch } from "$lib/userData";
    import { onMount } from "svelte";
    import BuyOrder from "./BuyOrder.svelte";
    import CoinCreation from "./CoinCreation.svelte";
    import SellOrder from "./SellOrder.svelte";
    import Leaderboard from "./leaderboard.svelte";

    export let label: string;
    export let selected: string;
    export let data:any;

    let coins: {
        [name: string]: number
    } = {};

    const bearerToken = `Bearer ${data.auth.info.accessToken}`;

    async function getCoins() {
        coins = await (await authorizedFetch(`/api/coins`, <string>bearerToken, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
    }

    onMount(()=>{
        let interval = setInterval(()=>{
            getCoins();
            console.log("Getting top coins...")
        }, 10000);

        return ()=>{
            clearInterval(interval)
        }
    })

</script>

<div class="relative">
    <div class="absolute top-1 left-1">{label}</div>
    {#if selected === "mint-coin"}
        <CoinCreation />
    {:else if selected === "purchase-coins"}
        <BuyOrder />
    {:else if selected === "sell-coins"}
        <SellOrder />
    {:else if selected === "top-coins"}
        <Leaderboard labels={["Ticker", "Last sold @"]} title="Top Coins" items={coins} />
    {:else}
        <p class="pt-10">{selected}</p>
        {#if selected !== "none"}
            <p>Not currently implemented</p>
        {/if}
    {/if}
</div>
