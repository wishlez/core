import {createHash} from 'crypto';

export const nHash = (data: string, algorithms: string[], n: number = 0): string => {
    if (!algorithms[n]) {
        return data;
    }

    return nHash(createHash(algorithms[n]).update(data).digest().toString('hex'), algorithms, n + 1);
};

export const encryptPassword = (password: string) => nHash(password, ['sha256', 'md5']);
