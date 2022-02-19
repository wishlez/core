import type {Transaction as PrismaTransaction} from '@prisma/client';
import {Account} from './accounts';

export type Transaction = Omit<Omit<PrismaTransaction, 'amount'>, 'date'> & {
    amount: number,
    date: string,
    fromAccount?: Account
    toAccount?: Account
};

export type WithTransactions = {
    transactions: Transaction[]
}
