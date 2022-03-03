import Link from 'next/link';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Box} from './box';
import { NormalNav } from './nav-props';

export const _NavItem = styled(Box.withComponent('a'))`
    display: block;
    padding: var(--control-padding-y) 0;
    white-space: nowrap;

    @media (min-width: 800px) {
        padding: var(--control-padding-cozy);
    }
`;

export const NavItem: FunctionComponent<{ item: NormalNav }> = ({item}) => (
    <Link
        href={item.href}
        passHref
    >
        <_NavItem>
            {item.label}
        </_NavItem>
    </Link>
);
