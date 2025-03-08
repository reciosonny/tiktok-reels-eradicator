import {
    dispatchInHomePageEvent,
    dispatchOutsideHomePageEvent,
    dispatchUrlChangedEvent,
} from "./customEvents";

const PATHS_TO_WATCH = ["/en", "/foryou", "/", "/friends", "/explore"];

// improve logic. use other declarations to improve the code
const isUrlValid = () => {
    const currentPath = window.location.pathname;

    return PATHS_TO_WATCH.some((path) => path === currentPath);
};

/**
 * Logic for getting rid of reels goes here...
 */
export const injectReelsEradicator = async () => {
    console.log("injecting reels eradicator here...");

    let previousPath = window.location.pathname;

    const observer: MutationObserver = new MutationObserver(
        (mutationsList, observer) => {
            const currentPath = window.location.pathname;

            if (previousPath !== currentPath) {
                previousPath = currentPath;
                console.log("url changed...new url: ", currentPath);

                dispatchUrlChangedEvent(currentPath);
            }

            // Step 2: Define a callback function to handle the mutations
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    if (!isUrlValid()) {
                        return;
                    }

                    // Step 4: Filter the mutations to focus on video elements
                    // TODO: logic causing performance issues. optimize later or better yet use other approach than mutation observer
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeName === "VIDEO") {
                            console.log('video logic disabled...');
                            // setTimeout(() => {
                            //     //TODO: improve logic. only pause / mute the video in "for you" page only
                            //     const videoEl = node as HTMLVideoElement;

                            //     // videoEl.muted = true;
                            //     videoEl.pause();
                            // }, 300);
                        } else if (node.nodeName === "DIV" || node.nodeName === 'MAIN') {
                            //TODO: not efficient, yes. we'll find other ways to improve the removal of display other than triggering it in the mutation observer multiple times
                            const reelViewEl = document.querySelector(
                                "div.css-1cps6d6-BaseGridLayout-DivVerticalGridLayout.e1716dta2"
                            ) as HTMLElement;

                            if (reelViewEl) {
                                reelViewEl.style.display = "none";
                            }

                            // hide reel contents at the bottom to prevent scrolling further
                            // TODO: maybe we can also reuse this logic in main.ts file
                            const mainContentReels =
                                document.getElementById("main-content-homepage_hot") ??
                                document.getElementById("main-content-friends_page");
                            if (mainContentReels) {
                                mainContentReels.style.display = "none";
                                dispatchInHomePageEvent();
                            } else {
                                dispatchOutsideHomePageEvent();
                            }
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
