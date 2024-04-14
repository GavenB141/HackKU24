<main class="h-screen w-screen" style="padding: 20vh;">
    <div class="flex flex-col justify-space-around h-full">
        <div class="flex flex-col md:flex-row justify-evenly">
            <img
                src="src/lib/assets/logo.svg"
                alt="Bitpinch Logo"
                class="w-full h-full max-w-prose" 
            />
            
            <div class="flex flex-col max-w-prose justify-center">
                <h1 class="text-8xl font-black font-mono mt-1 mb-4">
                    <span class="bit">bit</span><span class="pinch">pinch</span>
                </h1>
                <p class="text-2xl">
                    The Massively Multiplayer Real Time Strategic Speculative
                    Asset Market Simulation Game
                </p>
            </div>
        </div>

        <div class="flex flex-row h-full w-full" style="padding-top: 200px;">
            <a
                style= "color:black"
                data-sveltekit-reload
                href="/dashboard"
                class="w-1/5 rounded py-2 bg-blue-500 font-weight 900 no-underline block text-center text-4xl m-auto min-w-fit"
                >Get Started</a
            >
        </div>
    </div>
</main>
<div class="flex hackku-bottom-right">
    <img src="src/lib/assets/duc.svg" alt="" style="height: 150%" />
    <span>Made for HACKKU</span>
</div>

<style>
    .bit {
        color: #11a9bc;
    }
    .pinch {
        color: #84d6d7;
    }
    .hackku-bottom-right {
        position: fixed;
        right: 1em;
        bottom: 0;
        width: fit-content;
        align-content: center;
        justify-content: right;
        font-size: 24px;
        height: 1em;
        margin: 0 0 1em 4em;
    }
</style>
