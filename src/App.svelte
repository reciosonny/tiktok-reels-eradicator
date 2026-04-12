<script lang="ts">
    import { getChromeStorage, setChromeStorage } from "./lib/chromeStorage";
    import { addInHomePageEventListener, addOutsideHomePageEventListener, addUrlChangedEventListener, addUrlExcludedListener } from "./lib/customEvents";
    import { formatTime } from "./lib/dateTimeHelper";
    import { TIMESPENT_STORE } from "./lib/enums";
    import { isPathValid } from "./lib/routeHelper";
    import { mainDisplayStore } from "./store/mainDisplayStore.svelte";
    import { settingStore as settingsStore } from "./store/settings.svelte";
    
    let savedTimeInSeconds = $state(0);
    let formattedTime = $state("");
    const ENV = import.meta.env;

    const initializeTimeSpent = async () => {
        const timeStore = await getChromeStorage('TIMESPENT_STORE');
        savedTimeInSeconds = isNaN(timeStore) ? 0 : Number(timeStore);
        formattedTime = formatTime(savedTimeInSeconds);
    };
    
    // should be called once initializeTimeSpent is called
    const intervalRunClock = () => {
        initializeTimeSpent();
    
        return setInterval(async () => {
            savedTimeInSeconds++;
            formattedTime = formatTime(savedTimeInSeconds);
    
            await setChromeStorage('TIMESPENT_STORE', savedTimeInSeconds);
        }, 1000);
    };
    
    /**
     * This is used to keep track of the interval so that we can clear it when the component is unmounted
     */
    let runInterval: number;
    
    /**
     * Mount component
    */
    $effect(() => {
        if (isPathValid()) {
            clearInterval(runInterval);
            runInterval = intervalRunClock();
        }

        return () => {
            console.log("App unmounted");
            clearInterval(runInterval);
        };
    });

    addUrlChangedEventListener(({ detail }: CustomEvent) => {
        if (isPathValid()) {
            clearInterval(runInterval); // clear the interval to avoid multiple intervals running
            runInterval = intervalRunClock();
        } else {
            clearInterval(runInterval);
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            console.log("Tab became active.");
            clearInterval(runInterval); // clear the interval to avoid multiple intervals running
            runInterval = intervalRunClock();
        } else {
            console.log("Tab went to the background.");
            clearInterval(runInterval);
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

{#if mainDisplayStore.store.isVisible}
    <main class="tiktok-reels-eradicator-main">
        <div class="flex flex-col gap-2.5">
            <h1 class="heading-sm leading-none">This page is blocked</h1>
            <p class="body-lg leading-none">
                You saved: <strong>{formattedTime}</strong> worth of distraction from
                scrolling tiktok
            </p>
        </div>

        {#if ENV.VITE_APP_MODE === 'development'}
            <div class="pt-4">
                <button class="button mt-4 p-3 text-text" onclick={resetCountdown}>Reset countdown</button>
            </div>
        {/if}
    </main>
{/if}
