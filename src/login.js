import { LOGIN_URL } from './fasitProperties';

const whiteList = [
    'stillinger',
    'kandidater'
];

export const redirectToLogin = () => {
    if (!whiteList.includes(window.location.pathname)) {
        window.location.href = `${LOGIN_URL}?redirect=${encodeURIComponent(window.location.origin)}`;
    } else {
        window.location.href = `${LOGIN_URL}?redirect=${encodeURIComponent(window.location.href)}`;
    }
};
