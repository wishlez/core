import styled from 'styled-components';
import {Title} from './title';

export const FormTitle = styled(Title).attrs({
    size: 'h2'
})`
    display: flex;
    justify-content: space-between;
    grid-area: title;
`;
