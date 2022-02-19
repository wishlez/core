import {FormEvent, FunctionComponent, useRef, useState} from 'react';
import useSWR from 'swr';
import {WithAccountTypes} from '../../../types/account-types';
import {Account} from '../../../types/accounts';
import {doDelete, doGet, doPut} from '../../fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    account: Account
    onEdit: () => void
    onDelete: () => void
}

export const AccountItem: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const initialRef = useRef<HTMLInputElement>();
    const maximumRef = useRef<HTMLInputElement>();
    const accountTypeRef = useRef<HTMLSelectElement>();
    const {data} = useSWR<WithAccountTypes>(swrKeys.accountTypes, doGet);
    const [editing, setEditing] = useState<boolean>(false);

    const deleteAccount = async (id: number) => {
        await doDelete(swrKeys.accounts, {id});
        props.onDelete();
    };

    const saveAccount = async (event: FormEvent) => {
        event.preventDefault();
        await doPut(swrKeys.accounts, {
            ...props.account,
            name: nameRef.current.value,
            openingBalance: Number(initialRef.current.value) || 0,
            maximumAmountOwed: Number(maximumRef.current.value) || 0,
            accountTypeId: Number(accountTypeRef.current.value)
        });
        setEditing(false);
        props.onEdit();
    };

    return editing ? (
        <form onSubmit={saveAccount}>
            <input
                ref={nameRef} type="text" placeholder="Enter account name" required defaultValue={props.account.name}
            />
            <input
                ref={initialRef}
                type="number"
                placeholder="Enter initial balance"
                step={0.01}
                min={0}
                defaultValue={props.account.openingBalance}
            />
            <input
                ref={maximumRef}
                type="number"
                placeholder="Enter maximum limit"
                step={0.01}
                min={0}
                defaultValue={props.account.maximumAmountOwed}
            />
            <select ref={accountTypeRef} defaultValue={props.account.accountTypeId}>
                {data && data.accountTypes.map(({id, type}) => (
                    <option key={id} value={id}>{type}</option>
                ))}
            </select>
            <button>Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
    ) : (
        <div>
            {props.account.name}
            {!props.account.builtIn && (
                <>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={() => deleteAccount(props.account.id)}>Delete</button>
                </>
            )}
        </div>
    );
};
