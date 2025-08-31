const createSettings = () => {
    let settings = $state({
        disableDuration: 0,
        isUIBlockerVisible: false
    });

    const setBlockerVisibility = (visible: boolean) => {
        settings.isUIBlockerVisible = visible;
    }

    return { 
        get settings() { return settings }, 
        setBlockerVisibility 
    };
}

export const settings = createSettings();