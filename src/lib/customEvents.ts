
export const URL_CHANGED_EVENT = 'urlChanged';

export const dispatchUrlChangedEvent = (path: string) => {
    // Step 1: Create a new event
    const customEventToDispatch = new CustomEvent(URL_CHANGED_EVENT, {
        detail: { path }
    });

    // Step 2: Dispatch the event
    document.dispatchEvent(customEventToDispatch);
}


export const addUrlChangedEventListener = (fn: (e: any) => void) => { 
    document.addEventListener(URL_CHANGED_EVENT, fn);
}