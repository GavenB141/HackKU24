<script>
    let count = 0;
</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Click the button to complete the project faster</p>

<button on:click={()=>{
    count += 1;
}}>
    {count}% completion 
</button>

<h2>To Do</h2>
<p>This should be a nice introductory page to our application and why it's cool.</p>
<a href="/dashboard" class="rounded py-2 bg-blue-800 text-white no-underline mt-2 block text-center">Get Started</a>