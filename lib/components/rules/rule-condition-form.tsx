import {forwardRef, PropsWithChildren, useEffect, useRef} from 'react';
import {Option} from '../../../types/input';
import {Condition, RuleConditionRef} from '../../../types/rule-conditions';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Input} from '../../design/input';
import {SelectSingle} from '../../design/select-single';
import {RuleStepContainer} from './rule-step-container';

type Props = PropsWithChildren<{
    condition: Condition
    canDelete: boolean
    fields: Option[]
    onDelete: () => void
    operators: Option[]
}>

export const RuleConditionForm = forwardRef<RuleConditionRef, Props>((props, ref) => {
    const fieldRef = useRef<HTMLSelectElement>();
    const operatorTypeRef = useRef<HTMLSelectElement>();
    const valueRef = useRef<HTMLInputElement>();

    useEffect(() => {
        const refs: RuleConditionRef = {
            field: fieldRef,
            id: props.condition?.id,
            operatorType: operatorTypeRef,
            value: valueRef
        };

        if (typeof ref === 'function') {
            ref(refs);
        } else if (ref) {
            ref.current = refs;
        }
    }, [props.condition?.id, ref]);

    return (
        <RuleStepContainer>
            <SelectSingle
                defaultValue={props.condition?.field}
                ref={fieldRef}
                required
            >
                {props.fields.map(({label, value}) => (
                    <option
                        key={value}
                        value={value}
                    >
                        {label}
                    </option>
                ))}
            </SelectSingle>
            <SelectSingle
                defaultValue={props.condition?.operatorType}
                ref={operatorTypeRef}
                required
            >
                {props.operators.map(({label, value}) => (
                    <option
                        key={value}
                        value={value}
                    >
                        {label}
                    </option>
                ))}
            </SelectSingle>
            <Input
                defaultValue={props.condition?.value}
                ref={valueRef}
                required
                type={'text'}
            />
            {props.canDelete && (
                <div>
                    <Button
                        color={'danger'}
                        onClick={props.onDelete}
                        size={'compact'}
                        variant={'text'}
                    >
                        <Icon type={'delete'}/>
                    </Button>
                </div>
            )}
        </RuleStepContainer>
    );
});

RuleConditionForm.displayName = 'RuleConditionForm';
