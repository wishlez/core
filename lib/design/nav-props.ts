import {ReactComponentLike} from 'prop-types';
import {ReactNode} from 'react';
import {IconType} from './icon';

export type NormalNav = {
    component?: ReactComponentLike
    href: string
    icon: IconType
    label: string
}

type NestedNav = {
    label: string | ReactNode
    items: NormalNav[]
};

export type NavItems = (NormalNav | NestedNav)[];

export type NavProps = {
    navItemComponent?: ReactComponentLike
    items: NavItems
};
