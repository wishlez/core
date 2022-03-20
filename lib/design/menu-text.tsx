import {FunctionComponent} from 'react';
import styled, {StyledComponentProps} from 'styled-components';

const _MenuText = styled.a`
    cursor: pointer;
`;

export const MenuText: FunctionComponent<StyledComponentProps<'a', any, any, any>> = (props) =>
    <_MenuText {...props}/>;
