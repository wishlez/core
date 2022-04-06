import {FormEvent, FunctionComponent, useRef} from 'react';
import {Rule, RuleRequest} from '../../../types/rules';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Icon} from '../../design/icon';
import {Input} from '../../design/input';
import {Switch} from '../../design/switch';

type Props = {
    onCancel: () => void
    onDelete?: () => void
    onSubmit: (rule: RuleRequest) => void
    rule?: Rule
    title: string
}

export const RuleForm: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const runOnCreateRef = useRef<HTMLInputElement>();
    const runOnUpdateRef = useRef<HTMLInputElement>();

    const submitRule = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
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
