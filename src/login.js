import { LOGIN_URL } from './fasitProperties';

export const redirectToLogin = () => {
    window.location.href =
        LOGIN_URL + '?redirectUri=' + window.location.href;
};
