import {FunctionComponent} from 'react';
import styled, {css} from 'styled-components';
import {Title} from './title';

type Props = {
    orientation: 'vertical' | 'horizontal'
}

const Container = styled(Title).attrs({
    size: 'h1'
})<Props>`
    display: inline-flex;
    font-size: 2em;

    ${(props) => {
        return props.orientation === 'horizontal' ? css`
            align-items: end;
        ` : css`
            flex-direction: column;
            align-items: center;
        `;
    }}
`;

const WLogo = styled.img`
    height: 1.40625em;
`;

const WTitle = styled.img`
    height: 1.25em;
`;

export const Banner: FunctionComponent<Props> = (props) => (
    <Container orientation={props.orientation}>
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
