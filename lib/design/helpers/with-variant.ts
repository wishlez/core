import {css} from 'styled-components';
import {AnyObject} from '../../../types/object';

type Variant = 'text' | 'outlined' | 'filled'

export type WithVariant<P = AnyObject> = P & {
    variant?: Variant
}

export const withVariant = (props: WithVariant) => {
    switch (props.variant) {
        case 'filled':
            return css`
                background-color: var(--with-color);
                border: 1px solid var(--with-color);
                color: var(--with-text-color);
            `;
        case 'text':
            return css`
                background-color: transparent;
                border: 1px solid transparent;
                color: var(--with-color);
            `;
        case 'outlined':
            return css`
                background-color: var(--core-900);
                border: 1px solid var(--with-color);
                color: var(--with-color);
            `;
    }
};

export const withVariantHover = (props: WithVariant) => {
    switch (props.variant) {
        case 'filled':
            return css`
                &:hover {
                    background-color: var(--with-active-color);
                }
            `;
        case 'text':
            return css`
                &:hover {
                    color: var(--with-active-color);
                }
            `;
        case 'outlined':
            return css`
                &:hover {
                    border-color: var(--with-active-color);
                    color: var(--with-active-color);
                }
            `;
    }
};
