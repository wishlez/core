import type {Transaction as PrismaTransaction, TransactionTag as PrismaTransactionTag} from '@prisma/client';
import {Account} from './accounts';
import {WithTag} from './categories';
import {AnyObject} from './object';

export type TransactionTag = WithTag<PrismaTransactionTag>;

export type Transaction = Omit<PrismaTransaction, 'amount' | 'date'> & {
    amount: number,
    date: string,
    fromAccount?: Account
    toAccount?: Account
    tags?: TransactionTag[]
};

export type WithTransactions<P = AnyObject> = P & {
    transactions: Transaction[]
}

export type TransactionRequest = Omit<PrismaTransaction, 'amount' | 'date' | 'id' | 'userId'> & {
    id?: number,
    amount: number,
    date: Date,
    tags: number[]
}
