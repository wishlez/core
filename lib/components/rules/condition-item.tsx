import {FunctionComponent} from 'react';
import {Condition} from '../../../types/rule-steps';
import {Code} from '../../design/code';
import {getConditionDescription} from '../../helpers/operators';

type Props = {
    condition: Condition
}

export const ConditionItem: FunctionComponent<Props> = (props) => (
    <>
        <Code>{props.condition.field}</Code>
        {' '}
        {getConditionDescription(props.condition.operator.type)}
        {' '}
        <Code>{props.condition.value}</Code>
    </>
);
