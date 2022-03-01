import {NextApiResponse} from 'next';

type StatusHandler = (res: NextApiResponse, err?: Error, responseMessage?: string) => void

const handleError = (res: NextApiResponse, responseMessage: string, err: Error, status: number = 500) => {
    if (err) {
        console.error(err.message);
    }

    return res.status(status).send({error: responseMessage});
};

export const methodNotAllowed: StatusHandler = (res, err, responseMessage = 'Method Not Allowed') => handleError(
    res,
    responseMessage,
    err,
    405
);

export const unauthorized: StatusHandler = (res, err, responseMessage = 'Unauthorized') => handleError(
    res,
    responseMessage,
    err,
    401
);

export const forbidden: StatusHandler = (res, err, responseMessage = 'Forbidden') => handleError(
    res,
    responseMessage,
    err,
    403
);

export const badRequest: StatusHandler = (res, err, responseMessage = 'Bad Request') => handleError(
    res,
    responseMessage,
    err,
    400
);

export const internalServerError: StatusHandler = (res, err, responseMessage = 'Internal Server Error') => handleError(
    res,
    responseMessage,
    err,
    500
);
