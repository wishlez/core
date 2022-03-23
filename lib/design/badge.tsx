import styled from 'styled-components';
import {withColor, WithColor} from './helpers/with-color';
import {withSize, WithSize} from './helpers/with-size';
import {withVariant, WithVariant} from './helpers/with-variant';

type Props = WithColor & WithSize & WithVariant

export const Badge = styled.span<Props>`
    display: inline-block;
    border-radius: var(--border-radius);
    background-color: var(--with-color);
    color: var(--with-text-color);
    font-size: 1rem;
    user-select: none;
    transition: var(--transition);

    ${withColor}
    ${withVariant}
    ${withSize}
`;

Badge.defaultProps = {
    color: 'tertiary',
    size: 'cozy',
    variant: 'filled'
};
