import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import {doPost, ResponseErrorType} from '../../fetch';

type Props = {
    onCreate: () => void
}

export type GroupCreateForm = FunctionComponent<Props>

export const GroupCreateForm: GroupCreateForm = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const [error, setError] = useState<ResponseErrorType>();

    const createGroup = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await doPost('/api/categories/groups', {
                name: nameRef.current.value
            });

            nameRef.current.value = '';
            nameRef.current.focus();

            props.onCreate();
        } catch (err) {
            setError(err);
        }
    };

    const clearError = () => setError(null);

    return (
        <>
            <form onSubmit={createGroup} onInput={clearError}>
                <input ref={nameRef} type="text" placeholder="Enter group name" required/>
                <button>Create</button>
                <button type="reset" onClick={clearError}>Clear</button>
                {error?.info?.error}
            </form>
        </>
    );
};
