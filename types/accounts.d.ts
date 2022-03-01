import type {Account as PrismaAccount} from '@prisma/client';
import {AnyObject} from './object';

export type Account = Omit<PrismaAccount, 'openingBalance' | 'maximumAmountOwed'> & {
    openingBalance: number
    maximumAmountOwed: number
};

export type WithAccounts<P = AnyObject> = P & {
    accounts: Account[]
}

export type AccountRequest = Omit<Account, 'id' | 'builtIn' | 'userId'> & {
    id?: number
}
