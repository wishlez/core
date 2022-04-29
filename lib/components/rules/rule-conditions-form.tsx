import {forwardRef, useEffect, useRef, useState} from 'react';
import {Option} from '../../../types/input';
import {AnyObject} from '../../../types/object';
import {Condition, RuleConditionRef} from '../../../types/rule-conditions';
import {Button} from '../../design/button';
import {FormSubtitle} from '../../design/form-subtitle';
import {getRandomId} from '../../design/helpers/randomizer';
import {Icon} from '../../design/icon';
import {RuleConditionForm} from './rule-condition-form';

type Props = {
    defaultConditions?: Condition[]
    fields: Option[]
    operators: Option[]
    title: string
}

export const RuleConditionsForm = forwardRef<RuleConditionRef[], Props>((props, ref) => {
    const [conditions, setConditions] = useState<string[]>(props.defaultConditions.map(() => getRandomId('condition')));
    const conditionRefs = useRef<AnyObject<string, RuleConditionRef>>({});

    const addCondition = () => {
        setConditions((items) => items.concat(getRandomId('condition')));
    };

    const removeCondition = (id: string) => {
        setConditions((items) => {
            delete conditionRefs.current[id];
            return items.filter((item) => item !== id);
        });
    };

    useEffect(() => {
        const refs = Object.values(conditionRefs.current);

        if (typeof ref === 'function') {
            ref(refs);
        } else if (ref) {
            ref.current = refs;
        }

        if (conditions.length === 0) {
            addCondition();
        }
    }, [ref, conditions.length]);

    return (
        <>
            <FormSubtitle>
                {props.title}
                <Button
                    color={'tertiary'}
                    onClick={addCondition}
                    size={'compact'}
                    variant={'text'}
                >
                    <Icon
                        size={'in-text'}
                        type={'add'}
                    />
                    {'Add new'}
                </Button>
            </FormSubtitle>
            {conditions.map((condition, index) => (
                <RuleConditionForm
                    canDelete={conditions.length !== 1}
                    condition={props.defaultConditions[index]}
                    fields={props.fields}
                    key={condition}
                    onDelete={() => removeCondition(condition)}
                    operators={props.operators}
                    ref={(conditionRef) => conditionRefs.current[condition] = conditionRef}
                >
                    {condition}
                </RuleConditionForm>
            ))}
        </>
    );
});

RuleConditionsForm.displayName = 'RuleConditionsForm';

RuleConditionsForm.defaultProps = {
    defaultConditions: []
};
