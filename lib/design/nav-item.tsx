import {ReactComponentLike} from 'prop-types';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Icon} from './icon';
import {NormalNav} from './nav-props';

export const _NavItem = styled.a`
    display: grid;
    grid-auto-flow: column;
    grid-gap: var(--grid-gap);
    justify-content: start;
    padding: var(--control-padding-y) 0;
    white-space: nowrap;
`;

export const NavItem: FunctionComponent<{ components: ReactComponentLike[], item: NormalNav }> = ({
    components,
    item
}) => (
    <_NavItem
        as={[].concat(components).find((component) => component)}
        href={item.href}
    >
        <Icon
            size={'in-text'}
            type={item.icon}
        />
        {item.label}
    </_NavItem>
);
