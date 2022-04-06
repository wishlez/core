import {FunctionComponent} from 'react';
import styled, {css} from 'styled-components';
import {useAccordion} from './accordion-context';
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
    const {isOpen, setIsOpen} = useAccordion();

    const toggleAccordion = () => setIsOpen(isOpen => !isOpen);

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
