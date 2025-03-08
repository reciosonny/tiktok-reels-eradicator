// Function to set properties and dispatch custom events
function setWindowProperty(property: any, value: any) {
    const oldValue = window[property];
    window[property] = value;

    const event = new CustomEvent('windowPropertyChange', {
        detail: {
            property,
            oldValue,
            newValue: value
        }
    });

    window.dispatchEvent(event);
}

// Example usage
setWindowProperty('extensionClicked', true); // This will trigger the event listener. Note: I don't think we need to change any window property in the extension, just emit the event listener.
