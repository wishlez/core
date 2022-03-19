import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Backdrop} from './backdrop';
import {FullScreen} from './fullScreen';
import {Portal} from './portal';

type Props = {
    isOpen: boolean
    onClose?: () => void
}

const ModalContainer = styled(FullScreen)`
    display: flex;

    @media (min-width: 32rem) {
        align-items: center;
        justify-content: center;
    }
`;

const ModalContent = styled.div`
    background-color: var(--mono-999);
    height: 100vh;
    width: 100vw;
    padding: var(--uniform-padding);
    position: relative;

    @media (min-width: 32rem) {
        box-shadow: var(--box-shadow-2);
        height: auto;
        width: auto;
    }
`;

export const Modal: FunctionComponent<Props> = (props) => props.isOpen && (
    <Portal>
        <Backdrop
            isVisible={true}
            onClick={props.onClose}
        />
        <ModalContainer>
            <ModalContent>
                {props.children}
            </ModalContent>
        </ModalContainer>
    </Portal>
);
