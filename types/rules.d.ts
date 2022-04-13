import {Rule as PrismaRule} from '@prisma/client';
import {MutableRefObject} from 'react';
import {AnyObject} from './object';
import {ActionRequest, ConditionRequest, WithActions, WithConditions} from './rule-steps';

export type Rule = WithActions<WithConditions<PrismaRule>>

export type WithRules<P = AnyObject> = P & {
    rules: Rule[]
}

export type RuleRequest = Omit<Rule, 'id' | 'userId'> & {
    id?: number
    actions: ActionRequest[]
    conditions: ConditionRequest[]
}

export type RuleResponse = PrismaRule

export type RuleStepRef = {
    field: MutableRefObject<HTMLSelectElement>
    operator: MutableRefObject<HTMLSelectElement>
    value: MutableRefObject<HTMLInputElement>
}
