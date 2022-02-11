import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import {Group} from '../../../types/categories';
import {doDelete, doPut} from '../../fetch';

type Props = {
    group: Group
    swrKey: string
    onEdit: () => void
    onDelete: () => void
}

export type GroupItem = FunctionComponent<Props>

export const GroupItem: GroupItem = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const [editing, setEditing] = useState<boolean>(false);

    const deleteGroup = async (id: number) => {
        await doDelete(props.swrKey, {id});
        props.onDelete();
    };

    const saveGroup = async (event: FormEvent) => {
        event.preventDefault();
        await doPut(props.swrKey, {
            ...props.group,
            name: nameRef.current.value
        });
        setEditing(false);
        props.onEdit();
    };

    return editing ? (
        <form onSubmit={saveGroup}>
            <input ref={nameRef} defaultValue={props.group.name}/>
            <button>Save</button>
        </form>
    ) : (
        <div>
            {props.group.name}
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => deleteGroup(props.group.id)}>Delete</button>
        </div>
    );
};
