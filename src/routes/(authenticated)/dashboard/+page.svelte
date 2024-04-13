<script lang="ts">
    import Popup from "$lib/components/Popup.svelte";
    import Sidebar from "./Sidebar.svelte";
    import { fetchEventSource } from '@microsoft/fetch-event-source';
<<<<<<< Updated upstream
    import type { UserAuth } from "$lib/types";

    export let data: { auth: UserAuth };
=======
    import LineGraph from "$lib/components/LineGraph.svelte";
>>>>>>> Stashed changes

    let sidebarOpen = false;

    // ---------------------- temporary chat feature ----------------------
    let message = "";
    let message_log = ["Predefined message"];
    const bearer = `Bearer ${data.auth.info.accessToken}`;

    function send_message() {
        let data = new FormData();
        data.append("message", message);
        let token = bearer;
        if (token) {
            fetch("/api/chat", {
                method: "POST",
                body: data,
                headers: {
                    Authorization: token
                }
            });
        }

        message = "";
    };

    fetchEventSource("/api/chat", {
        headers: {
            "Authorization": bearer
        },
        onmessage(event) {
            message_log.push(event.data);
            message_log = message_log;
        },
    });

    // ---------------------- end chat feature ----------------------

    // todo: detect mobile and improve mobile layout
    let mobile = false;
</script>


<!-- General layout concept -->
<div class="flex flex-row h-screen">
    {#if !mobile}
        <Sidebar auth={data.auth} />
    {/if}
    <div class="flex flex-col w-full">
        {#if mobile}
            <Popup bind:open={sidebarOpen}>
                <Sidebar auth={data.auth} />
            </Popup>
            <button on:click={()=>{
                sidebarOpen = true;
            }}>
                open
            </button>
        {/if}
        <div class="flex flex-row h-full">
            <div class="border border-sky-400 w-full h-full p-2">Net worth graph

                <!-- Temporary placement of temporary chat window -->
                <div id="chat-window">
                    <form on:submit|preventDefault={send_message}>
                        <input name="message" class="text-black" bind:value={message} autocomplete="off">
                        <input type="submit" value="Send Message">
                    </form>
                    <ul class="list-disc">
                        {#each message_log as message}
                            <li>{message}</li>
                        {/each}
                    </ul>
                </div>

            </div>
            <div class="border border-green-200 w-full h-full p-2">Selected coin graph
               <LineGraph /> 
            </div>
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
