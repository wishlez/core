import styled, {css} from 'styled-components';
import {WithColorVariant} from '../../types/variant';
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
        switch (props.variant) {
            case 'filled':
                return css`
                    background-color: var(--with-color);
                    border: 1px solid var(--with-color);
                    color: var(--with-text-color);

                    &:hover {
                        background-color: var(--with-active-color);
                    }
                `;
            case 'text':
                return css`
                    background-color: transparent;
                    border: 1px solid transparent;
                    color: var(--with-color);

                    &:hover {
                        color: var(--with-active-color);
                    }
                `;
            case 'outlined':
                return css`
                    background-color: transparent;
                    border: 1px solid var(--with-color);
                    color: var(--with-color);

                    &:hover {
                        border-color: var(--with-active-color);
                        color: var(--with-active-color);
                    }
                `;
        }
    }}
`;

Button.defaultProps = {
    color: 'primary',
    variant: 'filled'
};
