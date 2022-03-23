import {FunctionComponent} from 'react';
import {Transaction} from '../../../types/transactions';
import {Badge} from '../../design/badge';
import {FormattedAmount} from '../../design/formatted-amount';
import {FormattedDate} from '../../design/formatted-date';
import {Icon} from '../../design/icon';
import {BigAmount} from '../shared/big-amount';
import {ItemActions} from '../shared/item-actions';
import {TagsContainer} from '../shared/tags-container';
import {TransactionDelete} from './transaction-delete';
import {TransactionEdit} from './transaction-edit';
import {CashFlow, Description, FromAccount, ToAccount} from './transaction-item-styled';

type Props = {
    transaction: Transaction
    onUpdate: () => void
}

const maxTags = 3;

export const TransactionItem: FunctionComponent<Props> = (props) => (
    <>
        <Description>
            {props.transaction.description}
        </Description>
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
        <TagsContainer>
            {props.transaction.tags.slice(0, maxTags).map(({tag}) => (
                <Badge
                    key={tag.id}
                    size={'compact'}
                >
                    {tag.name}
                </Badge>
            ))}
            {props.transaction.tags.length > maxTags && (
                <>
                    {'...'}
                </>
            )}
        </TagsContainer>
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
