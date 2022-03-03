import styled from 'styled-components';

type Props = {
    type: 'add' | 'create' | 'delete' | 'east' | 'lock' | 'expand_more' | 'account_circle' | 'menu' | 'close'
    size?: 'normal' | 'in-text'
}

export const Icon = styled.i<Props>`
    font-family: 'Material Icons', serif;
    font-size: ${(props) => props.size === 'in-text' ? '1' : '1.5'}em;
    font-style: normal;
    font-variant: none;
    text-transform: none;
    height: 1em;
    width: 1em;
    vertical-align: -.125em;

    &:after {
        content: "${(props) => props.type}";
    }
`;

Icon.defaultProps = {
    size: 'normal'
};
