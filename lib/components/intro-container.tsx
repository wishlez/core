import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Banner} from '../design/banner';

const Container = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100vh;

    @media (min-width: 32rem) {
        align-items: start;
    }
`;

const Title = styled.div`
    text-align: center;
    margin: var(--uniform-padding);
`;

export const IntroContainer: FunctionComponent = (props) => (
    <Container>
        <Title>
            <Banner orientation={'horizontal'}/>
        </Title>
        {props.children}
    </Container>
);
