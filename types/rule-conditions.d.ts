import {Condition as PrismaCondition, ConditionOperator as PrismaConditionOperator} from '@prisma/client';
import {MutableRefObject} from 'react';
import {AnyObject} from './object';

type RequiredConditionFields = Omit<PrismaCondition, 'id' | 'ruleId'>;

export type ConditionRequestInput = RequiredConditionFields & {
    id?: number
    ruleId?: number
}

export type ConditionOperators =
    | 'e'
    | 'ne'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte'
    | 'reg'
    ;

export type ConditionOperator = Omit<PrismaConditionOperator, 'type'> & {
    type: ConditionOperators
};

export type WithConditionOperators<P = AnyObject> = P & {
    conditionOperators: ConditionOperator[]
};

export type Condition = RequiredConditionFields & {
    id?: number
}

export type WithConditions<P = AnyObject> = P & {
    conditions: Condition[]
}

export type ConditionRequest = {
    added: ConditionRequestInput[]
    updated: ConditionRequestInput[]
    deleted: number[]
}

export type RuleConditionRef = {
    id: number,
    field: MutableRefObject<HTMLSelectElement>
    operatorType: MutableRefObject<HTMLSelectElement>
    value: MutableRefObject<HTMLInputElement>
}
