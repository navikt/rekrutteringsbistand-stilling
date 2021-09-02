import AdminStatusEnum from '../common/enums/AdminStatusEnum';
import toUrl from '../common/toUrl';
import { loginWithRedirectToCurrentLocation } from '../login';
import Stilling, {
    Administration,
    AdminStatus,
    Kilde,
    Privacy,
    Rekrutteringsbistandstilling,
    Stillingsinfo,
    System,
} from '../Stilling';

export const stillingApi = '/rekrutteringsbistand-stilling/stilling-api';

// Bruk mock-api hvis app kjører via "npm run mock"
if (process.env.REACT_APP_MOCK) {
    require('../mock/api');
}

export class ApiError {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

async function request(url: string, options?: RequestInit) {
    let response: Response;

    try {
        response = await fetch(url, options);
    } catch (e) {
        throw new ApiError('Network Error', 0);
    }

    if (response.status === 204) {
        return '';
    }

    if (response.status !== 200 && response.status !== 201) {
        if (response.status === 401) {
            loginWithRedirectToCurrentLocation();
        } else {
            throw new ApiError(response.statusText, response.status);
        }
    }

    return response.json();
}

export async function fetchGet(url: string): Promise<any> {
    return request(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache, no-store',
        },
    });
}

export async function fetchPost(url: string, body: object) {
    return request(url, {
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });
}

export async function fetchPut(url: string, body: object) {
    return request(url, {
        body: JSON.stringify(body),
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });
}

export async function fetchDelete(url: string) {
    return request(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });
}

/**
 * TODO: Dette er en workaround, fordi det finnes annonser med ad.administration=null i databasen.
 * Når databasen er migrert og ikke inneholder administration=null kan denne workarounden fjernes.
 */
const fixMissingAdministration = (ad: Stilling): Stilling => ({
    ...ad,
    administration: {
        comments: '',
        status: AdminStatus.Received,
        reportee: '',
        navIdent: '',
        remarks: [],
    },
});

export const fetchAd = async (uuid: string): Promise<Rekrutteringsbistandstilling> => {
    const rekrutteringsbistandstilling: Rekrutteringsbistandstilling = await fetchGet(
        `${stillingApi}/rekrutteringsbistandstilling/${uuid}`
    );

    if (rekrutteringsbistandstilling.stilling.administration === null) {
        return {
            ...rekrutteringsbistandstilling,
            stilling: fixMissingAdministration(rekrutteringsbistandstilling.stilling),
        };
    }

    return rekrutteringsbistandstilling;
};

export const fetchStillingsinfo = async (uuid: string): Promise<Stillingsinfo> =>
    fetchGet(`${stillingApi}/rekruttering/stilling/${uuid}`);

export const fetchRekrutteringsbistandstilling = async (
    uuid: string
): Promise<Rekrutteringsbistandstilling> =>
    fetchGet(`${stillingApi}/rekrutteringsbistandstilling/${uuid}`);

export const fetchStillingsinfoForVeileder = async (navIdent: string): Promise<Stillingsinfo> =>
    fetchGet(`${stillingApi}/rekruttering/ident/${navIdent}`);

export type Side<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
};

export const fetchMyAds = async (query: object): Promise<Side<Rekrutteringsbistandstilling>> => {
    const baseUrl = `${stillingApi}/rekrutteringsbistand/api/v1/ads/rekrutteringsbistand/minestillinger`;
    const result = await fetchGet(`${baseUrl}${toUrl(query)}`);

    return {
        ...result,
        content: result.content.map((ad: Stilling) => {
            if (ad.administration === null) {
                return fixMissingAdministration(ad);
            }
            return ad;
        }),
    };
};

const employerNameCompletionQueryTemplate = (match: string) => ({
    query: {
        match_phrase: {
            navn_ngram_completion: {
                query: match,
                slop: 5,
            },
        },
    },
    size: 50,
});

export async function fetchEmployerNameCompletionHits(match: string) {
    const result = await fetchPost(
        `${stillingApi}/search-api/underenhet/_search`,
        employerNameCompletionQueryTemplate(match)
    );

    return {
        match,
        result: [
            ...result.hits.hits.map((employer: any) => ({
                name: employer._source.navn,
                orgnr: employer._source.organisasjonsnummer,
                location: employer._source.adresse
                    ? {
                          address: employer._source.adresse.adresse,
                          postalCode: employer._source.adresse.postnummer,
                          city: employer._source.adresse.poststed,
                      }
                    : undefined,
            })),
        ],
    };
}

export async function fetchOrgnrSuggestions(value: string) {
    const match = value.replace(/\s/g, '');
    const result = await fetchGet(
        `${stillingApi}/search-api/underenhet/_search?q=organisasjonsnummer:${match}*`
    );

    return {
        match,
        result: [
            ...result.hits.hits
                .map((employer: any) => ({
                    name: employer._source.navn,
                    orgnr: employer._source.organisasjonsnummer,
                    location: employer._source.adresse
                        ? {
                              address: employer._source.adresse.adresse,
                              postalCode: employer._source.adresse.postnummer,
                              city: employer._source.adresse.poststed,
                          }
                        : undefined,
                }))
                .sort(),
        ],
    };
}

type NyStillingDto = {
    title: string;
    createdBy: System;
    updatedBy: System;
    source: Kilde;
    privacy: Privacy;
    administration: Administration;
};

export const postStilling = async (stilling: NyStillingDto | Stilling): Promise<Stilling> => {
    const postUrl = `${stillingApi}/rekrutteringsbistand/api/v1/ads?classify=true`;

    return await fetchPost(postUrl, stilling);
};
