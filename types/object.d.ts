type Key = number | string | symbol

export type Object<K extends Key = Key, V = any> = {
    [k: K]: V
};
