import { LOGIN_URL } from './fasitProperties';

export const redirectToLogin = () => {
    window.location.href = `${LOGIN_URL}?redirect=${window.location.origin}`;
};
