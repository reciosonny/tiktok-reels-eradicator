import { mount } from 'svelte';
import dayjs from 'dayjs';
import appCss from './app.css?inline';
import styleCss from './style.scss?inline';
import App from './App.svelte'
import AppOptions from './browser-widgets/options/App.svelte';

import { injectReelsEradicator } from './lib/injectReelsEradicator';
import { getChromeStorage } from '$lib/chromeStorage';
import { settingStore } from './store/settings.svelte';

const injectLocalFonts = () => {
    const rubikUrl = chrome.runtime.getURL('fonts/Rubik-VariableFont_wght.ttf');
    const rubikItalicUrl = chrome.runtime.getURL('fonts/Rubik-Italic-VariableFont_wght.ttf');
    const dmSansUrl = chrome.runtime.getURL('fonts/DMSans.ttf');
    const dmSansItalicUrl = chrome.runtime.getURL('fonts/DMSans-Italic.ttf');

    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: "Rubik";
            src: url("${rubikUrl}") format("truetype");
            font-weight: 300 900;
            font-style: normal;
            font-display: swap;
        }
        @font-face {
            font-family: "Rubik";
            src: url("${rubikItalicUrl}") format("truetype");
            font-weight: 300 900;
            font-style: italic;
            font-display: swap;
        }
        @font-face {
            font-family: "DM Sans";
            src: url("${dmSansUrl}") format("truetype");
            font-weight: 100 1000;
            font-style: normal;
            font-display: swap;
        }
        @font-face {
            font-family: "DM Sans";
            src: url("${dmSansItalicUrl}") format("truetype");
            font-weight: 100 1000;
            font-style: italic;
            font-display: swap;
        }
    `;
    document.head.appendChild(style);
};

injectLocalFonts();

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

// TODO: Add UI for localhost dev as well that points to the site for testing
if (window.location.protocol !== "chrome-extension:") {
    injectReelsEraticatorFn();

    // Create Shadow DOM host for CSS isolation from the site's styles
    const host = document.createElement('div');
    host.id = 'feed-breaker-host';
    host.style.cssText = 'position: fixed; z-index: 99999; top: 0; left: 0; width: 0; height: 0; overflow: visible; pointer-events: none;';
    document.body.appendChild(host);

    const shadowRoot = host.attachShadow({ mode: 'open' });

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(appCss + styleCss);
    shadowRoot.adoptedStyleSheets = [sheet];

    const container = document.createElement('div');
    shadowRoot.appendChild(container);

    const app = mount(App, { target: container });
} else { //mount the options page here...
    // Inject CSS globally for the options page (no site styles to conflict with)
    const style = document.createElement('style');
    style.textContent = appCss + styleCss;
    document.head.appendChild(style);

    setTimeout(() => {
        const elTarget = document.getElementById('appOptions');
        if (!elTarget) {
            return;
        }
        const app = mount(AppOptions, { target: elTarget as HTMLElement });
    }, 100);
}