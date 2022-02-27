import styled from 'styled-components';
import {Box} from './box';

export const FormActions = styled(Box)`
    display: grid;
    justify-content: end;
    grid-auto-flow: column;
    grid-gap: var(--grid-gap);
`;
