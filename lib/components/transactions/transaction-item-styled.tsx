import styled from 'styled-components';
import {Card} from '../../design/card';
import {Amount} from '../../design/formatted-amount';
import {DetailsColumn} from '../shared/details-column';

export const Container = styled(Card)`
    margin: var(--grid-gap);

    @media (min-width: 960px) {
        display: flex;
        justify-content: space-between;
    }
`;

export const Details1 = styled(DetailsColumn)`
    align-items: start;
`;

export const Details2 = styled(DetailsColumn)`
    justify-content: space-between;
    align-items: end;
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

export const BigAmount = styled(Amount)`
    font-size: 2em;
`;

export const Actions = styled.span`
    text-align: right;
`;

