import {FunctionComponent} from 'react';
import {Action} from '../../../types/rule-actions';
import {Code} from '../../design/code';
import {getFieldTypeDescription} from '../../helpers/rule-field-types';

type Props = {
    action: Action
}

export const ActionItem: FunctionComponent<Props> = (props) => (
    <>
        {'Set '}
        <Code>{getFieldTypeDescription(props.action.fieldType)}</Code>
        {' to '}
        <Code>{props.action.value}</Code>
    </>
);
