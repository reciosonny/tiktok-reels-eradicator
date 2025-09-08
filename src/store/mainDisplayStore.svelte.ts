const createMainDisplayStore = () => {
    let store = $state({
        isVisible: false,
    });

    const setMainContentVisibility = (visible: boolean) => {
        store.isVisible = visible;
    }

    return { 
        get store() { return store }, 
        setMainContentVisibility 
    };
}

export const mainDisplayStore = createMainDisplayStore();