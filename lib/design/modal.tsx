import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Box} from './box';

type Props = {
    isOpen: boolean
    onClose?: () => void
}

const FullScreen = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
`;

const ModalContainer = styled(FullScreen)`
    display: flex;

    @media (min-width: 480px) {
        align-items: center;
        justify-content: center;
    }
`;

const ModalContent = styled(Box)`
    background-color: var(--core-900);
    height: 100vh;
    width: 100vw;
    position: relative;
    z-index: 1;

    @media (min-width: 480px) {
        box-shadow: var(--box-shadow-1);
        height: auto;
        max-width: 500px;
    }
`;

const Backdrop = styled(FullScreen)`
    background-color: rgba(0, 0, 0, 0.23);
    backdrop-filter: blur(2px);
`;

export const Modal: FunctionComponent<Props> = (props) => props.isOpen && (
    <ModalContainer>
        <Backdrop onClick={props.onClose}/>
        <ModalContent>
            {props.children}
        </ModalContent>
    </ModalContainer>
);
