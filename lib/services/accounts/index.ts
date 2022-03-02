import {Prisma, Account as PrismaAccount} from '@prisma/client';
import {Account} from '../../../types/accounts';
import {getPrismaClient} from '../../helpers/prisma';

const prisma = getPrismaClient();

const serialize = (account: PrismaAccount): Account => ({
    ...account,
    openingBalance: account.openingBalance.toNumber(),
    maximumAmountOwed: account.maximumAmountOwed.toNumber()
})

export const getAccounts = async (user: Prisma.UserWhereInput): Promise<Account[]> => {
    const accounts = await prisma.account.findMany({
        where: {
            user
        },
        include: {
            accountType: true
        }
    });

    return accounts.map(serialize);
};

export const createAccount = async (data: Prisma.AccountUncheckedCreateInput) => serialize(await prisma.account.create({
    data
}));

export const deleteAccount = async (id: number) => await prisma.account.delete({
    where: {
        id
    }
});

export const updateAccount = async (data: Prisma.AccountUncheckedUpdateInput) => serialize(await prisma.account.update({
    data,
    where: {
        id: data.id as number
    }
}));

export const getAccountUserId = async (id: number): Promise<number> => (await prisma.account.findUnique({
    where: {
        id
    }
})).userId;
