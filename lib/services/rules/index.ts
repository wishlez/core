import {Prisma} from '@prisma/client';
import {ConditionRequest, ConditionRequestInput} from '../../../types/rule-conditions';
import {ActionRequest, ActionRequestInput} from '../../../types/rule-actions';
import {Rule, RuleResponse} from '../../../types/rules';
import {getPrismaClient} from '../../helpers/prisma';

const prisma = getPrismaClient();

const cleanUpActionsInput = (actions: ActionRequestInput[]): ActionRequestInput[] => actions.map((action) => ({
    fieldType: action.fieldType,
    id: action.id,
    value: action.value
}));

const cleanUpConditionsInput = (conditions: ConditionRequestInput[]): ConditionRequestInput[] => conditions.map((condition) => ({
    field: condition.field,
    id: condition.id,
    operatorType: condition.operatorType,
    value: condition.value
}));

export const getRules = async (user: Prisma.UserWhereInput): Promise<Rule[]> => await prisma.rule.findMany({
    include: {
        actions: true,
        conditions: true
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
                data: cleanUpActionsInput(actions)
            }
        },
        conditions: {
            createMany: {
                data: cleanUpConditionsInput(conditions)
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
    ...cleanUpActionsInput(actions.updated).map(action => prisma.action.update({
        data: action,
        where: {
            id: action.id as number
        }
    })),
    ...cleanUpConditionsInput(conditions.updated).map(condition => prisma.condition.update({
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
                    data: cleanUpActionsInput(actions.added)
                },
                deleteMany: {
                    id: {
                        in: actions.deleted
                    }
                }
            },
            conditions: {
                createMany: {
                    data: cleanUpConditionsInput(conditions.added)
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
