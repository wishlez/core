import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {useAccordion} from './accordion-context';

const Label = styled.label`
    cursor: pointer;
`;

export const AccordionLabel: FunctionComponent = (props) => {
    const {id} = useAccordion();

    return (
        <Label htmlFor={id}>
            {props.children}
        </Label>
    );
};
