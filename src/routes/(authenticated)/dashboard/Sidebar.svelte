<script lang="ts">
    //import { authInfo, authClient } from "$lib/authStore";
    import { type UserAuth } from "$lib/types";

    export let auth: UserAuth;
    $: username = auth.info?.user.username;
</script>

<div class="bg-black h-screen p-8 w-64">
    <h1 class="w-full text-center font-black">
        <span class="bit">bit</span><span class="pinch">pinch</span>
    </h1>
    {#if username}
        <p>Logged in as { username }</p>
        <button on:click={ () => auth.client?.logout(true) }>Log Out</button>
    {:else}
        <p>Not Logged In</p>
        <button on:click={ () => auth.client?.redirectToLoginPage() }>Log In</button>
    {/if}
</div>

<style>
    .bit {
        color: #11a9BC;
    }
    .pinch {
        color: #84D6D7; 
    }
</style>
