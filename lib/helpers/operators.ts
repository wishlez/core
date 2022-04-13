import useSWR from 'swr';
import {Option} from '../../types/input';
import {AnyObject} from '../../types/object';
import {ActionOperators, ConditionOperators, WithActionOperators, WithConditionOperators} from '../../types/operators';
import {swrKeys} from '../components/swr-keys';
import {doGet} from './fetch';

const actionLabels: AnyObject<ActionOperators, string> = {
    'value': 'to value',
    'value-of': 'to value of'
};

const conditionLabels: AnyObject<ConditionOperators, string> = {
    'e': 'is equal to',
    'gt': 'is greater than',
    'gte': 'is greater than or equal to',
    'lt': 'is less than',
    'lte': 'is less than or equal to',
    'ne': 'is not equal to',
    'reg': 'matches pattern'
};

export const getConditionDescription = (operator: ConditionOperators) => {
    return conditionLabels[operator];
};

export const getActionDescription = (operator: ActionOperators) => actionLabels[operator];

export const useActionOptions = (): Option[] => {
    const {data: {actionOperators} = {actionOperators: []}} = useSWR<WithActionOperators>(swrKeys.operators.actions, doGet);

    return actionOperators?.map((operator) => ({
        label: actionLabels[operator.type],
        value: operator.id.toString()
    })) || [];
};

export const useConditionOptions = (): Option[] => {
    const {data: {conditionOperators} = {conditionOperators: []}} = useSWR<WithConditionOperators>(swrKeys.operators.conditions, doGet);

    return conditionOperators?.map((operator) => ({
        label: conditionLabels[operator.type],
        value: operator.id.toString()
    })) || [];
};
