<script lang="ts">
    import { getChromeStorage, setChromeStorage } from "./lib/chromeStorage";
    import { addUrlChangedEventListener } from "./lib/customEvents";
    import { formatTime } from "./lib/dateTimeHelper";
    import { TIMESPENT_STORE } from "./lib/enums";
    import { isPathValid } from "./lib/routeHelper";

    let showUIDisplay = $state(true);

    let savedTime = 0; //await getChromeStorage(TIMESPENT_STORE); // Example saved time in seconds //TODO: Refactor to get the saved time from chrome storage
    let formattedTime = $state(""); //$state(formatTime(savedTime));
    let savedTimeInitialized = $state(false);

    const initializeTimeSpent = async () => {
        const timeStore = await getChromeStorage(TIMESPENT_STORE);
        savedTime = isNaN(timeStore) ? 0 : Number(timeStore);
        formattedTime = formatTime(savedTime);
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
            savedTime++;
            formattedTime = formatTime(savedTime);

            await setChromeStorage(TIMESPENT_STORE, savedTime);
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
</script>

{#if showUIDisplay}
    <main class="tiktok-reels-eradicator-main">
        <h1>Tiktok reels are blocked</h1>
        <p>
            <!-- You saved: <strong>36 hours and 56 minutes</strong> worth of distraction -->
            You saved: <strong>{formattedTime}</strong> worth of distraction from
            scrolling tiktok reels
        </p>
    </main>
{/if}
