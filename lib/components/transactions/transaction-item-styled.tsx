import styled from 'styled-components';

export const FromAccount = styled.span`
    text-align: end;
`;

export const ToAccount = styled.span`
    text-align: start;
`;

export const CashFlow = styled.span`
    align-items: center;
    display: inline-grid;
    grid-gap: calc(var(--grid-gap) / 2);
    grid-template-columns: 1fr auto 1fr;
`;

