import {AnimatePresence, motion} from 'framer-motion';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Backdrop} from './backdrop';
import {FullScreen} from './fullScreen';
import {Portal} from './portal';

type Props = {
    isOpen: boolean
    onClose: () => void
}

const ModalContainer = styled(FullScreen)`
    display: flex;
    pointer-events: none;

    @media (min-width: 32rem) {
        align-items: center;
        justify-content: center;
    }
`;

const ModalContent = styled(motion.div)`
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

export const Modal: FunctionComponent<Props> = (props) => (
    <Portal>
        <Backdrop
            isVisible={props.isOpen}
            onClick={props.onClose}
        />
        <AnimatePresence>
            {props.isOpen && (
                <ModalContainer>
                    <ModalContent
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0}}
                        initial={{opacity: 0, scale: 0}}
                    >
                        {props.children}
                    </ModalContent>
                </ModalContainer>
            )}
        </AnimatePresence>
    </Portal>
);
