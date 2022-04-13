import {Prisma} from '@prisma/client';
import {Rule} from '../../../types/rules';
import {getPrismaClient} from '../../helpers/prisma';

const prisma = getPrismaClient();

const step: Prisma.ActionFindManyArgs | Prisma.ConditionFindManyArgs = {
    select: {
        field: true,
        id: true,
        operator: {
            select: {
                type: true
            }
        },
        value: true
    }
};

export const getRules = async (user: Prisma.UserWhereInput): Promise<Rule[]> => await prisma.rule.findMany({
    include: {
        actions: <Prisma.ActionFindManyArgs>step,
        conditions: <Prisma.ConditionFindManyArgs>step
    },
    where: {
        user
    }
});

export const createRule = async (
    data: Prisma.RuleUncheckedCreateInput,
    actions: Prisma.ActionUncheckedCreateInput[],
    conditions: Prisma.ConditionUncheckedCreateInput[]
) => await prisma.rule.create({
    data: {
        ...data,
        actions: {
            createMany: {
                data: actions
            }
        },
        conditions: {
            createMany: {
                data: conditions
            }
        }
    }
});

export const deleteRule = async (id: number) => await prisma.rule.delete({
    where: {
        id
    }
});

export const updateRule = async (data: Prisma.RuleUncheckedUpdateInput) => await prisma.rule.update({
    data,
    where: {
        id: data.id as number
    }
});

export const getRuleUserId = async (id: number): Promise<number> => (await prisma.rule.findUnique({
    where: {
        id
    }
})).userId;
