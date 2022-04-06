import {ActionOperator as PrismaActionOperator, ConditionOperator as PrismaConditionOperator} from '@prisma/client';
import {AnyObject} from './object';

export type ConditionOperators =
    | 'e'
    | 'ne'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte'
    | 'reg'
    ;

export type ActionOperators =
    | 'value'
    | 'value-of'
    ;

export type ConditionOperator = Omit<PrismaConditionOperator, 'type'> & {
    type: ConditionOperators
};

export type ActionOperator = Omit<PrismaActionOperator, 'type'> & {
    type: ActionOperators
};

export type WithConditionOperators<P = AnyObject> = P & {
    conditionOperators: ConditionOperator[]
};

export type WithActionOperators<P = AnyObject> = P & {
    actionOperators: ActionOperator[]
};
