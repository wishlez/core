import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import {Tag} from '../../../types/categories';
import {doDelete, doPut} from '../../fetch';

type Props = {
    tag: Tag
    swrKey: string
    onEdit: () => void
    onDelete: () => void
}

export type TagItem = FunctionComponent<Props>

export const TagItem: TagItem = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const [editing, setEditing] = useState<boolean>(false);

    const deleteTag = async (id: number) => {
        await doDelete(props.swrKey, {id});
        props.onDelete();
    };

    const saveTag = async (event: FormEvent) => {
        event.preventDefault();
        await doPut(props.swrKey, {
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
        </form>
    ) : (
        <div>
            #{props.tag.name}
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => deleteTag(props.tag.id)}>Delete</button>
        </div>
    );
};
