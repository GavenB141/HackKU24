<script lang="ts">
    export let title: string;
</script>

<div class="h-full">
    <h2 class="text-xl font-bold text-center p-2 bg-black/25 rounded-t-lg mb-4 border-b border-white/50">
        {title}
    </h2>

    <slot></slot>
</div>
