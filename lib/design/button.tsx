import styled, {css} from 'styled-components';
import {WithColorVariant} from '../../types/variants';

export const Button = styled.button<WithColorVariant>`
    border: none;
    background-color: unset;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-variant: small-caps;
    padding: var(--padding);
    text-transform: capitalize;
    transition: var(--transition);

    ${(props) => {
        switch (props.color) {
            case 'primary':
                return css`
                    --primary-color: var(--core-500);
                    --text-color: var(--core-900);
                    --active-primary-color: var(--core-400);
                `;
            case 'secondary':
                return css`
                    --primary-color: var(--core-300);
                    --text-color: var(--core-800);
                    --active-primary-color: var(--core-200);
                `;
            case 'danger':
                return css`
                    --primary-color: var(--alert-error-500);
                    --text-color: var(--core-900);
                    --active-primary-color: var(--alert-error-400);
                `;
        }
    }}

    ${(props) => {
        switch (props.variant) {
            case 'filled':
                return css`
                    background-color: var(--primary-color);
                    border: 1px solid var(--primary-color);
                    color: var(--text-color);

                    &:hover {
                        background-color: var(--active-primary-color);
                    }
                `;
            case 'text':
                return css`
                    background-color: transparent;
                    border: 1px solid transparent;
                    color: var(--primary-color);

                    &:hover {
                        color: var(--active-primary-color);
                    }
                `;
            case 'outlined':
                return css`
                    background-color: transparent;
                    border: 1px solid var(--primary-color);
                    color: var(--primary-color);

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
