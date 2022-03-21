import styled from 'styled-components';
import {AnyObject} from '../../types/object';

export type IconType =
    | 'account'
    | 'add'
    | 'category'
    | 'close'
    | 'dashboard'
    | 'delete'
    | 'edit'
    | 'locked'
    | 'menu'
    | 'tag'
    | 'transaction'
    | 'transferred-to'
    | 'user'
    ;

const iconMap: Partial<AnyObject<IconType, string>> = {
    'account': 'account_balance',
    'locked': 'lock',
    'transaction': 'receipt_long',
    'transferred-to': 'east',
    'user': 'account_circle'
};

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

export const Icon = styled.i.attrs<Props>((props) => ({
    type: iconMap[props.type] || props.type
}))`
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
