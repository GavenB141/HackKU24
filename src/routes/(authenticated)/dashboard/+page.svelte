<script>
    import { browser } from "$app/environment";
    import Popup from "$lib/components/Popup.svelte";
    import Sidebar from "./Sidebar.svelte";

    let sidebarOpen = false;

    // ---------------------- temporary chat feature ----------------------
    let message = "";
    let message_log = ["Predefined message"];
    function send_message() {
        console.log(message);

        let data = new FormData();
        data.append("message", message);
        fetch("/api/chat", {
            method: "POST",
            body: data
        });

        message = "";
    }
    if (browser) {
        let source = new EventSource("/api/chat");
        source.onmessage = (event) => {
            message_log.push(event.data);
            message_log = message_log;
        };
    }
    // ---------------------- end chat feature ----------------------

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
