import styled from 'styled-components';
import {Title} from './title';

export const FormSubtitle = styled(Title).attrs({
    size: 'h3'
})`
    border-bottom: 1px solid var(--mono-800);
    padding-top: var(--grid-gap);
    display: flex;
    justify-content: space-between;
`;
