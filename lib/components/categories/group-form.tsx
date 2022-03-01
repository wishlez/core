import {FormEvent, FunctionComponent, useRef} from 'react';
import useSWR from 'swr';
import {Group, GroupRequest, WithTags} from '../../../types/categories';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {toSelectedIds} from '../../design/helpers/selected-ids';
import {Input} from '../../design/input';
import {SelectMultiple} from '../../design/select-multiple';
import {doGet} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    onCancel?: () => void
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

    const createGroup = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
            name: nameRef.current.value,
            budget: Number(budgetRef.current.value) || 0,
            tags: toSelectedIds(tagsRef.current.selectedOptions)
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
                        autoFocus
                        required
                        defaultValue={props.group?.name}
                    />
                    <Input
                        type="number"
                        ref={budgetRef}
                        placeholder="Enter budget for group"
                        step={0.01}
                        min={0}
                        defaultValue={props.group?.budget}
                        note="(Optional)"
                    />
                    <SelectMultiple
                        label="Select categories"
                        ref={tagsRef}
                        multiple
                        defaultValue={existingTags}
                        placeholder="Start typing to show categories"
                    >
                        {tags.map(({id, name}) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </SelectMultiple>
                </FormFields>
                <FormActions>
                    <Button variant="filled" color="primary">Save</Button>
                    <Button variant="outlined" color="secondary" type="reset" onClick={cancel}>Cancel</Button>
                </FormActions>
            </Form>
        </>
    );
};
