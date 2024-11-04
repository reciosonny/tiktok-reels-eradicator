<script lang="ts">

    $effect(() => {
        console.log("App mounted");

        
        // Step 1: Create a MutationObserver instance
        const observer = new MutationObserver((mutationsList, observer) => {
            // Step 2: Define a callback function to handle the mutations
            for (const mutation of mutationsList) {
                if (mutation.type === "childList") {
                    // Step 4: Filter the mutations to focus on video elements
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeName === "VIDEO") {
                            setTimeout(() => {
                                const videoEl = node as HTMLVideoElement;

                                videoEl.muted = true;
                                videoEl.pause();
                            }, 300);
                        } else if (node.nodeName === "DIV") { //TODO: code is not efficient here yet atm
                            const divEl = node as HTMLElement;
                            console.log("Div element found", divEl.classList);
                            // if (
                            //     [...divEl.classList].some(
                            //         (x) =>
                            //             x ===
                            //                 "css-1cps6d6-BaseGridLayout-DivVerticalGridLayout" ||
                            //             x === "e1716dta2",
                            //     )
                            // ) {
                            //     console.log("Reel view found", divEl);
                            //     divEl.style.display = "none";
                            // }

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
        });

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
