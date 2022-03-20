import {FunctionComponent} from 'react';
import styled, {StyledComponentProps} from 'styled-components';

const _MenuItem = styled.div`
    color: var(--core-300);
    cursor: pointer;
    display: inline-block;
    padding: var(--control-padding);
    white-space: nowrap;

    &:hover {
        color: var(--core-500);
    }
`;

export const MenuItem: FunctionComponent<StyledComponentProps<'div', any, any, any>> = (props) =>
    <_MenuItem {...props}/>;
