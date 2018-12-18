import { LOGIN_URL} from './fasitProperties';

const whiteList = [
    '/stillinger',
    '/kandidater'
];

const isValidContext = (context) => (
    context.indexOf('/stilling/') === 0
);

export const redirectToContext = () => {
    window.location.href = `${window.location.origin}${getContextParameter()}`;
};

export const hasContextParameter = () => {
    const parameter = window.location.search.split("=");
    return parameter[0] === '?context' && isValidContext(parameter[1]);
};

export const getContextParameter = () => (
    window.location.search.split("=")[1]
);

export const loginAndRedirectToAd = (uuid) => {
    const redirect = `${window.location.origin}/stilling/${uuid}`;
    login(redirect);
};

export const loginAndRedirectToCurrentLocation = () => {
    if (!whiteList.includes(window.location.pathname)) {
        login(window.location.origin);
    } else {
        login(window.location.href);
    }
};

const login = (redirect) => {
    window.location.href = `${LOGIN_URL}?redirect=${encodeURIComponent(redirect)}`;
};
