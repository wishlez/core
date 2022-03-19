import {AnimatePresence, motion} from 'framer-motion';
import {FunctionComponent} from 'react';
import styled, {StyledComponentProps} from 'styled-components';
import {FullScreen} from './fullScreen';

type Props = StyledComponentProps<'div', any, any, any> & {
    isVisible: boolean
};

const _Backdrop = styled(FullScreen.withComponent(motion.div))`
    background-color: rgba(0, 0, 0, 0.23);
    backdrop-filter: blur(2px);
`;

export const Backdrop: FunctionComponent<Props> = ({isVisible, ...props}) => (
    <AnimatePresence>
        {isVisible && (
            <_Backdrop
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                initial={{opacity: 0}}
                key={'backdrop'}
                transition={{ease: 'linear'}}
                {...props}
            />
        )}
    </AnimatePresence>
);
