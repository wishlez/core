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
        <Form onSubmit={createTag}>
            <FormTitle>
                {props.title}
            </FormTitle>
            <FormFields>
                <Input
                    autoFocus
                    defaultValue={props.tag?.name}
                    placeholder={'Enter tag name'}
                    ref={nameRef}
                    required
                    type={'text'}
                />
            </FormFields>
            <FormActions>
                <Button>
                    {'Save'}
                </Button>
                <Button
                    color={'secondary'}
                    onClick={cancel}
                    type={'reset'}
                    variant={'outlined'}
                >
                    {'Cancel'}
                </Button>
            </FormActions>
        </Form>
    );
};
