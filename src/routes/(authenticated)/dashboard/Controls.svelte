<script lang="ts">
    import ActionsPanel from "./ActionsPanel.svelte";
    import SwitchPanel from "./SwitchPanel.svelte";

    export let data:any;

    let selected: string[] = ["purchase-coins", "top-coins"];
</script>

<div class="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-3 lg:h-full">
    <div class="rounded-xl w-full lg:h-full p-2 bg-coingrey-lighter">
        <ActionsPanel bind:selected={selected}/> 
    </div>
    <div class="rounded-xl w-full lg:h-full p-2 bg-coingrey-lighter">
        <SwitchPanel {data} label="1" selected={selected[0]}/> 
    </div>
    <div class="rounded-xl w-full lg:h-full p-2 bg-coingrey-lighter">
        <SwitchPanel {data} label="2" selected={selected[1]}/> 
    </div>
</div>
