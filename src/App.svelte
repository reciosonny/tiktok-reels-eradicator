<script lang="ts">

    $effect(() => {
        console.log("App mounted");

        return () => {
            console.log("App unmounted");
        };
    });
</script>

<main class="p-10">
    <h1>Tiktok reels are blocked</h1>
    <!-- TODO: 
            - Still need to add functionality where time is being tracked while using tiktok with this extension. 
            - We may need to stop tracking its time when a user views a reel using search (optional) 
    -->
    <p>You saved: <strong>36 hours and 56 minutes</strong> worth of distraction from scrolling tiktok reels</p>
</main>
