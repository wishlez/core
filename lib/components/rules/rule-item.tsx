import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Rule} from '../../../types/rules';
import {Accordion} from '../../design/accordion';
import {AccordionBody} from '../../design/accordion-body';
import {AccordionHeader} from '../../design/accordion-header';
import {AccordionLabel} from '../../design/accordion-label';
import {ItemDescription} from '../shared/item-description';
import {RuleSteps} from './rule-steps';
import {RuleUpdate} from './rule-update';

type Props = {
    rule: Rule
    onUpdate: () => void
}

const Header = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const RuleItem: FunctionComponent<Props> = (props) => (
    <Accordion id={`rule-${props.rule.id}`}>
        <AccordionHeader>
            <Header>
                <ItemDescription>
                    <AccordionLabel>
                        {props.rule.name}
                    </AccordionLabel>
                </ItemDescription>
                <RuleUpdate
                    onUpdate={props.onUpdate}
                    rule={props.rule}
                />
            </Header>
        </AccordionHeader>
        <AccordionBody>
            <RuleSteps
                actions={props.rule.actions}
                conditions={props.rule.conditions}
            />
        </AccordionBody>
    </Accordion>
);
