import styled, {css} from 'styled-components';
import {WithColorVariant} from '../../types/variants';
import {withColor} from './helpers/with-color';

export const Button = styled.button<WithColorVariant>`
    border: none;
    background-color: unset;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-variant: small-caps;
    padding: var(--control-padding);
    text-transform: capitalize;
    transition: var(--transition);

    ${withColor}

    ${(props) => {
        switch (props.color) {
            case 'primary':
                return css`
                    --text-color: var(--core-900);
                    --active-primary-color: var(--core-400);
                `;
            case 'secondary':
                return css`
                    --text-color: var(--core-800);
                    --active-primary-color: var(--core-200);
                `;
            case 'danger':
                return css`
                    --text-color: var(--core-900);
                    --active-primary-color: var(--alert-error-400);
                `;
        }
    }}

    ${(props) => {
        switch (props.variant) {
            case 'filled':
                return css`
                    background-color: var(--with-color);
                    border: 1px solid var(--with-color);
                    color: var(--text-color);

                    &:hover {
                        background-color: var(--active-primary-color);
                    }
                `;
            case 'text':
                return css`
                    background-color: transparent;
                    border: 1px solid transparent;
                    color: var(--with-color);

                    &:hover {
                        color: var(--active-primary-color);
                    }
                `;
            case 'outlined':
                return css`
                    background-color: transparent;
                    border: 1px solid var(--with-color);
                    color: var(--with-color);

                    &:hover {
                        border-color: var(--active-primary-color);
                        color: var(--active-primary-color);
                    }
                `;
        }
    }}
`;

Button.defaultProps = {
    color: 'primary',
    variant: 'filled'
};
