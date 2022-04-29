import {ConditionOperator} from '../../../types/rule-conditions';

export const getConditionOperators = async (): Promise<ConditionOperator[]> => await prisma.conditionOperator.findMany({}) as ConditionOperator[];
