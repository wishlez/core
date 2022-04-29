import {AnyObject} from '../../types/object';
import {Action, ActionRequest, RuleActionRef} from '../../types/rule-actions';
import {RuleFieldTypes} from '../../types/rule-field-types';

const hasActionsChanged = (stepRef: RuleActionRef, step: Action) => [
    step.fieldType !== stepRef.fieldType.current.value,
    step.value !== stepRef.value.current.value
].some((changed) => changed);

export const getAdjustedActions = (stepsRef: RuleActionRef[], steps: Action[] = []): ActionRequest => {
    const stepsMap: AnyObject<number, Action> = steps.reduce((map, step) => ({
        ...map,
        [step.id]: step
    }), {});
    const existingIds = steps.map((step) => step.id);
    const added = stepsRef.filter((stepRef) => !existingIds.includes(stepRef.id)).map((stepRef) => ({
        fieldType: <RuleFieldTypes>stepRef.fieldType.current.value,
        value: stepRef.value.current.value
    }));
    const deleted = existingIds.filter((id) => !stepsRef.find((stepRef) => stepRef.id === id));
    const updated = stepsRef
        .map((stepRef) => {
            if (stepRef.id in stepsMap && hasActionsChanged(stepRef, stepsMap[stepRef.id])) {
                return {
                    ...stepsMap[stepRef.id],
                    field: stepRef.fieldType.current.value,
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
