import type {CategoryTag} from '@prisma/client';
import {AnyObject} from './object';

export type Tag = CategoryTag;

export type WithTags<P = AnyObject> = P & {
    tags: Tag[]
}
