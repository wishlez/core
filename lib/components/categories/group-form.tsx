import {FormEvent, FunctionComponent, useRef} from 'react';
import {Group, GroupRequest} from '../../../types/categories';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Input} from '../../design/input';

type Props = {
    onCancel?: () => void
    onSubmit: (group: GroupRequest) => void
    group?: Group
    title: string
}

export const GroupForm: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();

    const createGroup = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
            name: nameRef.current.value,
            budget: 0
        });
    };

    const cancel = () => {
        props.onCancel?.();
    };

    return (
        <>
            <Form onSubmit={createGroup}>
                <FormTitle>{props.title}</FormTitle>
                <FormFields>
                    <Input
                        ref={nameRef}
                        type="text"
                        placeholder="Enter group name"
                        required
                        defaultValue={props.group?.name}
                    />
                </FormFields>
                <FormActions>
                    <Button variant="filled" color="primary">Save</Button>
                    <Button variant="outlined" color="secondary" type="reset" onClick={cancel}>Cancel</Button>
                </FormActions>
            </Form>
        </>
    );
};
