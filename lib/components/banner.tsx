import styled from 'styled-components';
import {Title} from '../design/title';

const Container = styled(Title).attrs({
    size: 'h1'
})`
    display: inline-flex;
    align-items: end;
`;

const WLogo = styled.img`
    height: 1.40625em;
`;

const WTitle = styled.img`
    height: 1.25em;
`;

export const Banner = () => (
    <Container>
        <WLogo
            alt={'Logo'}
            src={'/wishlez-logo.svg'}
        />
        <WTitle
            alt={'Wishlez'}
            src={'/wishlez.svg'}
        />
    </Container>
);
