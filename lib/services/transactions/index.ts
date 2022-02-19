import {Prisma, Transaction as PrismaTransaction} from '@prisma/client';
import {Transaction} from '../../../types/transactions';
import {getPrismaClient} from '../../prisma';

const prisma = getPrismaClient();

const serialize = (transaction: PrismaTransaction): Transaction => ({
    ...transaction,
    amount: transaction.amount.toNumber(),
    date: transaction.date.toISOString()
})

export const getTransactions = async (user: Prisma.UserWhereInput): Promise<Transaction[]> => {
    const transactions = await prisma.transaction.findMany({
        where: {
            user
        },
        include: {
            fromAccount: {
                select: {
                    name: true
                }
            },
            toAccount: {
                select: {
                    name: true
                }
            }
        }
    });

    return transactions.map(serialize);
};

export const createTransaction = async (data: Prisma.TransactionUncheckedCreateInput) => serialize(await prisma.transaction.create({
    data
}));

export const deleteTransaction = async (id: number) => await prisma.transaction.delete({
    where: {
        id
    }
});

export const updateTransaction = async (data: Prisma.TransactionUncheckedUpdateInput) => serialize(await prisma.transaction.update({
    data,
    where: {
        id: data.id as number
    }
}));

export const getTransactionUserId = async (id: number): Promise<number> => (await prisma.transaction.findUnique({
    where: {
        id
    }
})).userId;
