import {ActionOperator, ConditionOperator} from '../../../types/operators';

export const getActionOperators = async (): Promise<ActionOperator[]> => await prisma.actionOperator.findMany({}) as ActionOperator[];

export const getConditionOperators = async (): Promise<ConditionOperator[]> => await prisma.conditionOperator.findMany({}) as ConditionOperator[];
