import styled from 'styled-components';

type Props = {
    type: 'add'
}

export const Icon = styled.i<Props>`
    font-family: 'Material Icons', serif;
    font-size: 1.5em;
    font-style: normal;
    font-variant: none;
    text-transform: none;
    height: 1em;
    width: 1em;

    &:after {
        content: "${(props) => props.type}";
    }
`;
