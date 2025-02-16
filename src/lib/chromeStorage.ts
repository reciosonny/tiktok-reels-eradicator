


export const getChromeStorage = async (key: string) => {
    if (!chrome.storage) {
        console.log('Chrome storage not available', chrome);
        return null;
    }
    const result = await chrome.storage.local.get([key]);

    return result[key];
}

export const setChromeStorage = async (key: string, val: any) => {
    if (!chrome.storage) {
        return;
    }

    await chrome.storage.local.set({ [key]: val });
}


