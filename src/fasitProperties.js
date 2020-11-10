/* eslint-disable */

export const REKRUTTERINGSBISTAND_BASE_URL =
    window.STILLING_REKRUTTERINGSBISTAND_BASE_URL ||
    process.env.REACT_APP_REKRUTTERINGSBISTAND_BASE_URL;
export const AD_API = `${REKRUTTERINGSBISTAND_BASE_URL}/rekrutteringsbistand/api/v1`;
export const SEARCH_API = `${REKRUTTERINGSBISTAND_BASE_URL}/search-api`;
export const REKRUTTERING_API = `${REKRUTTERINGSBISTAND_BASE_URL}/rekruttering`;

export const KANDIDATLISTE_API = '/kandidater/rest/veileder';
export const KANDIDATSOK_API = `${KANDIDATLISTE_API}/kandidatsok`;

export const VIS_STILLING_URL =
    window.STILLING_VIS_STILLING_URL || process.env.REACT_APP_VIS_STILLING_URL;
export const LOGIN_URL = window.STILLING_LOGIN_URL || process.env.REACT_APP_LOGIN_URL;
