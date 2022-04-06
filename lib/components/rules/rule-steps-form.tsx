import {forwardRef, useEffect, useRef, useState} from 'react';
import {Option} from '../../../types/input';
import {AnyObject} from '../../../types/object';
import {RuleStepRef} from '../../../types/rules';
import {Button} from '../../design/button';
import {FormSubtitle} from '../../design/form-subtitle';
import {getRandomId} from '../../design/helpers/randomizer';
import {Icon} from '../../design/icon';
import {RuleStepForm} from './rule-step-form';

type Props = {
    fields: Option[]
    operators: Option[]
    title: string
}

export const RuleStepsForm = forwardRef<RuleStepRef[], Props>((props, ref) => {
    const [steps, setSteps] = useState<string[]>([]);
    const stepRefs = useRef<AnyObject<string, RuleStepRef>>({});

    const addStep = () => {
        setSteps((items) => items.concat(getRandomId('step')));
    };

    const removeStep = (id: string) => {
        setSteps((items) => {
            delete stepRefs.current[id];
            return items.filter((item) => item !== id);
        });
    };

    useEffect(() => {
        const refs = Object.values(stepRefs.current);

        if (typeof ref === 'function') {
            ref(refs);
        } else if (ref) {
            ref.current = refs;
        }

        if (steps.length === 0) {
            addStep();
        }
    }, [ref, steps.length]);

    return (
        <>
            <FormSubtitle>
                {props.title}
                <Button
                    color={'tertiary'}
                    onClick={addStep}
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
            {steps.map((step) => (
                <RuleStepForm
                    canDelete={steps.length !== 1}
                    fields={props.fields}
                    key={step}
                    onDelete={() => removeStep(step)}
                    operators={props.operators}
                    ref={(ref) => stepRefs.current[step] = ref}
                >
                    {step}
                </RuleStepForm>
            ))}
        </>
    );
});

RuleStepsForm.displayName = 'RuleStepsForm';
