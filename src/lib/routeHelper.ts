import { PATHS_TO_WATCH } from "./utils";


/**
 * Checks if path is valid to run the logic in this extension to block reels
 */
export const isPathValid = () => {
    const currentPath = window.location.pathname;

    return PATHS_TO_WATCH.some((path) => path === currentPath);
};
