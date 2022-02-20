import type {Transaction as PrismaTransaction, TransactionTag as PrismaTransactionTag} from '@prisma/client';
import {Account} from './accounts';
import {WithTag} from './categories';

export type TransactionTag = WithTag<PrismaTransactionTag>;

export type Transaction = Omit<Omit<PrismaTransaction, 'amount'>, 'date'> & {
    amount: number,
    date: string,
    fromAccount?: Account
    toAccount?: Account
    tags?: TransactionTag[]
};

export type WithTransactions = {
    transactions: Transaction[]
}
