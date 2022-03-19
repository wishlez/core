import {AnyObject} from '../../types/object';

type LoadedMethod = 'POST' | 'PUT' | 'PATCH';
type QueriedMethod = 'GET' | 'DELETE';

interface ResponseErrorType extends Error {
    info: any,
    status: number,
}

class ResponseError extends Error implements ResponseErrorType {
    info: any;
    status: number;

    constructor() {
        super('An error occurred while fetching the data');
    }

    async setInformation(response: Response) {
        this.info = await response.json();
        this.status = response.status;
    }
}

const toParams = (query: AnyObject<string>): string => {
    const params = new URLSearchParams(query).toString();

    return params ? `?${params}` : '';
};

const fetcher = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);

    if (!response.ok) {
        const error = new ResponseError();

        await error.setInformation(response);

        throw error;
    }

    return response.json();
};

const loadedFetch = (url: string, payload: AnyObject, method: LoadedMethod) => fetcher(url, {
    body: JSON.stringify(payload),
    headers: {
        'Content-type': 'application/json'
    },
    method
});

const queriedFetch = (url: string, query: AnyObject = {}, method: QueriedMethod) => fetcher(`${url}${toParams(query)}`, {
    headers: {
        Accept: 'application/json'
    },
    method
});

export const doPost = (url: string, payload: AnyObject) => loadedFetch(url, payload, 'POST');
export const doPut = (url: string, payload: AnyObject) => loadedFetch(url, payload, 'PUT');
export const doPatch = (url: string, payload: AnyObject) => loadedFetch(url, payload, 'PATCH');

export const doGet = (url: string, query: AnyObject) => queriedFetch(url, query, 'GET');
export const doDelete = (url: string, query: AnyObject) => queriedFetch(url, query, 'DELETE');
