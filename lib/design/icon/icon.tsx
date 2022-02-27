import styled from 'styled-components';

type Props = {
    type: 'add'
}

export const Icon = styled.i<Props>`
    font-family: 'Material Icons', serif;
    font-size: 1.5em;
    font-style: normal;
    height: 1em;
    width: 1em;

    &:after {
        content: "${(props) => props.type}";
    }
`;
