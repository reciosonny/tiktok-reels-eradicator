
export const URL_CHANGED_EVENT = 'urlChanged';
export const IN_HOMEPAGE_EVENT = 'IN_HOMEPAGE';
export const OUTSIDE_HOMEPAGE_EVENT = 'OUTSIDE_HOMEPAGE';
export const URL_EXCLUDED_BLOCK_EVENT = 'URL_EXCLUDED_BLOCK_EVENT';

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

export const dispatchInHomePageEvent = () => {
    // Step 1: Create a new event
    const customEventToDispatch = new CustomEvent(IN_HOMEPAGE_EVENT, {
        detail: "In homepage"
    });

    // Step 2: Dispatch the event
    document.dispatchEvent(customEventToDispatch);
}

export const addInHomePageEventListener = (fn: (e: any) => void) => { 
    document.addEventListener(IN_HOMEPAGE_EVENT, fn);
}

export const dispatchOutsideHomePageEvent = () => {
    // Step 1: Create a new event
    const customEventToDispatch = new CustomEvent(OUTSIDE_HOMEPAGE_EVENT, {
        detail: "Outside homepage"
    });

    // Step 2: Dispatch the event
    document.dispatchEvent(customEventToDispatch);
}

export const addOutsideHomePageEventListener = (fn: (e: any) => void) => { 
    document.addEventListener(OUTSIDE_HOMEPAGE_EVENT, fn);
}

export const dispatchUrlExcludedEvent = () => {
    // Step 1: Create a new event
    const customEventToDispatch = new CustomEvent(URL_EXCLUDED_BLOCK_EVENT, {
        detail: "url excluded from reels block"
    });

    // Step 2: Dispatch the event
    document.dispatchEvent(customEventToDispatch);
}

export const addUrlExcludedListener = (fn: (e: any) => void) => { 
    document.addEventListener(URL_EXCLUDED_BLOCK_EVENT, fn);
}
