import styled from 'styled-components';
import {WithColor, withColor} from './helpers/with-color';

export const Note = styled.div<WithColor>`
    font-size: .85em;
    color: var(--with-color);

    ${withColor}
`;

Note.defaultProps = {
    color: 'secondary'
};
