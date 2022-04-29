import {FormEvent, FunctionComponent, useRef} from 'react';
import {Option} from '../../../types/input';
import {RuleActionRef} from '../../../types/rule-actions';
import {RuleConditionRef} from '../../../types/rule-conditions';
import {Rule, RuleRequest} from '../../../types/rules';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Icon} from '../../design/icon';
import {Input} from '../../design/input';
import {Switch} from '../../design/switch';
import {getAdjustedActions} from '../../helpers/rule-actions';
import {getAdjustedConditions, useConditionOptions} from '../../helpers/rule-conditions';
import {useFieldTypeOptions} from '../../helpers/rule-field-types';
import {RuleActionsForm} from './rule-actions-form';
import {RuleConditionsForm} from './rule-conditions-form';

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
    const actionsRef = useRef<RuleActionRef[]>();
    const conditionsRef = useRef<RuleConditionRef[]>();
    const actionFieldTypeOptions = useFieldTypeOptions();
    const conditionOptions = useConditionOptions();

    const submitRule = (event: FormEvent) => {
        event.preventDefault();

        props.onSubmit({
            actions: getAdjustedActions(actionsRef.current, props.rule?.actions),
            conditions: getAdjustedConditions(conditionsRef.current, props.rule?.conditions),
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
                <RuleConditionsForm
                    defaultConditions={props.rule?.conditions}
                    fields={fieldOptions}
                    operators={conditionOptions}
                    ref={conditionsRef}
                    title={'Conditions'}
                />
                <RuleActionsForm
                    defaultActions={props.rule?.actions}
                    fields={actionFieldTypeOptions}
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
