chrome.action.onClicked.addListener(async (tab) => {
    chrome.runtime.openOptionsPage();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTabs") {
        chrome.storage.local.get("dateVal", (data) => {
            console.log('dateVal value: ', data.dateVal);
        });

        return true; // Indicates that the response is asynchronous
    }
});

// Add an event listener for tab removal
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log(`Tab with ID ${tabId} was closed. `, removeInfo);
    // You can send a message to the content script or perform other actions here
});
