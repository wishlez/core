import {Prisma} from '@prisma/client';
import {Credentials} from '../../../types/auth';
import {encryptPassword} from '../../password';

export const getUser = async (credentials: Credentials) => await prisma.user.findFirst({
    where: {
        login: credentials.login,
        password: encryptPassword(credentials.password)
    }
});

export const createUser = async (data: Prisma.UserUncheckedCreateInput) => await prisma.user.create({
    data: {
        ...data,
        password: encryptPassword(data.password)
    }
});
