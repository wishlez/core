import {FunctionComponent} from 'react';
import styled from 'styled-components';

type Props = {
    size: `h${1 | 2 | 3 | 4 | 5 | 6}`
}

const _Title = styled.h1`
    margin: 0;
    font-weight: normal;
`;

export const Title: FunctionComponent<Props> = (props) => (
    <_Title
        {...props}
        as={props.size}
    />
);
