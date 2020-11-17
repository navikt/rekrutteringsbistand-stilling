import { LOGIN_URL } from './fasitProperties';

const whiteList = ['/stillinger', '/kandidater'];

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
