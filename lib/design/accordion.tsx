import {FunctionComponent} from 'react';
import {AccordionBody} from './accordion-body';
import {AccordionProvider} from './accordion-context';
import {AccordionHeader} from './accordion-header';
import {findFirstOfType} from './helpers/find-children';
import {getRandomId} from './helpers/randomizer';

export const Accordion: FunctionComponent = (props) => {
    const header = findFirstOfType(props.children, AccordionHeader);
    const body = findFirstOfType(props.children, AccordionBody);

    return (
        <AccordionProvider id={getRandomId('accordion')}>
            <section>
                {header}
                {body}
            </section>
        </AccordionProvider>
    );
};
