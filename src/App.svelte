<script lang="ts">
    import { getChromeStorage, setChromeStorage } from "./lib/chromeStorage";
    import { addUrlChangedEventListener } from "./lib/customEvents";
    import { formatTime } from "./lib/dateTimeHelper";
    import { TIMESPENT_STORE } from "./lib/enums";
    import { isPathValid } from "./lib/routeHelper";

    let showUIDisplay = $state(true);

    let savedTimeInSeconds = $state(0);
    let formattedTime = $state("");
    let savedTimeInitialized = $state(false);
    const ENV = import.meta.env;

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

    $effect(() => {
        console.log('these are the env variables: ', ENV.VITE_APP_MODE); // Output: development or production
    });

    addUrlChangedEventListener(({ detail }: CustomEvent) => {
        console.log("URL changed", detail);
        if (isPathValid()) {
            showUIDisplay = true;
            clearInterval(runInterval); // clear the interval to avoid multiple intervals running
            runInterval = intervalRunClock();
        } else {
            showUIDisplay = false;
            clearInterval(runInterval);
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            console.log("Tab became active.");
            clearInterval(runInterval); // clear the interval to avoid multiple intervals running
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
        runInterval = intervalRunClock();

        savedTimeInSeconds = 0;

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

        {#if ENV.VITE_APP_MODE === 'development'}
            <button class="button" onclick={resetCountdown}>Reset countdown</button>
        {/if}
    </main>
{/if}
