import {FunctionComponent} from 'react';
import {Transaction} from '../../../types/transactions';
import {FormattedAmount} from '../../design/formatted-amount';
import {FormattedDate} from '../../design/formatted-date';
import {Icon} from '../../design/icon';
import {BigAmount} from '../shared/big-amount';
import {ItemDescription} from '../shared/item-description';
import {TagsContainer} from '../shared/tags-container';
import {CashFlow, FromAccount, ToAccount} from './transaction-item-styled';
import {TransactionUpdate} from './transaction-update';

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
        <TransactionUpdate
            onUpdate={props.onUpdate}
            transaction={props.transaction}
        />
    </>
);
