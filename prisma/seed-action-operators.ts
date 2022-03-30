import {PrismaClient} from '@prisma/client';
import {ActionOperators, OperatorData} from '../types/operators';

const data: OperatorData<ActionOperators>[] = [
    {
        description: 'to value of',
        operator: 'value-of'
    },
    {
        description: 'to value',
        operator: 'value'
    }
];

export const seedActionOperators = (prisma: PrismaClient, enabled: boolean): Promise<any> => {
    if (!enabled) {
        return;
    }

    return prisma.actionOperator.createMany({
        data
    });
};
