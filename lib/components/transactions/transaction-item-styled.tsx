import styled from 'styled-components';

export const Container = styled('div')`
    @media (min-width: 60rem) {
        display: flex;
        justify-content: space-between;
    }
`;

export const TitleContainer = styled.div`
    align-items: baseline;
    display: grid;
    grid-auto-flow: column;
    grid-gap: var(--grid-gap-small);
    margin-bottom: var(--grid-gap-small);
`;

export const OnDate = styled.div`
    font-size: .85em;
`;

export const CashFlow = styled.span`
    align-items: center;
    display: inline-grid;
    grid-auto-flow: column;
    grid-gap: calc(var(--grid-gap) / 2);
`;

