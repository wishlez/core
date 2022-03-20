export type Transient<T> = {
    [k in keyof T as `$${keyof T}`]: T[k]
}
