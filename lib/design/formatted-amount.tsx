import {FunctionComponent} from 'react';
import styled from 'styled-components';

type Props = {
    number: string | number
}

const format = new Intl.NumberFormat('en', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
});

export const Amount = styled.span`
    font-family: 'CutiveMono', sans-serif;
    text-align: end;
`;

export const FormattedAmount: FunctionComponent<Props> = (props) => (
    <>
        {format.format(Number(props.number))}
    </>
);
