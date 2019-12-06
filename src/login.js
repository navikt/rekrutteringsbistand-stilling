import { LOGIN_URL } from './fasitProperties';

const whiteList = ['/stillinger', '/kandidater'];

const validUrlPaths = ['?/stilling', '?/minestillinger', '?/kandidater'];

const getUrlPath = () =>
    // Remove question mark
    window.location.search.substring(1);

export const redirectToUrlPath = () => {
    window.location.href = `${window.location.origin}${getUrlPath()}`;
};

export const urlHasPath = () => {
    return (
        window.location.search &&
        validUrlPaths.some(path => window.location.search.startsWith(path))
    );
};

export const loginWithRedirectToCurrentLocation = () => {
    if (!window.location.pathname || window.location.pathname === '/') {
        window.location.href = `${LOGIN_URL}?redirect=${encodeURIComponent(
            window.location.origin
        )}`;
    } else if (whiteList.includes(window.location.pathname)) {
        window.location.href = `${LOGIN_URL}?redirect=${encodeURIComponent(window.location.href)}`;
    } else {
        const subPath = encodeURIComponent(window.location.pathname);
        window.location.href = `${LOGIN_URL}?redirect=${window.location.origin}?${subPath}`;
    }
};
