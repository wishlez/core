import {FunctionComponent, useEffect} from 'react';
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

export const AccordionHeader: FunctionComponent = (props) => {
    const {id, isOpen, setIsOpen} = useAccordion();
    const group = useAccordionGroup();

    const toggleAccordion = () => {
        setIsOpen(isOpen => !isOpen);
        group?.toggleActive(id);
    };

    useEffect(() => {
        if (group?.active.includes(id)) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [group?.active, id, setIsOpen]);

    return (
        <Header isExpanded={isOpen}>
            <Button
                color={'tertiary'}
                onClick={toggleAccordion}
                size={'compact'}
                variant={'text'}
            >
                <Icon type={'expand_more'}/>
            </Button>
            {props.children}
        </Header>
    );
};
