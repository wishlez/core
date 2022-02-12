import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import {Tag} from '../../../types/categories';
import {doDelete, doPut} from '../../fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    tag: Tag
    onEdit: () => void
    onDelete: () => void
}

export const TagItem: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const [editing, setEditing] = useState<boolean>(false);

    const deleteTag = async (id: number) => {
        await doDelete(swrKeys.categories.tags, {id});
        props.onDelete();
    };

    const saveTag = async (event: FormEvent) => {
        event.preventDefault();
        await doPut(swrKeys.categories.tags, {
            ...props.tag,
            name: nameRef.current.value
        });
        setEditing(false);
        props.onEdit();
    };

    return editing ? (
        <form onSubmit={saveTag}>
            <input ref={nameRef} defaultValue={props.tag.name}/>
            <button>Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
    ) : (
        <div>
            #{props.tag.name}
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => deleteTag(props.tag.id)}>Delete</button>
        </div>
    );
};
