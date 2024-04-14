<script lang="ts">
    import { authorizedFetch, bearerToken } from "$lib/userData";

    let ticker="";
    let quantity=0;
    let payment=0;

    let result: {
        success?: string,
        error?: string
    } | null = null;

    async function attemptOrder() {
        result = await (await authorizedFetch(`/api/coins/${ticker}/sell`, <string>$bearerToken, {
            method: "POST",
            body: JSON.stringify({ quantity, payment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
    }
</script>

<div class="h-full">
    <h2 class="text-xl font-bold text-center p-2 bg-black/25 rounded-t-lg mb-4 border-b border-white/50">
        Sell coins
    </h2>

    <div class="grid grid-cols-4">
        <label class="col-span-3" for="ticker">Coin to sell:</label>
        <input name="ticker" id="ticker" on:change={()=>{
            ticker = ticker.toUpperCase();
        }} bind:value={ticker} />

        <label class="col-span-3" for="amount">Quantity:</label>
        <input name="quantity" id="amount" bind:value={quantity} />

        <label class="col-span-3" for="price">Minimum asking price:</label>
        <input name="asking-unit" id="price" bind:value={payment} />
        <p class="w-full text-right col-span-4">Total: {quantity * payment}</p>
    </div>
    <div class="w-full mt-5 text-rose-500 text-center">{result?.error ?? ""}</div>
    <div class="w-full mb-5 text-coinblue-primary text-center">{result?.success ?? ""}</div>
    <div class="grid grid-cols-4">
        <div class="col-span-3"></div>
        <button class="mt-auto" on:click={attemptOrder}>Submit</button>
    </div>
</div>

<style>
    label {
        text-align: right;
        padding-right: 16px;
    }
</style>
