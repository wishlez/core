import styled from 'styled-components';
import {Title} from './title';

export const FormTitle = styled(Title).attrs({
    size: 'h2'
})`
    grid-area: title;
`;
