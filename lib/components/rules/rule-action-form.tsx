import {forwardRef, PropsWithChildren, useEffect, useRef} from 'react';
import {Option} from '../../../types/input';
import {Action, RuleActionRef} from '../../../types/rule-actions';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Input} from '../../design/input';
import {SelectSingle} from '../../design/select-single';
import {RuleStepContainer} from './rule-step-container';

type Props = PropsWithChildren<{
    action: Action
    canDelete: boolean
    fields: Option[]
    onDelete: () => void
}>

export const RuleActionForm = forwardRef<RuleActionRef, Props>((props, ref) => {
    const fieldTypeRef = useRef<HTMLSelectElement>();
    const valueRef = useRef<HTMLInputElement>();

    useEffect(() => {
        const refs: RuleActionRef = {
            fieldType: fieldTypeRef,
            id: props.action?.id,
            value: valueRef
        };

        if (typeof ref === 'function') {
            ref(refs);
        } else if (ref) {
            ref.current = refs;
        }
    }, [props.action?.id, ref]);

    return (
        <RuleStepContainer>
            <SelectSingle
                defaultValue={props.action?.fieldType}
                ref={fieldTypeRef}
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
            <Input
                defaultValue={props.action?.value}
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

RuleActionForm.displayName = 'RuleActionForm';
