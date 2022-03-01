import type {CategoryGroup, CategoryTag, CategoryTagGroup} from '@prisma/client';
import {AnyObject} from './object';

type TagGroup = WithTag<CategoryTagGroup>;

export type Tag = CategoryTag;

export type WithTag<P = AnyObject> = P & {
    tag: Tag
}

export type WithTags<P = AnyObject> = P & {
    tags: Tag[]
}

export type TagRequest = Omit<CategoryTag, 'id' | 'userId'> & {
    id?: number
};

export type Group = Omit<CategoryGroup, 'budget'> & {
    budget: number
    tags?: TagGroup[]
};

export type WithGroups<P = AnyObject> = P & {
    groups: Group[]
}

export type GroupRequest = Omit<CategoryGroup, 'id' | 'budget' | 'userId'> & {
    id?: number
    budget?: number
    tags: number[]
};

export type AdjustedTags = {
    added: number[]
    deleted: number[]
}
