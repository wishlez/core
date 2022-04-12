import {ChangeEvent, FunctionComponent, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {useAccordion} from './accordion-context';
import {useAccordionGroup} from './accordion-group';
import {Button} from './button';
import {Icon} from './icon';

type Props = {
    isExpanded: boolean
}

const Header = styled.header<Props>`
    align-items: center;
    display: grid;
    justify-content: start;
    grid-auto-flow: column;
    grid-template-columns: auto 1fr;
    grid-gap: var(--grid-gap);

    ${(props) => props.isExpanded && css`
        & > ${Button} {
            transform: rotate(180deg);
        }
    `}
`;

const Input = styled.input.attrs({
    type: 'checkbox'
})`
    display: none;
`;

export const AccordionHeader: FunctionComponent = (props) => {
    const {id, isOpen, setIsOpen} = useAccordion();
    const group = useAccordionGroup();

    const toggleAccordion = (event: ChangeEvent<HTMLInputElement>) => {
        setIsOpen(event.target.checked);
        group?.toggleActive(id, event.target.checked);
    };

    useEffect(() => {
        setIsOpen(group?.active.includes(id));
    }, [setIsOpen, group?.active, id]);

    return (
        <Header isExpanded={isOpen}>
            <Input
                checked={isOpen}
                id={id}
                onChange={toggleAccordion}
            />
            <Button
                as={'label'}
                color={'tertiary'}
                htmlFor={id}
                size={'compact'}
                variant={'text'}
            >
                <Icon type={'expand_more'}/>
            </Button>
            {props.children}
        </Header>
    );
};
