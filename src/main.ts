import { mount } from 'svelte';
import { initOptionsEntry } from './browser-widgets/options/main';
import './style.scss';
import App from './App.svelte'

import { injectReelsEradicator } from './lib/injectReelsEradicator';


if (window.location.protocol !== "chrome-extension:") {
    injectReelsEradicator();
    setTimeout(() => { //add a delay to make sure the component is mounted
        const app = mount(App, { target: document.getElementById('app') as HTMLElement });
    }, 2000);    
}

initOptionsEntry();

console.log(window.location);