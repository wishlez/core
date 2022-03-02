import styled from 'styled-components';
import {WithColor, withColor} from './helpers/with-color';
import {withSize, WithSize} from './helpers/with-size';
import {withVariant, WithVariant} from './helpers/with-variant';

type Props = WithColor & WithSize & WithVariant

export const Button = styled.button<Props>`
    border: none;
    background-color: unset;
    border-radius: var(--border-radius);
    cursor: pointer;
    display: inline-flex;
    font-variant: small-caps;
    justify-content: center;
    align-items: center;
    line-height: 1.5em;
    text-transform: capitalize;
    transition: var(--transition);
    vertical-align: middle;

    ${withColor}
    ${withSize}
    ${withVariant}
`;

Button.defaultProps = {
    color: 'primary',
    variant: 'filled',
    size: 'comfortable'
};
