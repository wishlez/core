import {AnyObject} from '../../../types/object';

export type Variant = 'text' | 'outlined' | 'filled'

export type WithVariant<P = AnyObject> = P & {
    variant?: Variant
}
