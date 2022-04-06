import type {Action as PrismaAction, Condition as PrismaCondition} from '@prisma/client';
import {AnyObject} from './object';
import {ActionOperator, ConditionOperator} from './operators';

export type Action = Omit<PrismaAction> & {
    operator?: ActionOperator
};

export type Condition = Omit<PrismaCondition> & {
    operator?: ConditionOperator
};

export type WithActions<P = AnyObject> = P & {
    accounts: Action[]
}

export type WithConditions<P = AnyObject> = P & {
    accounts: Condition[]
}

export type ActionRequest = Omit<Action, 'id', 'ruleId'> & {
    id?: number
    ruleId?: number
}

export type ConditionRequest = Omit<Condition, 'id', 'ruleId'> & {
    id?: number
    ruleId?: number
}
