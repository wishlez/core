import {AccountType as PrismaAccountType} from '@prisma/client';
import {AnyObject} from './object';

export type AccountTypes = 'Asset' | 'Expense' | 'Revenue' | 'Equity' | 'Liabilities'

export type AccountType = Omit<PrismaAccountType, 'type'> & {
    type: AccountTypes
}

export type WithAccountTypes<P = AnyObject> = P & {
    accountTypes: AccountType[]
}
