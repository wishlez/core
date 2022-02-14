import type {CategoryGroup, CategoryTag} from '@prisma/client';
import {AnyObject} from './object';

export type Tag = CategoryTag;

export type WithTags<P = AnyObject> = P & {
    tags: Tag[]
}

export type Group = CategoryGroup

export type TagGroup = Group & {
    tags: { tag: Tag }[]
}

export type WithGroups<P = AnyObject> = P & {
    groups: Group[]
}

export type WithTagGroups<P = AnyObject> = P & {
    groups: TagGroup[]
}
