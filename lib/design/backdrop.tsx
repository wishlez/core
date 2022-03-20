import {AnimatePresence, motion} from 'framer-motion';
import {FunctionComponent} from 'react';
import styled, {css, StyledComponentProps} from 'styled-components';
import {FullScreen} from './fullScreen';
import {Transient} from './helpers/transient';

type Props = StyledComponentProps<'div', any, any, any> & {
    blur?: boolean
    isVisible: boolean
};

const _Backdrop = styled(FullScreen.withComponent(motion.div))<Transient<Props>>((props) => props.$blur ? css`
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
` : '');

export const Backdrop: FunctionComponent<Props> = ({isVisible, blur, ...props}) => (
    <AnimatePresence>
        {isVisible && (
            <_Backdrop
                $blur={blur}
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

Backdrop.defaultProps = {
    blur: true
};
