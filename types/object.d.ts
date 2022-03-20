type Key = number | string | symbol

export type AnyObject<K extends Key = Key, V = any> = {
    [k in K]: V
};
