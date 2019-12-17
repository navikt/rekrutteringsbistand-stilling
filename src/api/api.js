import AdminStatusEnum from '../common/enums/AdminStatusEnum';
import toUrl from '../common/toUrl';
import { AD_API, SEARCH_API, REKRUTTERING_API } from '../fasitProperties';
import { loginWithRedirectToCurrentLocation } from '../login';

if (true) {
    // TODO: Toggle med env-variabel
    require('../mock/api');
}

export class ApiError {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

async function request(url, options) {
    let response;
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

export async function fetchGet(url) {
    return request(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    });
}

export async function fetchPost(url, body) {
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

export async function fetchPut(url, body) {
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

export async function fetchDelete(url) {
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
function fixMissingAdministration(ad) {
    return {
        ...ad,
        administration: {
            comments: '',
            status: AdminStatusEnum.RECEIVED,
            reportee: '',
        },
    };
}

export async function fetchAd(uuid) {
    const ad = await fetchGet(`${AD_API}stilling/${uuid}`);
    if (ad.administration === null) {
        return fixMissingAdministration(ad);
    }
    return ad;
}

export async function fetchRecruitment(uuid) {
    return await fetchGet(`${REKRUTTERING_API}/stilling/${uuid}`);
}

export async function fetchRecruitmentsForVeileder(navIdent) {
    return await fetchGet(`${REKRUTTERING_API}/ident/${navIdent}`);
}

async function fetchAdsCommon(query, baseurl) {
    const result = await fetchGet(`${baseurl}${toUrl(query)}`);

    return {
        ...result,
        content: result.content.map(ad => {
            if (ad.administration === null) {
                return fixMissingAdministration(ad);
            }
            return ad;
        }),
    };
}

export async function fetchAds(query) {
    return fetchAdsCommon(query, `${AD_API}ads`);
}

export async function fetchMyAds(query) {
    return fetchAdsCommon(query, `${AD_API}ads/rekrutteringsbistand/minestillinger`);
}

const employerNameCompletionQueryTemplate = match => ({
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

export async function fetchEmployerNameCompletionHits(match) {
    const result = await fetchPost(
        `${SEARCH_API}underenhet/_search`,
        employerNameCompletionQueryTemplate(match)
    );

    return {
        match,
        result: [
            ...result.hits.hits.map(employer => ({
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

export async function fetchOrgnrSuggestions(value) {
    const match = value.replace(/\s/g, '');
    const result = await fetchGet(
        `${SEARCH_API}underenhet/_search?q=organisasjonsnummer:${match}*`
    );

    return {
        match,
        result: [
            ...result.hits.hits
                .map(employer => ({
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

export async function checkTokenExpiration() {
    return fetchGet(`${AD_API}reportee/token-expiring`);
}
