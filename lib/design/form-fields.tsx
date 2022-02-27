import styled from 'styled-components';
import {Box} from './box';

export const FormFields = styled(Box)`
    display: grid;
    align-content: start;
    grid-area: fields;
    grid-gap: var(--grid-gap);
`;
