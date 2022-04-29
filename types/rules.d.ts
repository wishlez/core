import {Rule as PrismaRule} from '@prisma/client';
import {AnyObject} from './object';
import {ActionRequest, WithActions} from './rule-actions';
import {ConditionRequest, WithConditions} from './rule-conditions';

export type Rule = WithActions<WithConditions<PrismaRule>>

export type WithRules<P = AnyObject> = P & {
    rules: Rule[]
}

export type RuleRequest = Omit<PrismaRule, 'id' | 'userId'> & {
    id?: number
    actions: ActionRequest
    conditions: ConditionRequest
}

export type RuleResponse = PrismaRule
