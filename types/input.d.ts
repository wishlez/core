import {AnyObject} from './object';

export type Option = {
    label: string
    value: string
}

export type WithInputProps<P = AnyObject> = P & {
    label?: string
    note?: string
    error?: string
}

export type WithInputError<P = AnyObject> = P & {
    hasError: boolean
}
