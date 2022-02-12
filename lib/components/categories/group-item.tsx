import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import {Group} from '../../../types/categories';
import {doDelete, doPut} from '../../fetch';
import {swrKeys} from '../swr-keys';
import {TagGroups} from './tag-groups';

type Props = {
    group: Group
    onEdit: () => void
    onDelete: () => void
}

export type GroupItem = FunctionComponent<Props>

export const GroupItem: GroupItem = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const [editing, setEditing] = useState<boolean>(false);
    const [tagging, setTagging] = useState<boolean>(false);

    const deleteGroup = async (id: number) => {
        await doDelete(swrKeys.categories.groups, {id});
        props.onDelete();
    };

    const saveGroup = async (event: FormEvent) => {
        event.preventDefault();
        await doPut(swrKeys.categories.groups, {
            ...props.group,
            name: nameRef.current.value
        });
        setEditing(false);
        props.onEdit();
    };

    const refreshTags = () => {
        setTagging(false);
        props.onEdit();
    };

    return editing ? (
        <form onSubmit={saveGroup}>
            <input ref={nameRef} defaultValue={props.group.name}/>
            <button>Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
    ) : (
        <div>
            {props.group.name}
            {tagging ? (
                <TagGroups
                    groupId={props.group.id}
                    onSave={refreshTags}
                    onCancel={() => setTagging(false)}
                    tags={props.group.tags.map(({tag}) => tag.id)}
                />
            ) : (
                <>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={() => deleteGroup(props.group.id)}>Delete</button>
                    <button onClick={() => setTagging(true)}>Edit tags</button>
                    <div>
                        {props.group.tags.map(({tag}) => `#${tag.name}`).join(' ')}
                    </div>
                </>
            )}
        </div>
    );
};
