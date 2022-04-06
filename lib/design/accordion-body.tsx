import {AnimatePresence, motion} from 'framer-motion';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {useAccordion} from './accordion-context';

const Body = styled(motion.main)`
    overflow: hidden;
`;

export const AccordionBody: FunctionComponent = (props) => {
    const {id, isOpen} = useAccordion();

    return (
        <AnimatePresence>
            {isOpen && (
                <Body
                    animate={{height: 'auto'}}
                    exit={{height: 0}}
                    initial={{height: 0}}
                    key={id}
                >
                    {props.children}
                </Body>
            )}
        </AnimatePresence>
    );
};
