<script lang="ts">
    import { getChromeStorage, setChromeStorage } from "./lib/chromeStorage";
    import { addUrlChangedEventListener } from "./lib/customEvents";
    import { formatTime } from "./lib/dateTimeHelper";
    import { TIMESPENT_STORE } from "./lib/enums";
    import { isPathValid } from "./lib/routeHelper";

    let showUIDisplay = $state(true);

    let savedTimeInSeconds = 0;
    let formattedTime = $state("");
    let savedTimeInitialized = $state(false);

    const initializeTimeSpent = async () => {
        const timeStore = await getChromeStorage(TIMESPENT_STORE);
        savedTimeInSeconds = isNaN(timeStore) ? 0 : Number(timeStore);
        formattedTime = formatTime(savedTimeInSeconds);
        savedTimeInitialized = true;
    };
    
    // should be called once initializeTimeSpent is called
    const intervalRunClock = () => {
        if (!savedTimeInitialized) {
            throw new Error(
                "Saved time is not initialized. Please run it first in the code",
            );
        }

        return setInterval(async () => {
            savedTimeInSeconds++;
            formattedTime = formatTime(savedTimeInSeconds);

            await setChromeStorage(TIMESPENT_STORE, savedTimeInSeconds);
        }, 1000);
    };

    /**
     * This is used to keep track of the interval so that we can clear it when the component is unmounted
     */
    let runInterval: number;

    $effect(() => {
        console.log("App mounted");

        if (!savedTimeInitialized) {
            initializeTimeSpent();
            console.log("time spent initialized");
        }

        if (isPathValid() && savedTimeInitialized) {
            clearInterval(runInterval);
            runInterval = intervalRunClock();
        }

        return () => {
            console.log("App unmounted");
            clearInterval(runInterval);
        };
    });

    addUrlChangedEventListener(({ detail }: CustomEvent) => {
        console.log("URL changed", detail);
        if (isPathValid()) {
            showUIDisplay = true;
            runInterval = intervalRunClock();
        } else {
            showUIDisplay = false;
            clearInterval(runInterval);
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            console.log("Tab became active.");
            runInterval = intervalRunClock();
            chrome.runtime.sendMessage({ status: "active" });
        } else {
            console.log("Tab went to the background.");
            clearInterval(runInterval);
            chrome.runtime.sendMessage({ status: "inactive" });
        }
    });

    // For testing only. Remove once done in testing stage
    const resetCountdown = async () => {
        clearInterval(runInterval);
        savedTimeInSeconds = 3600;


        await setChromeStorage(TIMESPENT_STORE, savedTimeInSeconds);

        console.log("Countdown reset successfully");
    }
</script>

{#if showUIDisplay}
    <main class="tiktok-reels-eradicator-main">
        <h1>Tiktok reels are blocked</h1>
        <p>
            You saved: <strong>{formattedTime}</strong> worth of distraction from
            scrolling tiktok reels
        </p>

        <!-- For testing only. Remove once done in testing stage. TODO: Or when build is set to production -->
        <!-- <button class="button" onclick={resetCountdown}>Reset countdown</button> -->
    </main>
{/if}
