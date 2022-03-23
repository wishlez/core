import {FunctionComponent} from 'react';
import {Transaction} from '../../../types/transactions';
import {FormattedAmount} from '../../design/formatted-amount';
import {FormattedDate} from '../../design/formatted-date';
import {Icon} from '../../design/icon';
import {BigAmount} from '../shared/big-amount';
import {ItemActions} from '../shared/item-actions';
import {ItemDescription} from '../shared/item-description';
import {TagsContainer} from '../shared/tags-container';
import {TransactionDelete} from './transaction-delete';
import {TransactionEdit} from './transaction-edit';
import {CashFlow, FromAccount, ToAccount} from './transaction-item-styled';

type Props = {
    transaction: Transaction
    onUpdate: () => void
}

export const TransactionItem: FunctionComponent<Props> = (props) => (
    <>
        <ItemDescription>
            {props.transaction.description}
        </ItemDescription>
        <FormattedDate dateTime={props.transaction.date}/>
        <CashFlow>
            <FromAccount>
                {props.transaction.fromAccount.name}
            </FromAccount>
            <Icon
                size={'in-text'}
                type={'transferred-to'}
            />
            <ToAccount>
                {props.transaction.toAccount.name}
            </ToAccount>
        </CashFlow>
        <TagsContainer
            maxTags={3}
            tags={props.transaction.tags}
        />
        <BigAmount>
            <FormattedAmount number={props.transaction.amount}/>
        </BigAmount>
        <ItemActions>
            <TransactionEdit
                onSave={props.onUpdate}
                transaction={props.transaction}
            />
            <TransactionDelete
                onDelete={props.onUpdate}
                transaction={props.transaction}
            />
        </ItemActions>
    </>
);
