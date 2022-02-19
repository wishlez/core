import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import useSWR from 'swr';
import {WithAccounts} from '../../../types/accounts';
import {doGet, doPost, ResponseErrorType} from '../../fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    onCreate: () => void
}

export const TransactionCreateForm: FunctionComponent<Props> = (props) => {
    const descriptionRef = useRef<HTMLInputElement>();
    const dateRef = useRef<HTMLInputElement>();
    const amountRef = useRef<HTMLInputElement>();
    const fromAccountRef = useRef<HTMLSelectElement>();
    const toAccountRef = useRef<HTMLSelectElement>();
    const {data: {accounts} = {accounts: []}} = useSWR<WithAccounts>(swrKeys.accounts, doGet);
    const [error, setError] = useState<ResponseErrorType>();

    const createTransaction = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await doPost('/api/transactions', {
                description: descriptionRef.current.value,
                date: new Date(dateRef.current.value),
                amount: Number(amountRef.current.value),
                fromAccountId: Number(fromAccountRef.current.value),
                toAccountId: Number(toAccountRef.current.value)
            });

            descriptionRef.current.value = '';
            dateRef.current.value = '';
            amountRef.current.value = '';
            fromAccountRef.current.value = '';
            toAccountRef.current.value = '';
            descriptionRef.current.focus();

            props.onCreate();
        } catch (err) {
            setError(err);
        }
    };

    const clearError = () => setError(null);

    return (
        <>
            <form onSubmit={createTransaction} onInput={clearError}>
                <input ref={descriptionRef} type="text" placeholder="Describe transaction" required/>
                <input ref={dateRef} type="date" placeholder="Select date" required/>
                <input ref={amountRef} type="number" placeholder="Enter amount" step={0.01} min={0.01} required/>
                <select ref={fromAccountRef}>
                    {accounts.map(({id, name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <select ref={toAccountRef}>
                    {accounts.map(({id, name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <button>Create</button>
                <button type="reset" onClick={clearError}>Clear</button>
                {error?.info?.error}
            </form>
        </>
    );
};
