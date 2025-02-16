<script lang="ts">
    import { getChromeStorage, setChromeStorage } from "./lib/chromeStorage";
    import { addInHomePageEventListener, addOutsideHomePageEventListener, addUrlChangedEventListener } from "./lib/customEvents";
    import { formatTime } from "./lib/dateTimeHelper";
    import { TIMESPENT_STORE } from "./lib/enums";
    import { isPathValid } from "./lib/routeHelper";
    
    let showUIDisplay = $state(true);
    let savedTimeInSeconds = $state(0);
    let formattedTime = $state("");
    // let savedTimeInitialized = $state(false);
    const ENV = import.meta.env;
    
    const initializeTimeSpent = async () => {
        const timeStore = await getChromeStorage(TIMESPENT_STORE);
        savedTimeInSeconds = isNaN(timeStore) ? 0 : Number(timeStore);
        formattedTime = formatTime(savedTimeInSeconds);
        // savedTimeInitialized = true;
    };
    
    // should be called once initializeTimeSpent is called
    const intervalRunClock = () => {
        initializeTimeSpent();
        console.log('intervalRunClock called');
    
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
    
        if (isPathValid()) {
            clearInterval(runInterval);
            runInterval = intervalRunClock();
        }
    
        // showUIDisplay = isPathValid();
    
        return () => {
            console.log("App unmounted");
            clearInterval(runInterval);
        };
    });
    
    // As of Feb. 2025: This approach no longer works. Tiktok still displays reels homepage and change its url dynamically without changing the page. But we'll keep this in case it works in the future
    addUrlChangedEventListener(({ detail }: CustomEvent) => {
        console.log("URL changed", detail);
        // if (isPathValid()) {
        //     showUIDisplay = true;
        //     clearInterval(runInterval); // clear the interval to avoid multiple intervals running
        //     runInterval = intervalRunClock();
        // } else {
        //     showUIDisplay = false;
        //     clearInterval(runInterval);
        // }
    });

    addInHomePageEventListener(({ detail }: CustomEvent) => {
        showUIDisplay = true;
        console.log('Inside homepage');
    });
    addOutsideHomePageEventListener(({ detail }: CustomEvent) => {
        console.log('Outside homepage');
        showUIDisplay = false;
    });
    
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            console.log("Tab became active.");
            clearInterval(runInterval); // clear the interval to avoid multiple intervals running
            runInterval = intervalRunClock();
            // chrome.runtime.sendMessage({ status: "active" });
        } else {
            console.log("Tab went to the background.");
            clearInterval(runInterval);
            // chrome.runtime.sendMessage({ status: "inactive" });
        }
    });
    
    // For testing only. Remove once done in testing stage
    const resetCountdown = async () => {
        savedTimeInSeconds = 0;
        await setChromeStorage(TIMESPENT_STORE, savedTimeInSeconds);
    
        clearInterval(runInterval);
        runInterval = intervalRunClock();
    
    
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
            <button class="button p-3" style="color: #000;" onclick={resetCountdown}>Reset countdown</button>
        {/if}
    </main>
{/if}
