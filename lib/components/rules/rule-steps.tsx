import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {WithActions, WithConditions} from '../../../types/rule-steps';
import {Title} from '../../design/title';
import {ActionItem} from './action-item';
import {ConditionItem} from './condition-item';

type Props = WithActions<WithConditions>

const Container = styled.div`
    padding: var(--uniform-padding);
`;

const List = styled.ul`
    list-style: none;
    margin: 0;
    padding: var(--control-padding-cozy);
`;

const ListItem = styled.li`
    &:not(:last-of-type) {
        margin-bottom: var(--grid-gap-small);

        &:after {
            content: " and";
        }
    }
`;

export const RuleSteps: FunctionComponent<Props> = (props) => (
    <Container>
        <Title size={'h4'}>
            {'When'}
        </Title>
        <List>
            {props.conditions.map((condition) => (
                <ListItem key={condition.id}>
                    <ConditionItem condition={condition}/>
                </ListItem>
            ))}
        </List>
        <Title size={'h4'}>
            {'Then'}
        </Title>
        <List>
            {props.actions.map((action) => (
                <ListItem key={action.id}>
                    <ActionItem action={action}/>
                </ListItem>
            ))}
        </List>
    </Container>
);
