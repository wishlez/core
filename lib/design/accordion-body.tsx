import {AnimatePresence, motion} from 'framer-motion';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {useAccordion} from './accordion-context';
import {getRandomId} from './helpers/randomizer';

const Body = styled(motion.main)`
    overflow: hidden;
`

export const AccordionBody: FunctionComponent = (props) => {
    const {isOpen} = useAccordion();

    return (
        <AnimatePresence>
            {isOpen && (
                <Body
                    animate={{height: 'auto'}}
                    exit={{height: 0}}
                    initial={{height: 0}}
                    key={getRandomId('accordion-body')}
                >
                    {props.children}
                </Body>
            )}
        </AnimatePresence>
    );
};
