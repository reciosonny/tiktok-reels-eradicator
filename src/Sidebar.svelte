<script lang="ts">
    import { createCounter } from "./store/counter.svelte";

    const globalCounter = createCounter();

    $effect(() => {
        console.log("globalCounter changed:", globalCounter.count);
    });
</script>

<div class="border-2 rounded-md border-slate-600 p-2">
    <h3>This is a sidebar</h3>

    <div>
        <span>count: {globalCounter.count}</span>
    </div>
</div>
