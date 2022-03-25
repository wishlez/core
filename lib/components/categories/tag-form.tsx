import {FormEvent, FunctionComponent, useRef} from 'react';
import {Tag, TagRequest} from '../../../types/categories';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Icon} from '../../design/icon';
import {Input} from '../../design/input';

type Props = {
    onCancel: () => void
    onDelete?: () => void
    onSubmit: (tag: TagRequest) => void
    tag?: Tag
    title: string
}

export const TagForm: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();

    const submitTag = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
            name: nameRef.current.value
        });
    };

    return (
        <Form onSubmit={submitTag}>
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
                    defaultValue={props.tag?.name}
                    placeholder={'Enter tag name'}
                    ref={nameRef}
                    required
                    type={'text'}
                />
            </FormFields>
            <FormActions>
                {props.tag && (
                    <Button
                        color={'danger'}
                        onClick={props.onDelete}
                        type={'reset'}
                        variant={'outlined'}
                    >
                        {'Delete'}
                    </Button>
                )}
                <Button>
                    {props.tag ? 'Update' : 'Create'}
                </Button>
            </FormActions>
        </Form>
    );
};
