export class ApiError {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export async function fetchGet(url) {
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

export async function fetchPost(url, body) {
    let response;
    try {
        response = await fetch(url, {
            body: JSON.stringify(body),
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

export async function fetchPut(url, body) {
    let response;
    try {
        response = await fetch(url, {
            body: JSON.stringify(body),
            method: 'PUT',
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


export async function fetchEmployerSuggestions(prefix) {
    return Promise.resolve([`${prefix}`, `${prefix} AS`, `${prefix} Norge`]);
}
