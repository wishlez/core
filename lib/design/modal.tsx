import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Backdrop} from './backdrop';
import {Box} from './box';
import {FullScreen} from './fullScreen';
import {Portal} from './portal';

type Props = {
    isOpen: boolean
    onClose?: () => void
}

const ModalContainer = styled(FullScreen)`
    display: flex;

    @media (min-width: 480px) {
        align-items: center;
        justify-content: center;
    }
`;

const ModalContent = styled(Box)`
    background-color: var(--core-999);
    height: 100vh;
    width: 100vw;
    padding: var(--uniform-padding);
    position: relative;

    @media (min-width: 480px) {
        box-shadow: var(--box-shadow-2);
        height: auto;
        max-width: 500px;
    }
`;

export const Modal: FunctionComponent<Props> = (props) => props.isOpen && (
    <Portal>
        <ModalContainer>
            <Backdrop onClick={props.onClose}/>
            <ModalContent>
                {props.children}
            </ModalContent>
        </ModalContainer>
    </Portal>
);
