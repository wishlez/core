import styled from 'styled-components';
import {Card} from '../../design/card';

export const AuthFormContainer = styled(Card)`
    margin-top: var(--uniform-padding);

    @media (min-width: 480px) {
        margin: var(--uniform-padding) auto;
        max-width: 500px;
    }
`;
