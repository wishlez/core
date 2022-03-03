import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Icon} from './icon';
import {Menu} from './menu';
import {MenuItem} from './menu-item';
import {MenuText} from './menu-text';
import {_NavItem, NavItem} from './nav-item';
import {Props} from './nav-props';

const Nav = styled.nav`
    display: grid;
    grid-gap: var(--grid-gap);
    grid-auto-flow: column;
    justify-content: end;
    align-items: end;
`;

export const NavDesktop: FunctionComponent<Props> = (props) => (
    <Nav>
        {props.items.map((item1, index1) => 'items' in item1 ? (
            <Menu key={index1}>
                <MenuText as={_NavItem}>
                    {item1.label}
                    <Icon
                        size={'in-text'}
                        type={'expand_more'}
                    />
                </MenuText>
                {item1.items.map((item2, index2) => (
                    <MenuItem key={index2}>
                        <NavItem item={item2}/>
                    </MenuItem>
                ))}
            </Menu>
        ) : (
            <NavItem
                item={item1}
                key={index1}
            />
        ))}
    </Nav>
);
