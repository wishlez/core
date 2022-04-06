import {FunctionComponent} from 'react';
import {AccordionBody} from './accordion-body';
import {AccordionProvider} from './accordion-context';
import {AccordionHeader} from './accordion-header';
import {findFirstOfType} from './helpers/find-children';

export const Accordion: FunctionComponent = (props) => {
    const header = findFirstOfType(props.children, AccordionHeader);
    const body = findFirstOfType(props.children, AccordionBody);

    return (
        <AccordionProvider>
            <section>
                {header}
                {body}
            </section>
        </AccordionProvider>
    );
};
