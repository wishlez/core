import styled, {css} from 'styled-components';
import {WithColor} from '../../types/variants';

export const Note = styled.div<WithColor>`
    font-size: .85em;

    ${(props) => {
        switch (props.color) {
            case 'primary' :
                return css`
                    color: var(--core-100);
                `
            case 'secondary' :
                return css`
                    color: var(--core-300);
                `
            case 'danger':
                return css`
                    color: var(--alert-error-500)
                `;
        }
    }}
`;
