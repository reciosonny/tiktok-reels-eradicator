<script lang="ts">
    import Switch from "$lib/components/Switch/Switch.svelte";
    import "./options.scss";

    let showUIDisplay = $state(true);
</script>

<main class="px-8 pt-12">
    <h1 class="text-center text-4xl">Tiktok reels eradicator</h1>
    <h2 class="text-3xl">Settings</h2>
    <Switch id="thisIsId" className="mt-4" onCheckedChange={(event) => console.log('event changed: ', event)}>
        <span>This is now the new way</span>
    </Switch>
    <Switch id="another" className="mt-4">
        <span>This is now the new way</span>
    </Switch>
</main>