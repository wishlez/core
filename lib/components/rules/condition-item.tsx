import {FunctionComponent} from 'react';
import {Condition, ConditionOperators} from '../../../types/rule-conditions';
import {Code} from '../../design/code';
import {getConditionDescription} from '../../helpers/rule-conditions';

type Props = {
    condition: Condition
}

export const ConditionItem: FunctionComponent<Props> = (props) => (
    <>
        <Code>{props.condition.field}</Code>
        {' '}
        {getConditionDescription(props.condition.operatorType as ConditionOperators)}
        {' '}
        <Code>{props.condition.value}</Code>
    </>
);
