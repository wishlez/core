import {getPrismaClient} from '../lib/helpers/prisma';
import {seedAccountTypes} from './seed-account-types';
import {seedActionOperators} from './seed-action-operators';
import {seedConditionOperators} from './seed-condition-operators';

const prisma = getPrismaClient();

const seed = async () => {
    await seedAccountTypes(prisma, true);
    await seedConditionOperators(prisma, true);
    await seedActionOperators(prisma, true);
};

seed()
    .finally(() => {
        prisma.$disconnect();
    });
