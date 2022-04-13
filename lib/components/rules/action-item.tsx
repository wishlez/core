import {FunctionComponent} from 'react';
import {Action} from '../../../types/rule-steps';
import {Code} from '../../design/code';
import {getActionDescription} from '../../helpers/operators';

type Props = {
    action: Action
}

export const ActionItem: FunctionComponent<Props> = (props) => (
    <>
        {'Set '}
        <Code>{props.action.field}</Code>
        {' '}
        {getActionDescription(props.action.operator.type)}
        {' '}
        <Code>{props.action.value}</Code>
    </>
);
