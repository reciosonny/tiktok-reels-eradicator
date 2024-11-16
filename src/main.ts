import { mount } from 'svelte';

import App from './App.svelte'
import { injectReelsEradicator } from './lib/injectReelsEradicator';

console.log('this is the main.ts file');

injectReelsEradicator();

const newEl = document.createElement('div');
newEl.style.cssText = "position: fixed; z-index: 9999; margin-left: 20em; margin-top: 10em;";

// const tiktokAppEl = document.getElementById('app') as HTMLElement;

const app = mount(App, { target: newEl });

setTimeout(() => {
    console.log('start app svelte inject');
    document.getElementById('app')?.appendChild(newEl); //gets inserted to the body of the page
    
}, 2000);

export default app
