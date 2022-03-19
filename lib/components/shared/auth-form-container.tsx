import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Card} from '../../design/card';

const Container = styled.section`
    display: flex;
    justify-content: center;
`;

export const AuthFormContainer: FunctionComponent = (props) => (
    <Container>
        <Card {...props}/>
    </Container>
);
