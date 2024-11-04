import { mount } from 'svelte';

import App from './App.svelte'

const newEl = document.createElement('div');

const app = mount(App, { target: newEl })

document.body.appendChild(newEl); //gets inserted to the body of the page

export default app
