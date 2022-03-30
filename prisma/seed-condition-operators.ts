import {PrismaClient} from '@prisma/client';
import {ConditionOperators, OperatorData} from '../types/operators';

const data: OperatorData<ConditionOperators>[] = [
    {
        description: 'equal to',
        operator: '='
    },
    {
        description: 'not equal to',
        operator: '!='
    },
    {
        description: 'greater than',
        operator: '>'
    },
    {
        description: 'less than',
        operator: '<'
    },
    {
        description: 'greater than or equal to',
        operator: '>='
    },
    {
        description: 'less than or equal to',
        operator: '<='
    },
    {
        description: 'matches pattern',
        operator: 'reg'
    }
];

export const seedConditionOperators = (prisma: PrismaClient, enabled: boolean): Promise<any> => {
    if (!enabled) {
        return;
    }

    return prisma.conditionOperator.createMany({
        data
    });
};
