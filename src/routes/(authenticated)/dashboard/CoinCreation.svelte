<script lang="ts">
    import { authorizedFetch, bearerToken } from "$lib/userData";

    let ticker="";
    let amount=0;
    let investment=0;

    let result: {
        success?: string,
        error?: string
    } | null = null;

    async function attemptCreate() {
        result = await (await authorizedFetch("/api/coins/"+ticker, <string>$bearerToken, {
            method: "POST",
            body: JSON.stringify({ amount, investment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
    }
</script>

<div class="h-full">
    <h2 class="text-xl font-bold text-center p-2 bg-black/25 rounded-t-lg mb-4 border-b border-white/50">
        Mint a new coin
    </h2>

    <div class="grid grid-cols-4">
        <label class="col-span-3" for="ticker">Ticker [3-5 characters]:</label>
        <input name="ticker" id="ticker" on:change={()=>{
            ticker = ticker.toUpperCase();
        }} bind:value={ticker} />

        <label class="col-span-3" for="amount">Initial amount:</label>
        <input name="amount" id="amount" bind:value={amount} />

        <label class="col-span-3" for="investment">Initial liquid investment:</label>
        <input name="investment" id="investment" bind:value={investment} />
    </div>
    <div class="w-full mt-5 text-rose-500 text-center">{result?.error ?? ""}</div>
    <div class="w-full mb-5 text-coinblue-primary text-center">{result?.success ?? ""}</div>
    <div class="grid grid-cols-4">
        <div class="col-span-3"></div>
        <button class="mt-auto" on:click={attemptCreate}>Submit</button>
    </div>
</div>

<style>
    label {
        text-align: right;
        padding-right: 16px;
    }
</style>
