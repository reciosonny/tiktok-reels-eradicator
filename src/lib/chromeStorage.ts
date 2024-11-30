


export const getChromeStorage = async (key: string) => {
    const result = await chrome.storage.local.get([key]);

    return result[key];
}

export const setChromeStorage = async (key: string, val: any) => {
    await chrome.storage.local.set({ [key]: val });
}


