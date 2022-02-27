import {createContext, FormHTMLAttributes, FunctionComponent, MutableRefObject, useContext, useRef} from 'react';
import styled from 'styled-components';

const FormContext = createContext<MutableRefObject<HTMLFormElement>>(null);

const _Form = styled.form`
    display: grid;
    grid-gap: var(--grid-gap);
    padding: var(--uniform-padding);
`;

export const useForm = () => useContext(FormContext);

export const Form: FunctionComponent<FormHTMLAttributes<HTMLFormElement>> = (props) => {
    const formRef = useRef<HTMLFormElement>();

    return (
        <FormContext.Provider value={formRef}>
            <_Form {...props} ref={formRef}/>
        </FormContext.Provider>
    );
};
