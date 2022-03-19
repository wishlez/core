import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Card} from '../../design/card';

const Container = styled.section`
    @media (min-width: 32rem) {
        display: flex;
        justify-content: center;
    }
`;

const Content = styled(Card)`
    height: 100%;
    width: 100%;

    @media (min-width: 32em) {
        height: auto;
        width: auto;
    }
`;

export const AuthFormContainer: FunctionComponent = (props) => (
    <Container>
        <Content {...props}/>
    </Container>
);
