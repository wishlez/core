import {PrismaClient} from '@prisma/client';
import {ConditionOperators} from '../types/rule-conditions';

const data: { type: ConditionOperators }[] = [
    {type: 'e'},
    {type: 'ne'},
    {type: 'gt'},
    {type: 'lt'},
    {type: 'gte'},
    {type: 'lte'},
    {type: 'reg'}
];

export const seedConditionOperators = (prisma: PrismaClient, enabled: boolean): Promise<any> => {
    if (!enabled) {
        return;
    }

    return prisma.conditionOperator.createMany({
        data
    });
};
