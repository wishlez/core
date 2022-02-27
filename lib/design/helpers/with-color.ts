import {css} from 'styled-components';
import {WithColor} from '../../../types/variants';

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
                --with-color: var(--alert-error-500)
            `;
    }
};
