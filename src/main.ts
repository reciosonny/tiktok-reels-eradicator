import { mount } from 'svelte';

import './style.scss';


import App from './App.svelte'
import { injectReelsEradicator } from './lib/injectReelsEradicator';

injectReelsEradicator();

// Listen for popstate event (for history API navigation)
window.addEventListener('popstate', function(event) { //is this still relevant???
    console.log('URL changed to:', window.location.href);
});

// Listen for hashchange event (for hash-based routing)
window.addEventListener('hashchange', function() { //is this still relevant???
    console.log('Hash changed to:', window.location.hash);
});


setTimeout(() => { //add a delay to make sure the component is mounted
    const app = mount(App, { target: document.getElementById('app') as HTMLElement });
}, 2000);