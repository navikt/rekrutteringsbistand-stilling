import { AD_API } from '../fasitProperties';
import locations from './kommuner';
import styrk from './styrk';

export class ApiError {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

async function get(url) {
    let response;
    try {
        response = await fetch(url, {
            method: 'GET'
        });
    } catch (e) {
        throw new ApiError(e.message, 0);
    }

    if (response.status !== 200) {
        throw new ApiError(response.statusText, response.status);
    }
    return response.json();
}

async function post(url, query) {
    let response;
    try {
        response = await fetch(url, {
            body: JSON.stringify(query),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        throw new ApiError(e.message, 0);
    }

    if (response.status !== 200) {
        throw new ApiError(response.statusText, response.status);
    }
    return response.json();
}

export async function fetchStilling(uuid) {
    return get(`${AD_API}ads/${uuid}`);
}

export async function fetchAds() {
    return get(`${AD_API}ads/`);
}

export async function fetchEmployerSuggestions(prefix) {
    return Promise.resolve([`${prefix}`, `${prefix} AS`, `${prefix} Norge`]);
}

export async function fetchLocationSuggestions(prefix) {
    return Promise.resolve(locations.filter((l) => (
            l.kode.toLowerCase().startsWith(prefix.toLowerCase()) ||
            l.navn.toLowerCase().startsWith(prefix.toLowerCase())
        )
    ));
}

export async function fetchStyrkSuggestions(prefix) {
    return Promise.resolve(styrk.filter((s) => (
            s.code.length === 4 && (
                s.code.toLowerCase().startsWith(prefix.toLowerCase()) ||
                s.name.toLowerCase().indexOf(prefix.toLowerCase()) !== -1
            )
        )
    ));
}


