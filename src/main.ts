import { mount } from 'svelte';
import './app.css';
import './style.scss';
import App from './App.svelte'
import AppOptions from './browser-widgets/options/App.svelte';

import { injectReelsEradicator } from './lib/injectReelsEradicator';


if (window.location.protocol !== "chrome-extension:") {
    injectReelsEradicator();
    // mount(App, { target: document.getElementById('app') as HTMLElement });
    
    setTimeout(() => { // a delay to make sure the component is mounted
        const app = mount(App, { target: document.getElementById('app') as HTMLElement });
    }, 100);    
} else {
    setTimeout(() => {
        const elTarget = document.getElementById('appOptions');
        if (!elTarget) {
            return;
        }
        const app = mount(AppOptions, { target: elTarget as HTMLElement });        
    }, 100);
}

console.log(window.location);