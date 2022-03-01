import {FormEvent, FunctionComponent, useRef} from 'react';
import {Tag, TagRequest} from '../../../types/categories';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Input} from '../../design/input';

type Props = {
    onCancel?: () => void
    onSubmit: (tag: TagRequest) => void
    tag?: Tag
    title: string
}

export const TagForm: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();

    const createTag = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
            name: nameRef.current.value
        });
    };

    const cancel = () => {
        props.onCancel?.();
    };

    return (
        <>
            <Form onSubmit={createTag}>
                <FormTitle>{props.title}</FormTitle>
                <FormFields>
                    <Input
                        ref={nameRef}
                        type="text"
                        placeholder="Enter tag name"
                        autoFocus
                        required
                        defaultValue={props.tag?.name}
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
