import {FunctionComponent} from 'react';
import {Transaction} from '../../../types/transactions';
import {TransactionDelete} from './transaction-delete';
import {TransactionEdit} from './transaction-edit';

type Props = {
    transaction: Transaction
    onEdit: () => void
    onDelete: () => void
}

export const TransactionItem: FunctionComponent<Props> = (props) => (
    <div>
        {props.transaction.description} on {props.transaction.date.toString()}
        from {props.transaction.fromAccount.name} to {props.transaction.toAccount.name}
        worth {props.transaction.amount}
        <TransactionEdit transaction={props.transaction} onSave={props.onEdit}/>
        <TransactionDelete transaction={props.transaction} onDelete={props.onDelete}/>
        <div>
            {props.transaction.tags.map(({tag}) => `#${tag.name}`).join(' ')}
        </div>
    </div>
);
