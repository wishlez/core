import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {findFirstOfType, findType} from './helpers/find-children';
import {MenuItem} from './menu-item';
import {MenuText} from './menu-text';

const Dropdown = styled.div`
    background-color: var(--mono-999);
    box-shadow: var(--box-shadow-2);
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
`;

const _Menu = styled.div`
    position: relative;

    &:hover ${Dropdown} {
        display: block;
    }
`;

export const Menu: FunctionComponent = (props) => {
    const menuText = findFirstOfType(props.children, MenuText);
    const menuItems = findType(props.children, MenuItem);

    return (
        <_Menu>
            {menuText}
            <Dropdown>
                {menuItems}
            </Dropdown>
        </_Menu>
    );
};
