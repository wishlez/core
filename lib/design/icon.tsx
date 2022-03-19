import styled from 'styled-components';

export type IconType =
    'add'
    | 'create'
    | 'delete'
    | 'east'
    | 'lock'
    | 'expand_more'
    | 'account_circle'
    | 'menu'
    | 'close'
    | 'dashboard'
    | 'tag'
    | 'category'
    | 'receipt_long'
    | 'account_balance'
    | 'clear'
    ;

type Props = {
    type: IconType
    size?: 'normal' | 'in-text' | 'root'
}

const withFontSize = (props: Props) => {
    switch (props.size) {
        case 'normal':
            return '1.5em';
        case 'in-text':
            return '1em';
        case 'root':
            return '1.5rem';
    }
};

export const Icon = styled.i<Props>`
    font-family: 'Material Icons', serif;
    font-size: ${withFontSize};
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
