import {getPrismaClient} from '../lib/prisma';
import {AccountTypes} from '../types/account-types';

const prisma = getPrismaClient();

const data: { type: AccountTypes }[] = [
    {type: 'Asset'},
    {type: 'Expense'},
    {type: 'Revenue'},
    {type: 'Equity'},
    {type: 'Liabilities'}
];

const seed = async () => {
    await prisma.accountType.createMany({
        data
    });
};

seed()
    .finally(() => {
        prisma.$disconnect();
    });
