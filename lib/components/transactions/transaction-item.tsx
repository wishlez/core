import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import useSWR from 'swr';
import {WithAccounts} from '../../../types/accounts';
import {Transaction} from '../../../types/transactions';
import {doDelete, doGet, doPut} from '../../fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    transaction: Transaction
    onEdit: () => void
    onDelete: () => void
}

export const TransactionItem: FunctionComponent<Props> = (props) => {
    const descriptionRef = useRef<HTMLInputElement>();
    const dateRef = useRef<HTMLInputElement>();
    const amountRef = useRef<HTMLInputElement>();
    const fromAccountRef = useRef<HTMLSelectElement>();
    const toAccountRef = useRef<HTMLSelectElement>();
    const {data: {accounts} = {accounts: []}} = useSWR<WithAccounts>(swrKeys.accounts, doGet);
    const [editing, setEditing] = useState<boolean>(false);

    const deleteTransaction = async (id: number) => {
        await doDelete(swrKeys.transactions, {id});
        props.onDelete();
    };

    const saveTransaction = async (event: FormEvent) => {
        event.preventDefault();
        await doPut(swrKeys.transactions, {
            ...props.transaction,
            description: descriptionRef.current.value,
            date: new Date(dateRef.current.value),
            amount: Number(amountRef.current.value),
            fromAccountId: Number(fromAccountRef.current.value),
            toAccountId: Number(toAccountRef.current.value)
        });
        setEditing(false);
        props.onEdit();
    };

    return editing ? (
        <form onSubmit={saveTransaction}>
            <input
                ref={descriptionRef} type="text" placeholder="Describe transaction" required
                defaultValue={props.transaction.description}
            />
            <input
                ref={dateRef} type="date" placeholder="Select date" step={0.01} min={0} required
                defaultValue={props.transaction.date.toString().substring(0, 10)}
            />
            <input
                ref={amountRef} type="number" placeholder="Enter amount" step={0.01} min={0.01} required
                defaultValue={props.transaction.amount}
            />
            <select ref={fromAccountRef} defaultValue={props.transaction.fromAccountId}>
                {accounts.map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>
            <select ref={toAccountRef} defaultValue={props.transaction.toAccountId}>
                {accounts.map(({id, name}) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>
            <button>Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
    ) : (
        <div>
            {props.transaction.description} on {props.transaction.date.toString()}
            from {props.transaction.fromAccount.name} to {props.transaction.toAccount.name}
            worth {props.transaction.amount}
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => deleteTransaction(props.transaction.id)}>Delete</button>
        </div>
    );
};
