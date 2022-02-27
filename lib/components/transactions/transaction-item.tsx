import {FunctionComponent, useState} from 'react';
import {Transaction, TransactionRequest} from '../../../types/transactions';
import {Button} from '../../design/button';
import {doDelete, doPut} from '../../fetch';
import {swrKeys} from '../swr-keys';
import {TransactionForm} from './transaction-form';

type Props = {
    transaction: Transaction
    onEdit: () => void
    onDelete: () => void
}

export const TransactionItem: FunctionComponent<Props> = (props) => {
    const [editing, setEditing] = useState<boolean>(false);
    const existingTags = props.transaction.tags.map((transactionTag) => transactionTag.tagId);

    const deleteTransaction = async (id: number) => {
        await doDelete(swrKeys.transactions, {id});
        props.onDelete();
    };

    const saveTransaction = async (transaction: TransactionRequest) => {
        await doPut(swrKeys.transactions, {
            ...props.transaction,
            ...transaction,
            tags: {
                deleted: existingTags.filter((tag) => !transaction.tags.includes(tag)),
                added: transaction.tags.filter((tag) => !existingTags.includes(tag))
            }
        });
        setEditing(false);
        props.onEdit();
    };

    return editing ? (
        <TransactionForm
            onSubmit={saveTransaction}
            onCancel={() => setEditing(false)}
            transaction={props.transaction}
        />
    ) : (
        <div>
            {props.transaction.description} on {props.transaction.date.toString()}
            from {props.transaction.fromAccount.name} to {props.transaction.toAccount.name}
            worth {props.transaction.amount}
            <Button variant="filled" color="primary" onClick={() => setEditing(true)}>Edit</Button>
            <Button variant="filled" color="danger" onClick={() => deleteTransaction(props.transaction.id)}>Delete</Button>
            <div>
                {props.transaction.tags.map(({tag}) => `#${tag.name}`).join(' ')}
            </div>
        </div>
    );
};
