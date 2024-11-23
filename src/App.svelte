<script lang="ts">
    import { addUrlChangedEventListener } from "./lib/customEvents";
    import { isPathValid } from "./lib/routeHelper";

    let showUIDisplay = $state(true);
    let savedTime = 13356; // Example saved time in seconds
    let formattedTime = $state(formatTime(savedTime));

    function formatTime(seconds: number) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs} hours, ${mins} minutes, and ${secs} seconds`;
    }



    $effect(() => {
        console.log("App mounted");

        const interval = setInterval(() => { //TODO: Add a DB call to update the saved time (probably localStorage or chrome storage). Also stop the time counting when user is not on tiktok or user is viewing a reel
            savedTime++;
            formattedTime = formatTime(savedTime);
        }, 1000);

        return () => {
            console.log("App unmounted");
            clearInterval(interval);
        };
    });

    addUrlChangedEventListener(({ detail }: CustomEvent) => {
        console.log("URL changed", detail);
        if (isPathValid()) {
            showUIDisplay = true;
        } else {
            showUIDisplay = false;
        }
    });
</script>

{#if showUIDisplay}
    <main class="p-10">
        <h1>Tiktok reels are blocked</h1>
        <!-- TODO: 
                - Still need to add functionality where time is being tracked while using tiktok with this extension. 
                - We may need to stop tracking its time when a user views a reel using search (optional) 
        -->
        <p>
            <!-- You saved: <strong>36 hours and 56 minutes</strong> worth of distraction -->
            You saved: <strong>{formattedTime}</strong> worth of distraction
            from scrolling tiktok reels
        </p>
    </main>
{/if}
