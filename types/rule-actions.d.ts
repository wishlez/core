import {ActionTag as PrismaActionTag} from '@prisma/client';
import type {Action as PrismaAction} from '@prisma/client';
import {MutableRefObject} from 'react';
import {WithTag} from './categories';
import {AnyObject} from './object';

type ActionTag = WithTag<PrismaActionTag>;

type RequiredActionFields = Omit<PrismaAction, 'id' | 'ruleId'>;

export type ActionRequestInput = RequiredActionFields & {
    id?: number
    ruleId?: number
}

export type Action = RequiredActionFields & {
    id?: number
    tags?: ActionTag[]
}

export type WithActions<P = AnyObject> = P & {
    actions: Action[]
}

export type ActionRequest = {
    added: ActionRequestInput[]
    updated: ActionRequestInput[]
    deleted: number[]
}

export type RuleActionRef = {
    id: number,
    fieldType: MutableRefObject<HTMLSelectElement>
    value: MutableRefObject<HTMLInputElement>
}
