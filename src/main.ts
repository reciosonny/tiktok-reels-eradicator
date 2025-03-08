import { mount } from 'svelte';
import dayjs from 'dayjs';
import './app.css';
import './style.scss';
import App from './App.svelte'
import AppOptions from './browser-widgets/options/App.svelte';

import { injectReelsEradicator } from './lib/injectReelsEradicator';
import { getChromeStorage } from '$lib/chromeStorage';

const injectReelsEraticatorFn = async () => {
    const disableDuration = await getChromeStorage('DISABLE_DURATION');
    const currentDateTime = dayjs().valueOf();
    
    console.log('disable duration: ', disableDuration);
    const disableReelBlock = disableDuration > currentDateTime || disableDuration === 'forever';
    
    if (!disableReelBlock) {
        injectReelsEradicator();
    }
}

if (window.location.protocol !== "chrome-extension:") {
    injectReelsEraticatorFn();

    // mount(App, { target: document.getElementById('app') as HTMLElement });
    
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