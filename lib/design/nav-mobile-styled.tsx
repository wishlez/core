import styled from 'styled-components';
import {Backdrop} from './backdrop';
import {FullScreen} from './fullScreen';
import {getRandomId} from './helpers/randomizer';

const drawerToggleId = getRandomId('toggle');

export const NavSection = styled.div`
    color: var(--mono-500);
    border-bottom: 1px solid var(--mono-700);
    margin: var(--control-padding-y) 0;
    padding: var(--control-padding-cozy-y) 0;
`;

export const Nav = styled.nav`
    background-color: var(--mono-999);
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    padding: var(--uniform-padding);
    min-width: 300px;
`;

export const DrawerContainer = styled(FullScreen)`
    display: none;
`;

export const DrawerToggle = styled.input.attrs({
    id: drawerToggleId,
    type: 'checkbox'
})`
    display: none;

    &:checked ~ ${DrawerContainer} {
        display: block;
    }
`;

export const DrawerControl = styled.label.attrs({
    htmlFor: drawerToggleId
})`
    display: block;
    padding: var(--control-padding-cozy);
    text-align: right;
`;

export const DrawerBackdrop = styled(Backdrop).attrs({
    as: 'label',
    htmlFor: drawerToggleId
})``;
