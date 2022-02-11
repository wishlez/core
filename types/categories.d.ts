import type {CategoryTag, CategoryGroup} from '@prisma/client';
import {AnyObject} from './object';

export type Tag = CategoryTag;

export type WithTags<P = AnyObject> = P & {
    tags: Tag[]
}

export type Group = CategoryGroup;

export type WithGroups<P = AnyObject> = P & {
    groups: Group[]
}
