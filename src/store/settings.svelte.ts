const createSettings = () => {
    let store = $state({
        disableDuration: 0,
        disableUIBlock: false
    });

    const setDisableUIBlocker = (value: boolean) => {
        store.disableUIBlock = value;
    }

    return {
        get store() { return store }, 
        setDisableUIBlocker
    };
}

export const settingStore = createSettings();