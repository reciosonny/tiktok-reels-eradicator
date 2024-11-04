chrome.action.onClicked.addListener(async (tab) => {
    chrome.tabs.sendMessage(tab.id, { text: '' }, function (msg) {
        msg = msg || {};

        console.log('message status received from content script: ', msg);
    });

    try {
        // TODO: may no longer be necessary. or inject other scripts here instead when clicked
        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['./dist/extension-click-entry.js']
        }); //injects foreground script to webpage

        // await chrome.scripting.insertCSS({
        //     target: { tabId: tab.id },
        //     files: ['./dist/index.css']
        // });
    } catch (ex) {
        console.error(ex);
    }
});