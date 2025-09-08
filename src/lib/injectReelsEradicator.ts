import { mainDisplayStore } from "../store/mainDisplayStore.svelte";
import { settingStore } from "../store/settings.svelte";
import {
    dispatchInHomePageEvent,
    dispatchUrlChangedEvent,
} from "./customEvents";
import { mockWaitPromise } from "./utils";

const PATHS_TO_WATCH = ["/en", "/foryou", "/", "/friends", "/explore", "/following"];

// improve logic. use other declarations to improve the code
const isUrlValid = () => {
    const currentPath = window.location.pathname;

    return PATHS_TO_WATCH.some((path) => path === currentPath);
};

const interceptAndPauseVideos = async (videoEl?: HTMLVideoElement) => {
    const videos = videoEl ? [videoEl] : [...document.querySelectorAll("video")];
    await mockWaitPromise(300);

    videos.forEach((video) => {
        video.muted = true;
        video.pause();
    });
}

const disableExplorePage = async () => {

    if (settingStore.store.disableAllPages) {
        await mockWaitPromise(300);
        const el = document.getElementById('main-content-explore_page');
        if (el) {
            el.style.display = 'none';

            return true;
        }
    }

    return false
}

const disablePageElement = () => {
    // hide reel contents at the bottom to prevent scrolling further
    // TODO: maybe we can also reuse this logic in main.ts file
    let contentElement = document.getElementById("main-content-homepage_hot") ?? document.getElementById("main-content-friends_page");

    if (settingStore.store.disableAllPages) { //if settings is enabled to block all pages, query the rest of the page to block it also
        contentElement = document.getElementById("main-content-explore_page") ?? document.getElementById("main-content-homepage_follow") ?? contentElement;
    }

    if (contentElement) {
        contentElement.style.display = "none";
        interceptAndPauseVideos();
    }

    mainDisplayStore.setMainContentVisibility(!!contentElement);
}

/**
 * Logic for getting rid of reels goes here...
 */
export const injectReelsEradicator = async () => {
    console.log("injecting reels eradicator here...");

    let previousPath = window.location.pathname;

    const observer: MutationObserver = new MutationObserver(
        (mutationsList, observer) => {
            const currentPath = window.location.pathname;

            if (previousPath !== currentPath) { //could possibly be intercepted and watched using global store
                //let's put the video stopper here
                previousPath = currentPath;
                console.log("url changed...new url: ", currentPath);

                dispatchUrlChangedEvent(currentPath);
            }

            // Step 2: Define a callback function to handle the mutations
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    if (!isUrlValid()) {
                        mainDisplayStore.setMainContentVisibility(false);
                        return;
                    }

                    // Step 4: Filter the mutations to focus on video elements
                    // TODO: logic causing performance issues. optimize later or better yet use other approach than mutation observer
                    mutation.addedNodes.forEach(async (node) => {
                        if (node.nodeName === "VIDEO") {
                            const videoEl = node as HTMLVideoElement;
                            interceptAndPauseVideos(videoEl);
                        } else if (
                            node.nodeName === "DIV" ||
                            node.nodeName === "MAIN"
                        ) {
                            disablePageElement();
                        }
                    });
                }
            }
        }
    );

    // Step 3: Specify the target node and the configuration for the observer
    const config = { childList: true, subtree: true };

    // Start observing the target node (e.g., document.body)
    observer.observe(document.body, config);
};
