import {forwardRef, PropsWithChildren, useEffect, useRef} from 'react';
import {Option} from '../../../types/input';
import {Action, Condition} from '../../../types/rule-steps';
import {RuleStepRef} from '../../../types/rules';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Input} from '../../design/input';
import {SelectSingle} from '../../design/select-single';
import {RuleStepActions} from './rule-step-actions';

type Props = PropsWithChildren<{
    canDelete: boolean
    fields: Option[]
    onDelete: () => void
    operators: Option[]
    step: Action | Condition
}>

export const RuleStepForm = forwardRef<RuleStepRef, Props>((props, ref) => {
    const fieldRef = useRef<HTMLSelectElement>();
    const operatorRef = useRef<HTMLSelectElement>();
    const valueRef = useRef<HTMLInputElement>();

    useEffect(() => {
        const refs: RuleStepRef = {
            field: fieldRef,
            id: props.step?.id,
            operator: operatorRef,
            value: valueRef
        };

        if (typeof ref === 'function') {
            ref(refs);
        } else if (ref) {
            ref.current = refs;
        }
    }, [props.step?.id, ref]);

    return (
        <RuleStepActions>
            <SelectSingle
                defaultValue={props.step?.field}
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
                defaultValue={props.step?.operatorId}
                ref={operatorRef}
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
                defaultValue={props.step?.value}
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
        </RuleStepActions>
    );
});

RuleStepForm.displayName = 'RuleStepForm';
