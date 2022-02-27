import styled from 'styled-components';
import {Box} from './box';

export const FormActions = styled(Box)`
    display: grid;
    grid-area: actions;
    grid-auto-flow: column;
    grid-gap: var(--grid-gap);
    grid-auto-columns: minmax(auto, 1fr);

    @media (min-width: 480px) {
        justify-content: end;
        grid-auto-columns: auto;
    }
`;
