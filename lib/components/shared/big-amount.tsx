import styled from 'styled-components';
import {Amount} from '../../design/formatted-amount';
import {Title} from '../../design/title';

export const BigAmount = styled(Amount.withComponent(Title)).attrs({
    size: 'h3'
})`
`;
