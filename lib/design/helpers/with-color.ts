import {css} from 'styled-components';
import {AnyObject} from '../../../types/object';

export type Color = 'primary' | 'secondary' | 'tertiary' | 'danger'

export type WithColor<P = AnyObject> = P & {
    color?: Color
}

export const withColor = (props: WithColor) => {
    switch (props.color) {
    case 'primary' :
        return css`
                --with-color: var(--core-500);
                --with-active-color: var(--core-400);
                --with-text-color: var(--core-900);
            `;
    case 'secondary' :
        return css`
                --with-color: var(--core-300);
                --with-active-color: var(--core-200);
                --with-text-color: var(--core-800);
            `;
    case 'tertiary':
        return css`
                --with-color: var(--mono-500);
                --with-active-color: var(--mono-400);
                --with-text-color: var(--core-900);
            `;
    case 'danger':
        return css`
                --with-color: var(--alert-error-500);
                --with-active-color: var(--alert-error-400);
                --with-text-color: var(--core-900);
            `;
    }
};
