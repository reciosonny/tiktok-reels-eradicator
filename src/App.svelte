<script lang="ts">

    const URL_TO_WATCH = "https://www.tiktok.com/en";

    // improve logic. use other declarations to improve the code
    const isUrlValid = () => {
        const currentUrl = window.location.href;

        return currentUrl === URL_TO_WATCH;
    };

    $effect(() => {
        console.log("App mounted");

        const observer: MutationObserver = new MutationObserver(
            (mutationsList, observer) => {

                // Step 2: Define a callback function to handle the mutations
                for (const mutation of mutationsList) {
                    if (mutation.type === "childList") {
                        if (!isUrlValid()) {
                            return;
                        }
                        
                        // Step 4: Filter the mutations to focus on video elements
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeName === "VIDEO") {
                                setTimeout(() => {
                                    //TODO: improve logic. only pause / mute the video in "for you" page only
                                    const videoEl = node as HTMLVideoElement;

                                    videoEl.muted = true;
                                    videoEl.pause();
                                }, 300);
                            } else if (node.nodeName === "DIV") {
                                // not efficient, yes. we'll find other ways to improve the removal of display other than triggering it in the mutation observer multiple times
                                const reelViewEl = document.querySelector(
                                    "div.css-1cps6d6-BaseGridLayout-DivVerticalGridLayout.e1716dta2",
                                ) as HTMLElement;

                                if (reelViewEl) {
                                    reelViewEl.style.display = "none";
                                }
                            }
                        });
                    }
                }
            },
        );

        // Step 3: Specify the target node and the configuration for the observer
        const config = { childList: true, subtree: true };

        // Start observing the target node (e.g., document.body)
        observer.observe(document.body, config);

        return () => {
            console.log("App unmounted");
            observer.disconnect();
        };
    });
</script>

<main class="p-10">
    <h1>Hello world</h1>
    <span
        >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus,
        facilis assumenda sed aliquid cupiditate provident minima nostrum soluta
        nemo, deleniti ratione quisquam expedita ipsam vel molestias harum animi
        cumque optio!</span
    >
</main>
