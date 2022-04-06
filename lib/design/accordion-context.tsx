import {createContext, Dispatch, FunctionComponent, SetStateAction, useContext, useState} from 'react';

type AccordionContext = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
};

const AccordionContext = createContext<AccordionContext>({
    isOpen: false,
    setIsOpen: () => null
});

export const useAccordion = () => useContext(AccordionContext);

export const AccordionProvider: FunctionComponent = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <AccordionContext.Provider
            value={{
                isOpen,
                setIsOpen
            }}
        >
            {props.children}
        </AccordionContext.Provider>
    );
};
