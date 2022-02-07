import {AnyObject} from '../types/object';

export interface ResponseErrorType extends Error {
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

export const doGet = (url: string) => fetcher(url, {
    headers: {
        Accept: 'application/json'
    }
});

export const doPost = (url: string, payload: AnyObject) => fetcher(url, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(payload)
});

export const doDelete = (url: string, query: AnyObject) => fetcher(`${url}${toParams(query)}`, {
    method: 'DELETE'
});
