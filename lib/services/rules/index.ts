import {Prisma} from '@prisma/client';
import {ActionRequest, ActionRequestInput, ConditionRequest, ConditionRequestInput} from '../../../types/rule-steps';
import {Rule, RuleResponse} from '../../../types/rules';
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
        operatorId: true,
        value: true
    }
};

const cleanUpStepsInput = <T extends ActionRequestInput | ConditionRequestInput>(steps: T[]): T[] => steps.map((step) => <T>({
    field: step.field,
    id: step.id,
    operatorId: step.operatorId,
    value: step.value
}));

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
    actions: Prisma.ActionCreateManyRuleInput[],
    conditions: Prisma.ConditionCreateManyRuleInput[]
) => await prisma.rule.create({
    data: {
        ...data,
        actions: {
            createMany: {
                data: cleanUpStepsInput(actions)
            }
        },
        conditions: {
            createMany: {
                data: cleanUpStepsInput(conditions)
            }
        }
    }
});

export const deleteRule = async (id: number) => await prisma.rule.delete({
    where: {
        id
    }
});

export const updateRule = async (data: Prisma.RuleUncheckedUpdateInput, actions: ActionRequest, conditions: ConditionRequest): Promise<RuleResponse> => (await prisma.$transaction([
    ...cleanUpStepsInput(actions.updated).map(action => prisma.action.update({
        data: action,
        where: {
            id: action.id as number
        }
    })),
    ...cleanUpStepsInput(conditions.updated).map(condition => prisma.condition.update({
        data: condition,
        where: {
            id: condition.id as number
        }
    })),
    prisma.rule.update({
        data: {
            ...data,
            actions: {
                createMany: {
                    data: cleanUpStepsInput(actions.added)
                },
                deleteMany: {
                    id: {
                        in: actions.deleted
                    }
                }
            },
            conditions: {
                createMany: {
                    data: cleanUpStepsInput(conditions.added)
                },
                deleteMany: {
                    id: {
                        in: conditions.deleted
                    }
                }
            }
        },
        where: {
            id: data.id as number
        }
    })
])).pop() as Rule;

export const getRuleUserId = async (id: number): Promise<number> => (await prisma.rule.findUnique({
    where: {
        id
    }
})).userId;
