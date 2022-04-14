import type {Action as PrismaAction, Condition as PrismaCondition} from '@prisma/client';
import {AnyObject} from './object';
import {ActionOperator, ConditionOperator} from './operators';

type RequiredActionFields = Omit<PrismaAction, 'id' | 'ruleId'>;
type RequiredConditionFields = Omit<PrismaCondition, 'id' | 'ruleId'>;

export type ActionRequestInput = RequiredActionFields & {
    id?: number
    ruleId?: number
}

export type ConditionRequestInput = RequiredConditionFields & {
    id?: number
    ruleId?: number
}

export type Action = RequiredActionFields & {
    id?: number
    operator?: ActionOperator
}

export type Condition = RequiredConditionFields & {
    id?: number
    operator?: ConditionOperator
}

export type WithActions<P = AnyObject> = P & {
    actions: Action[]
}

export type WithConditions<P = AnyObject> = P & {
    conditions: Condition[]
}

export type ActionRequest = {
    added: ActionRequestInput[]
    updated: ActionRequestInput[]
    deleted: number[]
}

export type ConditionRequest = {
    added: ConditionRequestInput[]
    updated: ConditionRequestInput[]
    deleted: number[]
}
