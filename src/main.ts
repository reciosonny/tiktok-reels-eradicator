import { mount } from 'svelte';

import './style.scss';
import App from './App.svelte'

import { injectReelsEradicator } from './lib/injectReelsEradicator';

injectReelsEradicator();

setTimeout(() => { //add a delay to make sure the component is mounted
    const app = mount(App, { target: document.getElementById('app') as HTMLElement });
}, 2000);