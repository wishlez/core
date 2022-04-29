import useSWR from 'swr';
import {Option} from '../../types/input';
import {AnyObject} from '../../types/object';
import {Condition, ConditionOperators, ConditionRequest, RuleConditionRef, WithConditionOperators} from '../../types/rule-conditions';
import {swrKeys} from '../components/swr-keys';
import {doGet} from './fetch';

const conditionLabels: AnyObject<ConditionOperators, string> = {
    'e': 'is equal to',
    'gt': 'is greater than',
    'gte': 'is greater than or equal to',
    'lt': 'is less than',
    'lte': 'is less than or equal to',
    'ne': 'is not equal to',
    'reg': 'matches pattern'
};

const hasConditionsChanged = (stepRef: RuleConditionRef, step: Condition) => [
    step.field !== stepRef.field.current.value,
    step.operatorType !== stepRef.operatorType.current.value,
    step.value !== stepRef.value.current.value
].some((changed) => changed);

export const getAdjustedConditions = (stepsRef: RuleConditionRef[], steps: Condition[] = []): ConditionRequest => {
    const stepsMap: AnyObject<number, Condition> = steps.reduce((map, step) => ({
        ...map,
        [step.id]: step
    }), {});
    const existingIds = steps.map((step) => step.id);
    const added = stepsRef.filter((stepRef) => !existingIds.includes(stepRef.id)).map((stepRef) => ({
        field: stepRef.field.current.value,
        operatorType: stepRef.operatorType.current.value,
        value: stepRef.value.current.value
    }));
    const deleted = existingIds.filter((id) => !stepsRef.find((stepRef) => stepRef.id === id));
    const updated = stepsRef
        .map((stepRef) => {
            if (stepRef.id in stepsMap && hasConditionsChanged(stepRef, stepsMap[stepRef.id])) {
                return {
                    ...stepsMap[stepRef.id],
                    field: stepRef.field.current.value,
                    operatorType: stepRef.operatorType.current.value,
                    value: stepRef.value.current.value
                };
            } else {
                return null;
            }
        })
        .filter((step) => step);

    return {
        added,
        deleted,
        updated
    };
};

export const getConditionDescription = (operator: ConditionOperators) => {
    return conditionLabels[operator];
};

export const useConditionOptions = (): Option[] => {
    const {data: {conditionOperators} = {conditionOperators: []}} = useSWR<WithConditionOperators>(swrKeys.conditionOperators, doGet);

    return conditionOperators?.map((operator) => ({
        label: conditionLabels[operator.type],
        value: operator.type
    })) || [];
};
