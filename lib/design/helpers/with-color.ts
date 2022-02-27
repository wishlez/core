import {css} from 'styled-components';
import {AnyObject} from '../../../types/object';

export type Color = 'primary' | 'secondary' | 'danger'

export type WithColor<P = AnyObject> = P & {
    color?: Color
}

export const withColor = (props: WithColor) => {
    switch (props.color) {
        case 'primary' :
            return css`
                --with-color: var(--core-500);
            `;
        case 'secondary' :
            return css`
                --with-color: var(--core-300);
            `;
        case 'danger':
            return css`
                --with-color: var(--alert-error-500);
            `;
    }
};
