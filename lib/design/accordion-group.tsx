import {createContext, FunctionComponent, useContext, useState} from 'react';
import {ToggleSet} from './helpers/toggle-set';

type Props = {
    maxOpen?: number
}

type AccordionGroupContext = {
    active: string[]
    toggleActive: (id: string, state: boolean) => void
};

const AccordionGroupContext = createContext<AccordionGroupContext>(null);

export const useAccordionGroup = () => useContext(AccordionGroupContext);

export const AccordionGroup: FunctionComponent<Props> = (props) => {
    const [active, setActive] = useState<string[]>([]);

    const toggleActive = (id: string, state: boolean) => {
        setActive((ids) => ToggleSet.fromArray(ids)
            .toggle(id, state)
            .toArray()
            .slice(-props.maxOpen));
    };

    return (
        <AccordionGroupContext.Provider
            value={{
                active,
                toggleActive
            }}
        >
            {props.children}
        </AccordionGroupContext.Provider>
    );
};

AccordionGroup.defaultProps = {
    maxOpen: 1
};
