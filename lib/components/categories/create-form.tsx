import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import {doPost, ResponseErrorType} from '../../fetch';

type Props = {
    onCreate: () => void
}

export type CreateForm = FunctionComponent<Props>

export const CreateForm: CreateForm = (props) => {
    const tagRef = useRef<HTMLInputElement>();
    const [error, setError] = useState<ResponseErrorType>();

    const createTag = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await doPost('/api/categories/tags', {
                name: tagRef.current.value
            });

            props.onCreate();
        } catch (err) {
            setError(err);
        }
    };

    const clearError = () => setError(null);

    return (
        <>
            <form onSubmit={createTag} onInput={clearError}>
                <input ref={tagRef} type="text" placeholder="Enter category name" required/>
                <button>Create</button>
                <button type="reset" onClick={clearError}>Clear</button>
                {error?.info?.error}
            </form>
        </>
    );
};
