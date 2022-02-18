import {AccountType as PrismaAccountType} from '@prisma/client';

export type AccountTypes = 'Asset' | 'Expense' | 'Revenue' | 'Equity' | 'Liabilities'

export type AccountType = Omit<PrismaAccountType, 'type'> & {
    type: AccountTypes
}

export type WithAccountTypes = {
    accountTypes: AccountType[]
}
