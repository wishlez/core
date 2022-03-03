import {ReactNode} from 'react';

export type NormalNav = {
    href: string
    label: string
}

type NestedNav = {
    label: string | ReactNode
    items: NormalNav[]
};

export type Props = {
    items: (NormalNav | NestedNav)[]
}
