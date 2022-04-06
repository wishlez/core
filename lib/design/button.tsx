import styled from 'styled-components';
import {WithColor, withColor} from './helpers/with-color';
import {withSize, WithSize} from './helpers/with-size';
import {withVariant, WithVariant, withVariantHover} from './helpers/with-variant';

type Props = WithColor & WithSize & WithVariant

export const Button = styled.button<Props>`
    border: none;
    background-color: unset;
    border-radius: var(--border-radius);
    cursor: pointer;
    display: inline-grid;
    grid-auto-flow: column;
    grid-gap: calc(var(--grid-gap) / 2);
    font-variant: small-caps;
    justify-content: center;
    align-items: center;
    line-height: 1.5em;
    text-transform: capitalize;
    transition: var(--transition);
    vertical-align: middle;
    white-space: nowrap;

    ${withColor}
    ${withSize}
    ${withVariant}
    ${withVariantHover}
`;

Button.defaultProps = {
    color: 'primary',
    size: 'comfortable',
    type: 'button',
    variant: 'filled'
};
