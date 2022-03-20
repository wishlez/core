import {AnimatePresence, motion} from 'framer-motion';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Transient} from './helpers/transient';
import {withDirection, WithDirection} from './helpers/with-direction';
import {usePopupAnimation} from './popup-animation';

type Props = WithDirection<{
    isOpen: boolean
}>

const _Popup = styled(motion.div)<Transient<WithDirection>>`
    position: absolute;

    ${withDirection}
`;

export const Popup: FunctionComponent<Props> = ({isOpen, alignHorizontal, alignVertical, children}) => {
    const animation = usePopupAnimation({
        alignHorizontal,
        alignVertical
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <_Popup
                    $alignHorizontal={alignHorizontal}
                    $alignVertical={alignVertical}
                    key={'popup'}
                    {...animation}
                    transition={{ease: 'backInOut'}}
                >
                    {children}
                </_Popup>
            )}
        </AnimatePresence>
    );
};

Popup.defaultProps = {
    alignHorizontal: 'right',
    alignVertical: 'bottom'
};
