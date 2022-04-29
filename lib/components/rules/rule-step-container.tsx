import styled from 'styled-components';
import {Card} from '../../design/card';

export const RuleStepContainer = styled(Card)`
    display: grid;
    grid-gap: calc(var(--grid-gap) / 2);
    text-align: end;
`;
