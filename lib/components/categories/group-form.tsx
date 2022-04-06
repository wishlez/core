import {FormEvent, FunctionComponent, useRef} from 'react';
import useSWR from 'swr';
import {Group, GroupRequest, WithTags} from '../../../types/categories';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {toSelectedIds} from '../../design/helpers/selected-ids';
import {Icon} from '../../design/icon';
import {Input} from '../../design/input';
import {SelectMultiple} from '../../design/select-multiple';
import {doGet} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    onCancel: () => void
    onDelete?: () => void
    onSubmit: (group: GroupRequest) => void
    group?: Group
    title: string
}

export const GroupForm: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const budgetRef = useRef<HTMLInputElement>();
    const tagsRef = useRef<HTMLSelectElement>();
    const {data: {tags} = {tags: []}} = useSWR<WithTags>(swrKeys.categories.tags, doGet);

    const existingTags = props.group?.tags.map((transactionTag) => transactionTag.tagId.toString());

    const submitGroup = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
            budget: Number(budgetRef.current.value) || 0,
            name: nameRef.current.value,
            tags: toSelectedIds(tagsRef.current.selectedOptions)
        });
    };

    return (
        <Form onSubmit={submitGroup}>
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
                    defaultValue={props.group?.name}
                    placeholder={'Enter group name'}
                    ref={nameRef}
                    required
                    type={'text'}
                />
                <Input
                    defaultValue={props.group?.budget}
                    min={0}
                    note={'(Optional)'}
                    placeholder={'Enter budget for group'}
                    ref={budgetRef}
                    step={0.01}
                    type={'number'}
                />
                <SelectMultiple
                    defaultValue={existingTags}
                    label={'Select categories'}
                    multiple
                    placeholder={'Start typing to show categories'}
                    ref={tagsRef}
                >
                    {tags.map(({id, name}) => (
                        <option
                            key={id}
                            value={id}
                        >
                            {name}
                        </option>
                    ))}
                </SelectMultiple>
            </FormFields>
            <FormActions>
                {props.group && (
                    <Button
                        color={'danger'}
                        onClick={props.onDelete}
                        variant={'outlined'}
                    >
                        {'Delete'}
                    </Button>
                )}
                <Button type={'submit'}>
                    {props.group ? 'Update' : 'Create'}
                </Button>
            </FormActions>
        </Form>
    );
};
