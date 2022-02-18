import type {Account as PrismaAccount} from '@prisma/client';

export type Account = Omit<Omit<PrismaAccount, 'openingBalance'>, 'maximumAmountOwed'> & {
    openingBalance: number
    maximumAmountOwed: number
};

export type WithAccounts = {
    accounts: Account[]
}
