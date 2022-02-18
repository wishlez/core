import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import useSWR from 'swr';
import {WithAccountTypes} from '../../../types/account-types';
import {doGet, doPost, ResponseErrorType} from '../../fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    onCreate: () => void
}

export const AccountCreateForm: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const initialRef = useRef<HTMLInputElement>();
    const maximumRef = useRef<HTMLInputElement>();
    const accountTypeRef = useRef<HTMLSelectElement>();
    const {data} = useSWR<WithAccountTypes>(swrKeys.accountTypes, doGet);
    const [error, setError] = useState<ResponseErrorType>();

    const createAccount = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await doPost('/api/accounts', {
                name: nameRef.current.value,
                openingBalance: Number(initialRef.current.value) || 0,
                maximumAmountOwed: Number(maximumRef.current.value) || 0,
                accountTypeId: Number(accountTypeRef.current.value)
            });

            nameRef.current.value = '';
            initialRef.current.value = '';
            maximumRef.current.value = '';
            accountTypeRef.current.value = '';
            nameRef.current.focus();

            props.onCreate();
        } catch (err) {
            setError(err);
        }
    };

    const clearError = () => setError(null);

    return (
        <>
            <form onSubmit={createAccount} onInput={clearError}>
                <input ref={nameRef} type="text" placeholder="Enter account name" required/>
                <input ref={initialRef} type="number" placeholder="Enter initial balance" step={0.01} min={0}/>
                <input ref={maximumRef} type="number" placeholder="Enter maximum limit" step={0.01} min={0}/>
                <select ref={accountTypeRef}>
                    {data && data.accountTypes.map(({id, type}) => (
                        <option key={id} value={id}>{type}</option>
                    ))}
                </select>
                <button>Create</button>
                <button type="reset" onClick={clearError}>Clear</button>
                {error?.info?.error}
            </form>
        </>
    );
};
