import Link from 'next/link';
import {FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components';
import {Box} from './box';
import {Icon} from './icon';
import {Menu} from './menu';
import {MenuItem} from './menu-item';
import {MenuText} from './menu-text';

type NormalNav = {
    href: string
    label: string
}

type NestedNav = {
    label: string | ReactNode
    items: NormalNav[]
};

type Props = {
    items: (NormalNav | NestedNav)[]
}

const _NavItem = styled(Box.withComponent('a'))`
    display: block;
    padding: var(--control-padding-cozy);
    white-space: nowrap;
`;

const _Nav = styled.nav`
    display: grid;
    grid-gap: var(--grid-gap);
    grid-auto-flow: column;
    justify-content: end;
    align-items: end;
`;

const NavItem: FunctionComponent<{ item: NormalNav }> = ({item}) => (
    <Link
        href={item.href}
        passHref
    >
        <_NavItem>
            {item.label}
        </_NavItem>
    </Link>
);

export const Nav: FunctionComponent<Props> = (props) => (
    <_Nav>
        {props.items.map((item, index) => 'items' in item ? (
            <Menu key={index}>
                <MenuText as={_NavItem}>
                    {item.label}
                    {Boolean(item.items.length) && (
                        <Icon
                            size={'in-text'}
                            type={'expand_more'}
                        />
                    )}
                </MenuText>
                {item.items.map((item, index) => (
                    <MenuItem key={index}>
                        <NavItem item={item}/>
                    </MenuItem>
                ))}
            </Menu>
        ) : (
            <NavItem
                item={item}
                key={index}
            />
        ))}
    </_Nav>
);
