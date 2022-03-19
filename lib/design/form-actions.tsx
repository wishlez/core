import styled from 'styled-components';

export const FormActions = styled.div`
    display: grid;
    grid-area: actions;
    grid-auto-flow: column;
    grid-gap: var(--grid-gap);
    grid-auto-columns: minmax(auto, 1fr);

    @media (min-width: 32rem) {
        justify-content: end;
        grid-auto-columns: auto;
    }
`;
