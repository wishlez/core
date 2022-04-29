import {getPrismaClient} from '../lib/helpers/prisma';
import {seedAccountTypes} from './seed-account-types';
import {seedConditionOperators} from './seed-condition-operators';

const prisma = getPrismaClient();

const seed = async () => {
    await seedAccountTypes(prisma, true);
    await seedConditionOperators(prisma, true);
};

seed()
    .finally(() => {
        prisma.$disconnect();
    });
