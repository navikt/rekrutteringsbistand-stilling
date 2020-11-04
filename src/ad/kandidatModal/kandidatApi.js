import { KANDIDATLISTE_API, KANDIDATSOK_API } from '../../fasitProperties';

export class KandidatSokError {
    constructor(error) {
        this.message = error.message;
        this.status = error.status;
    }
}

export const postKandidatTilKandidatliste = (kandidatlisteId, kandidat) =>
    postKandidaterTilKandidatliste(kandidatlisteId, [kandidat]);

export const postKandidaterTilKandidatliste = (kandidatlisteId, kandidater) =>
    postJson(
        `${KANDIDATLISTE_API}/kandidatlister/${kandidatlisteId}/kandidater`,
        JSON.stringify(kandidater)
    );

export const fetchKandidatMedFnr = (fnr) =>
    postJson(`${KANDIDATSOK_API}/fnrsok`, JSON.stringify({ fnr }));

export const putKandidatliste = (stillingsId) =>
    putRequest(`${KANDIDATLISTE_API}/stilling/${stillingsId}/kandidatliste/`);

export const fetchKandidatliste = (stillingsId) =>
    fetchJson(`${KANDIDATLISTE_API}/stilling/${stillingsId}/kandidatliste`, true);

async function postJson(url, bodyString) {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: bodyString,
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
                Accept: 'application/json',
            },
            mode: 'cors',
        });
        if (response.status === 200 || response.status === 201) {
            return response.json();
        }
        throwError(undefined, response.status);
    } catch (e) {
        throwError(e.message, e.status);
    }
}

async function fetchJson(url) {
    try {
        const response = await fetch(url, { credentials: 'include' });
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        let error;
        try {
            error = await response.json();
        } catch (e) {
            throwError(response.statusText, response.status);
        }
        throwError(error.message, error.status);
    } catch (e) {
        throwError(e.message, e.status);
    }
}

async function putRequest(url) {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            },
            mode: 'cors',
        });
        if (!(response.status >= 200 && response.status < 300)) {
            throwError(undefined, response.status);
        }
    } catch (e) {
        throwError(e.message, e.status);
    }
}

const throwError = (message, status) => {
    throw new KandidatSokError({ message, status });
};

const getCookie = (name) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};
