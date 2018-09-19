import { redirectToLogin } from '../login';
import { SEARCH_API } from '../fasitProperties';

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

    if (response.status !== 200) {
        if (response.status === 401) {
            redirectToLogin();
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
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}

export async function fetchPost(url, body) {
    return request(url, {
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

}

export async function fetchPut(url, body) {
    return request(url, {
        body: JSON.stringify(body),
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}

const employerNameCompletionQueryTemplate = (match) => ({
   query: {
       match_phrase: {
           navn_ngram_completion: {
               query: match,
               slop: 5
           }
       }
   },
    size: 50
});

export async function fetchEmployerNameCompletionHits(match) {
  const result = await fetchPost(`${SEARCH_API}underenhet/_search`, employerNameCompletionQueryTemplate(match));

  return {
    match,
    result: [
      ...result.hits.hits.map((employer) => ({
        name: employer._source.navn,
        orgnr: employer._source.organisasjonsnummer,
        location: (employer._source.adresse ? {
            address: employer._source.adresse.adresse,
            postalCode: employer._source.adresse.postnummer,
            city: employer._source.adresse.poststed
        } : undefined)
      }))
    ]
  };
}


export async function fetchOrgnrSuggestions(match) {
    match = match.replace(/\s/g, '');
    const result = await fetchGet(`${SEARCH_API}underenhet/_search?q=organisasjonsnummer:${match}*`);

    return {
        match,
        result: [
            ...result.hits.hits.map((employer) => ({
                name: employer._source.navn,
                orgnr: employer._source.organisasjonsnummer,
                location: (employer._source.adresse ? {
                    address: employer._source.adresse.adresse,
                    postalCode: employer._source.adresse.postnummer,
                    city: employer._source.adresse.poststed
                } : undefined)
            })).sort()
        ]
    };
}

