import styled from 'styled-components';
import {Amount} from '../../design/formatted-amount';
import {Title} from '../../design/title';

export const Container = styled.article`
    box-shadow: var(--box-shadow-1);
    background-color: var(--mono-999);
    margin: var(--grid-gap);
    padding: var(--uniform-padding);

    @media (min-width: 960px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Details = styled.section`
    display: flex;
    flex-flow: column;
`;

export const Details1 = styled(Details)`
    align-items: start;
`;

export const Details2 = styled(Details)`
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

export const Description = styled(Title).attrs({
    size: 'h3'
})`
    font-weight: bold;
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

export const Categories = styled.div`
    margin-top: var(--grid-gap);
`;
