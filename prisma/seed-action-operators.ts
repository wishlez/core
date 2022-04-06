import {PrismaClient} from '@prisma/client';
import {ActionOperators} from '../types/operators';

const data: { type: ActionOperators }[] = [
    {type: 'value'},
    {type: 'value-of'}
];

export const seedActionOperators = (prisma: PrismaClient, enabled: boolean): Promise<any> => {
    if (!enabled) {
        return;
    }

    return prisma.actionOperator.createMany({
        data
    });
};
