type StorageType = 'DISABLE_REEL_OPTIONS' | 'TIMESPENT_STORE' | 'DISABLE_DURATION';


export const getChromeStorage = async (key: StorageType) => {
    if (!chrome.storage) {
        console.log('Chrome storage not available', chrome);
        return null;
    }
    const result = await chrome.storage.local.get([key]);

    return result[key];
}

export const setChromeStorage = async (key: StorageType, val: any) => {
    if (!chrome.storage) {
        return;
    }

    await chrome.storage.local.set({ [key]: val });
}

export const removeChromeStorage = async (key: StorageType) => {
    if (!chrome.storage) {
        return;
    }

    await chrome.storage.local.remove(key);
}

