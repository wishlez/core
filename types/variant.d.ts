import {WithColor} from '../lib/design/helpers/with-color';
import {AnyObject} from './object';

export type Variant = 'text' | 'outlined' | 'filled'

export type WithVariant<P = AnyObject> = P & {
    variant?: Variant
}

export type WithColorVariant<P = AnyObject> = WithColor<P> & WithVariant<P>;
