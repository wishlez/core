import {FormEvent, FunctionComponent, useRef} from 'react';
import {Option} from '../../../types/input';
import {Rule, RuleRequest, RuleStepRef} from '../../../types/rules';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Icon} from '../../design/icon';
import {Input} from '../../design/input';
import {Switch} from '../../design/switch';
import {useActionOptions, useConditionOptions} from '../../helpers/operators';
import {RuleStepsForm} from './rule-steps-form';

type Props = {
    onCancel: () => void
    onDelete?: () => void
    onSubmit: (rule: RuleRequest) => void
    rule?: Rule
    title: string
}

const fieldOptions: Option[] = [
    {label: 'Amount', value: 'amount'},
    {label: 'Description', value: 'description'}
];

export const RuleForm: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const runOnCreateRef = useRef<HTMLInputElement>();
    const runOnUpdateRef = useRef<HTMLInputElement>();
    const actionsRef = useRef<RuleStepRef[]>();
    const conditionsRef = useRef<RuleStepRef[]>();
    const actionOptions = useActionOptions();
    const conditionOptions = useConditionOptions();

    const submitRule = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
            actions: actionsRef.current.map((ref) => ({
                field: ref.field.current.value,
                operatorId: Number(ref.operator.current.value),
                value: ref.value.current.value
            })),
            conditions: conditionsRef.current.map((ref) => ({
                field: ref.field.current.value,
                operatorId: Number(ref.operator.current.value),
                value: ref.value.current.value
            })),
            name: nameRef.current.value,
            runOnCreate: runOnCreateRef.current.checked,
            runOnUpdate: runOnUpdateRef.current.checked
        });
    };

    return (
        <Form onSubmit={submitRule}>
            <FormTitle>
                {props.title}
                <Button
                    color={'secondary'}
                    onClick={props.onCancel}
                    size={'compact'}
                    variant={'text'}
                >
                    <Icon type={'close'}/>
                </Button>
            </FormTitle>
            <FormFields>
                <Input
                    autoFocus
                    defaultValue={props.rule?.name}
                    placeholder={'Enter rule name'}
                    ref={nameRef}
                    required
                    type={'text'}
                />
                <Switch
                    defaultChecked={props.rule?.runOnCreate}
                    label={'Run on creating a transaction'}
                    ref={runOnCreateRef}
                />
                <Switch
                    defaultChecked={props.rule?.runOnUpdate}
                    label={'Run on updating a transaction'}
                    ref={runOnUpdateRef}
                />
                <RuleStepsForm
                    fields={fieldOptions}
                    operators={conditionOptions}
                    ref={conditionsRef}
                    title={'Conditions'}
                />
                <RuleStepsForm
                    fields={fieldOptions}
                    operators={actionOptions}
                    ref={actionsRef}
                    title={'Actions'}
                />
            </FormFields>
            <FormActions>
                {props.rule && (
                    <Button
                        color={'danger'}
                        onClick={props.onDelete}
                        variant={'outlined'}
                    >
                        {'Delete'}
                    </Button>
                )}
                <Button type={'submit'}>
                    {props.rule ? 'Update' : 'Create'}
                </Button>
            </FormActions>
        </Form>
    );
};
