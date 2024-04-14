<script lang="ts">
    import { type UserAuth, type UserPortfolio } from "$lib/types";
    import logo from "$lib/assets/logo.svg";

    export let portfolio: UserPortfolio;
    export let auth: UserAuth;

    $: username = auth.info?.user.username;
</script>

<div class="h-screen p-8 w-64 rounded-r-3xl mr-2 border border-white/25 text-center bg-coingrey-darker">
    <img src={logo} alt="bitpinch" />
    <br>
    {#if username}
        <p class="text-xl font-bold underline">{ username }</p>
        <div class="grid grid-cols-1 text-md px-4">
            <div class="border-t border-b border-white/50">
                <p class="text-left">Liquid Balance:</p> 
                <p class="text-coinblue-secondary text-right">{portfolio.liquid.round(2).toString()}</p>
            </div>
        </div>
    {/if}
</div>
