chrome.action.onClicked.addListener(async (tab) => {
    chrome.tabs.sendMessage(tab.id, { text: "" }, function (msg) {
        msg = msg || {};

        console.log("message status received from content script: ", msg);
    });

    console.log("checking tabs: ", chrome.tabs);

    try {
        // TODO: may no longer be necessary. or inject other scripts here instead when clicked
        // const result = await chrome.scripting.executeScript({
        //     target: { tabId: tab.id },
        //     files: ['./dist/extension-click-entry.js']
        // }); //injects foreground script to webpage
        // await chrome.scripting.insertCSS({
        //     target: { tabId: tab.id },
        //     files: ['./dist/index.css']
        // });
    } catch (ex) {
        console.error(ex);
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTabs") {

        console.log('query received...');
        chrome.storage.local.get("dateVal", (data) => {
            console.log('dateVal value: ', data.dateVal);
        });


        // chrome.tabs.query({}, (tabs) => {
        //     sendResponse({ tabs });
        // });
        return true; // Indicates that the response is asynchronous
    }
});

// Add an event listener for tab removal
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log(`Tab with ID ${tabId} was closed. `, removeInfo);
    // You can send a message to the content script or perform other actions here
});
