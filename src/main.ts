import { mount } from 'svelte';
import dayjs from 'dayjs';
import './app.css';
import './style.scss';
import App from './App.svelte'
import AppOptions from './browser-widgets/options/App.svelte';

import { injectReelsEradicator } from './lib/injectReelsEradicator';
import { getChromeStorage } from '$lib/chromeStorage';
import { settingStore } from './store/settings.svelte';

const injectReelsEraticatorFn = async () => {
    const disableDuration = await getChromeStorage('DISABLE_DURATION');
    const currentDateTime = dayjs().valueOf();
    
    const disableReelBlock = disableDuration > currentDateTime || disableDuration === 'forever';

    settingStore.setDisableUIBlocker(disableReelBlock);

    if (!disableReelBlock) {
        injectReelsEradicator();
    } else {
        // TODO: Set localstorage default values here...
    }
}

// TODO: Add UI for localhost dev as well that points to tiktok for testing
if (window.location.protocol !== "chrome-extension:") {
    injectReelsEraticatorFn();
    
    setTimeout(() => { // a delay to make sure the component is mounted
        const app = mount(App, { target: document.getElementById('app') as HTMLElement });
    }, 100);
} else { //mount the options page here...
    setTimeout(() => {
        const elTarget = document.getElementById('appOptions');
        if (!elTarget) {
            return;
        }
        const app = mount(AppOptions, { target: elTarget as HTMLElement });        
    }, 100);
}