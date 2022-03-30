import {PrismaClient} from '@prisma/client';
import {AccountTypes} from '../types/account-types';

const data: { type: AccountTypes }[] = [
    {type: 'Asset'},
    {type: 'Expense'},
    {type: 'Revenue'},
    {type: 'Equity'},
    {type: 'Liabilities'}
];

export const seedAccountTypes = (prisma: PrismaClient, enabled: boolean): Promise<any> => {
    if (!enabled) {
        return;
    }

    return prisma.accountType.createMany({
        data
    });
};
