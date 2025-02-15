import { mount } from 'svelte';
import App from './App.svelte';


export const initOptionsEntry = () => {    
    setTimeout(() => {
        console.log('initializing options entry...');
        const elTarget = document.getElementById('appOptions');
    
        console.log('elTarget', elTarget);
    
        if (!elTarget) {
            return;
        }
        mount(App, { target: elTarget as HTMLElement });
    }, 100);
}