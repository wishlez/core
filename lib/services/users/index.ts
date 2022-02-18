import {Prisma} from '@prisma/client';
import {Credentials} from '../../../types/auth';
import {encryptPassword} from '../../password';
import {getPrismaClient} from '../../prisma';

const prisma = getPrismaClient();

export const getUser = async (credentials: Credentials) => await prisma.user.findFirst({
    where: {
        login: credentials.login,
        password: encryptPassword(credentials.password)
    }
});

export const createUser = async (data: Prisma.UserUncheckedCreateInput) => await prisma.user.create({
    data: {
        ...data,
        password: encryptPassword(data.password),
        accounts: {
            createMany: {
                data: [
                    {
                        name: 'Cash Income',
                        builtIn: true,
                        accountTypeId: (await prisma.accountType.findUnique({
                            where: {
                                type: 'Revenue'
                            }
                        })).id
                    },
                    {
                        name: 'Cash Expense',
                        builtIn: true,
                        accountTypeId: (await prisma.accountType.findUnique({
                            where: {
                                type: 'Expense'
                            }
                        })).id
                    }
                ]
            }
        }
    }
});
