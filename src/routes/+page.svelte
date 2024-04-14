<script>
    let count = 0;
</script>

<style>
    .simpleGradient {
        background: linear-gradient(black, darkgray);   
    }
    .center {
        margin: 0;
        position: absolute;
        top: 85%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .bit {
        color: #11a9BC;
    }
    .pinch {
        color: #84D6D7; 
    }
</style>
    <h1 class="w-full text-center font-black font-mono mt-1">
    <span class="bit">bit</span><span class="pinch">pinch</span>
</h1>
<p>
<p style="font-size:36px" >  Enage with the Highest Income and Outcome Trading Simulator</p>

<button on:click={()=>{
    count += 1;
}}>
    {count}% completion 
</button>

<h2>To Do</h2>
<p>This should be a nice introductory page to our application and why it's cool.</p>
<a
    data-sveltekit-reload
    href="/dashboard" class="center w-1/2 rounded py-4 bg-blue-500 text-white no-underline mt-4 block text-center"
>Get Started</a>
