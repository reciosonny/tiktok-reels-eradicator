const createSettings = () => {
    let store = $state({
        disableDuration: 0,
        disableUIBlock: false,
        disableAllPages: false,
    });

    const setDisableUIBlocker = (value: boolean) => {
        store.disableUIBlock = value;
    }

    const setDisableExplorePage = (value: boolean) => {
        store.disableAllPages = value;
    }

    return {
        get store() { return store }, 
        setDisableUIBlocker, 
        setDisableExplorePage
    };
}

export const settingStore = createSettings();