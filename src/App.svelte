<script lang="ts">
    import { addUrlChangedEventListener } from "./lib/customEvents";
    import { isPathValid } from "./lib/routeHelper";

    let showUIDisplay = $state(true);

    let savedTime = 13356; // Example saved time in seconds //TODO: Refactor to get the saved time from chrome storage
    let formattedTime = $state(formatTime(savedTime));

    function formatTime(seconds: number) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs} hours, ${mins} minutes, and ${secs} seconds`;
    }

    // TODO: Refactor
    const getSetChromeStorage = async () => {
        console.log("access chrome storage: ", chrome.storage.local);

        // chrome.storage.local.set({ dateVal: new Date().getTime() }, function () {
        //     console.log('date is being set');
        // });

        // TODO: Need to find a way to save the date in chrome storage only if the tiktok tab has been closed
        const dateValStorage = await chrome.storage.local.get(["dateVal"]);

        console.log(
            "[dateVal] Value currently is",
            new Date(dateValStorage.dateVal),
        );
        console.log("current date ", new Date());

        chrome.storage.local.get(["val"], function (result) {
            console.log("the valuessasdfgqwe: ", result);
        });
    };

    getSetChromeStorage();

    // console.log('chrome tabs: ', chrome)
    // console.log(chrome.runtime.lastError)

    chrome.runtime.sendMessage({ action: "getTabs" }, (response) => {
        console.log("Tabs: ", response.tabs);
    });

    $effect(() => {
        console.log("App mounted");

        const interval = setInterval(async () => {
            //TODO: Add a DB call to update the saved time (probably localStorage or chrome storage). Also stop the time counting when user is not on tiktok or user is viewing a reel
            savedTime++; //TODO: When time is changed, save this to chrome storage. We need to take a look at what storage will we use (local, session, sync)
            formattedTime = formatTime(savedTime);

            await chrome.storage.local.set({ timeSpentVal: savedTime });

            console.log("Time spent is saved: ", savedTime);

            // chrome.runtime.sendMessage({ action: "onSaveTimeSpent" }, (response) => {
            //     // console.log("Tabs: ", response.tabs);
            // });
        }, 1000);

        // Note: I don't think we need to focus on optimization for now
        // window.addEventListener("beforeunload", function (e) {
        //     console.log("user is about to close the tab");
        //     // Cancel the event
        //     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        //     // Chrome requires returnValue to be set
        //     e.returnValue = "are you sure you want to close the tab?";
        // });

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
            You saved: <strong>{formattedTime}</strong> worth of distraction from
            scrolling tiktok reels
        </p>
    </main>
{/if}
