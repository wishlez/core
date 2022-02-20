import {AnyObject} from './object';

export type Variant = 'text' | 'outlined' | 'filled'
export type Color = 'primary' | 'secondary' | 'danger'

export type WithVariant<P = AnyObject> = P & {
    variant?: Variant
}

export type WithColor<P = AnyObject> = P & {
    color?: Color
}

export type WithColorVariant<P = AnyObject> = WithColor<P> & WithVariant<P>;
