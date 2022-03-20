import {TransformProperties} from 'framer-motion/types/motion/types';
import {AnyObject} from '../../../types/object';

export type Tween = Partial<AnyObject<keyof TransformProperties, {
    from: string | number
    to: string | number
}>>
