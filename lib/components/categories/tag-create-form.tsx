import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import {doPost, ResponseErrorType} from '../../fetch';

type Props = {
    onCreate: () => void
}

export type TagCreateForm = FunctionComponent<Props>

export const TagCreateForm: TagCreateForm = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const [error, setError] = useState<ResponseErrorType>();

    const createTag = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await doPost('/api/categories/tags', {
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
            <form onSubmit={createTag} onInput={clearError}>
                <input ref={nameRef} type="text" placeholder="Enter tag name" required/>
                <button>Create</button>
                <button type="reset" onClick={clearError}>Clear</button>
                {error?.info?.error}
            </form>
        </>
    );
};
