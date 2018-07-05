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
        throw new ApiError(response.statusText, response.status);
    }
    return response.json();
}

export async function fetchGet(url) {
    return request(url, {
        method: 'GET'
    });
}

export async function fetchPost(url, body) {
    return request(url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

}

export async function fetchPut(url, body) {
    return request(url, {
        body: JSON.stringify(body),
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
