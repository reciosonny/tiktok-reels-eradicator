const createRouteStore = () => {
    let routeLogic = $state({
        mainContentIsVisible: false,
    });

    const setMainContentVisibility = (visible: boolean) => {
        routeLogic.mainContentIsVisible = visible;
    }

    return { 
        get mutations() { return routeLogic }, 
        setMainContentVisibility 
    };
}

export const routeStore = createRouteStore();