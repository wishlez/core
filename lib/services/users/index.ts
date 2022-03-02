import {Prisma} from '@prisma/client';
import {Credentials} from '../../../types/auth';
import {encryptPassword} from '../../helpers/password';
import {getPrismaClient} from '../../helpers/prisma';

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
        accounts: {
            createMany: {
                data: [
                    {
                        accountTypeId: (await prisma.accountType.findUnique({
                            where: {
                                type: 'Revenue'
                            }
                        })).id,
                        builtIn: true,
                        name: 'Cash Income'
                    },
                    {
                        accountTypeId: (await prisma.accountType.findUnique({
                            where: {
                                type: 'Expense'
                            }
                        })).id,
                        builtIn: true,
                        name: 'Cash Expense'
                    }
                ]
            }
        },
        password: encryptPassword(data.password)
    }
});
