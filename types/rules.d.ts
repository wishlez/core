import {Rule as PrismaRule} from '@prisma/client';
import {AnyObject} from './object';

export type Rule = PrismaRule

export type WithRules<P = AnyObject> = P & {
    rules: Rule[]
}

export type RuleRequest = Omit<Rule, 'id' | 'userId'> & {
    id?: number
}
