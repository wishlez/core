import {createContext, Dispatch, FunctionComponent, SetStateAction, useContext, useState} from 'react';

type Props = {
    id: string
}

type AccordionContext = {
    id: Props['id']
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
};

const AccordionContext = createContext<AccordionContext>({
    id: null,
    isOpen: false,
    setIsOpen: () => null
});

export const useAccordion = () => useContext(AccordionContext);

export const AccordionProvider: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <AccordionContext.Provider
            value={{
                id: props.id,
                isOpen,
                setIsOpen
            }}
        >
            {props.children}
        </AccordionContext.Provider>
    );
};
