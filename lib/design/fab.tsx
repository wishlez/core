import styled from 'styled-components';
import {Button} from './button';

export const Fab = styled(Button)`
    border-radius: 50%;
    box-shadow: var(--box-shadow-2);
    display: flex;
    font-size: 2.25em;
    font-variant: none;
    padding: 0;
    position: fixed;
    right: 1em;
    bottom: 1em;
    text-transform: none;
`;

Fab.defaultProps = {
    variant: 'filled'
};
