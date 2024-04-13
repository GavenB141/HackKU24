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
