

const PATHS_TO_WATCH = ["/en", "/foryou", "/"];

/**
 * Checks if path is valid to run the logic in this extension to block reels
 */
export const isPathValid = () => {
    const currentPath = window.location.pathname;

    return PATHS_TO_WATCH.some((path) => path === currentPath);
};
