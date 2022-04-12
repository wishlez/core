import {FunctionComponent} from 'react';
import {AccordionBody} from './accordion-body';
import {AccordionProvider} from './accordion-context';
import {AccordionHeader} from './accordion-header';
import {findFirstOfType} from './helpers/find-children';
import {getRandomId} from './helpers/randomizer';

type Props = {
    id?: string
};

export const Accordion: FunctionComponent<Props> = (props) => {
    const header = findFirstOfType(props.children, AccordionHeader);
    const body = findFirstOfType(props.children, AccordionBody);

    return (
        <AccordionProvider id={props.id || getRandomId('accordion')}>
            <section>
                {header}
                {body}
            </section>
        </AccordionProvider>
    );
};
