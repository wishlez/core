import {FunctionComponent, useState} from 'react';
import styled from 'styled-components';
import {Backdrop} from './backdrop';
import {Card} from './card';
import {findFirstOfType, findType} from './helpers/find-children';
import {WithDirection} from './helpers/with-direction';
import {MenuItem} from './menu-item';
import {MenuText} from './menu-text';
import {Popup} from './popup';

type Props = WithDirection;

const _Menu = styled.span`
    display: inline-flex;
    position: relative;
`;

const MenuItems = styled(Card)`
    display: flex;
    flex-flow: column;
    padding: 0;
`;

export const Menu: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuText = findFirstOfType(props.children, MenuText);
    const menuItems = findType(props.children, MenuItem);

    return (
        <_Menu>
            <span onClick={() => setIsOpen(true)}>
                {menuText}
            </span>
            <Backdrop
                blur={false}
                isVisible={isOpen}
                onClick={() => setIsOpen(false)}
            />
            <Popup
                alignHorizontal={props.alignHorizontal}
                alignVertical={props.alignVertical}
                isOpen={isOpen}
            >
                <MenuItems>
                    {menuItems}
                </MenuItems>
            </Popup>
        </_Menu>
    );
};
