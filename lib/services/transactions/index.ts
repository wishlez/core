import {Prisma, Transaction as PrismaTransaction} from '@prisma/client';
import {Transaction} from '../../../types/transactions';
import {getPrismaClient} from '../../helpers/prisma';
import {toTags} from '../../helpers/tags';

const prisma = getPrismaClient();

const serialize = (transaction: PrismaTransaction): Transaction => ({
    ...transaction,
    amount: transaction.amount.toNumber(),
    date: transaction.date.toISOString()
});

export const getTransactions = async (user: Prisma.UserWhereInput): Promise<Transaction[]> => {
    const transactions = await prisma.transaction.findMany({
        include: {
            fromAccount: {
                select: {
                    name: true
                }
            },
            tags: {
                include: {
                    tag: true
                }
            },
            toAccount: {
                select: {
                    name: true
                }
            }
        },
        where: {
            user
        }
    });

    return transactions.map(serialize);
};

export const createTransaction = async (data: Prisma.TransactionUncheckedCreateInput, tags: number[]) => serialize(await prisma.transaction.create({
    data: {
        ...data,
        tags: {
            createMany: {
                data: toTags(tags)
            }
        }
    }
}));

export const deleteTransaction = async (id: number) => await prisma.transaction.delete({
    where: {
        id
    }
});

export const updateTransaction = async (data: Prisma.TransactionUncheckedUpdateInput, addedTags: number[], deletedTags: number[]) => serialize(await prisma.transaction.update({
    data: {
        ...data,
        tags: {
            createMany: {
                data: toTags(addedTags)
            },
            deleteMany: {
                tagId: {
                    in: deletedTags
                }
            }
        }
    },
    where: {
        id: data.id as number
    }
}));

export const getTransactionUserId = async (id: number): Promise<number> => (await prisma.transaction.findUnique({
    where: {
        id
    }
})).userId;
