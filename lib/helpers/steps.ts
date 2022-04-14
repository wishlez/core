import {AnyObject} from '../../types/object';
import {Action, ActionRequest, Condition, ConditionRequest} from '../../types/rule-steps';
import {RuleStepRef} from '../../types/rules';

type AdjustedSteps<T> = T extends Action ? ActionRequest : T extends Condition ? ConditionRequest : never;

const hasChanged = (stepRef: RuleStepRef, step: Action | Condition) => [
    step.field !== stepRef.field.current.value,
    step.operatorId !== Number(stepRef.operator.current.value),
    step.value !== stepRef.value.current.value
].some((condition) => condition);

export const getAdjustedSteps = <T extends Action | Condition>(stepsRef: RuleStepRef[], steps: T[] = []): AdjustedSteps<T> => {
    const stepsMap: AnyObject<number, T> = steps.reduce((map, step) => ({
        ...map,
        [step.id]: step
    }), {});
    const existingIds = steps.map((step) => step.id);
    const added = stepsRef.filter((stepRef) => !existingIds.includes(stepRef.id)).map((stepRef) => ({
        field: stepRef.field.current.value,
        operatorId: Number(stepRef.operator.current.value),
        value: stepRef.value.current.value
    }));
    const deleted = existingIds.filter((id) => !stepsRef.find((stepRef) => stepRef.id === id));
    const updated = stepsRef
        .map((stepRef) => {
            if (stepRef.id in stepsMap && hasChanged(stepRef, stepsMap[stepRef.id])) {
                return {
                    ...stepsMap[stepRef.id],
                    field: stepRef.field.current.value,
                    operatorId: Number(stepRef.operator.current.value),
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
    } as unknown as AdjustedSteps<T>;
};
