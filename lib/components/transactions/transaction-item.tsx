import {FunctionComponent} from 'react';
import {Transaction} from '../../../types/transactions';
import {Badge} from '../../design/badge';
import {FormattedAmount} from '../../design/formatted-amount';
import {FormattedDate} from '../../design/formatted-date';
import {Icon} from '../../design/icon';
import {ItemActions} from '../shared/item-actions';
import {BigAmount} from '../shared/big-amount';
import {Details1, Details2} from '../shared/details-column';
import {TagsContainer} from '../shared/tags-container';
import {ItemDescription} from '../shared/item-description';
import {TransactionDelete} from './transaction-delete';
import {TransactionEdit} from './transaction-edit';
import {CashFlow, Container, OnDate, TitleContainer} from './transaction-item-styled';

type Props = {
    transaction: Transaction
    onUpdate: () => void
}

export const TransactionItem: FunctionComponent<Props> = (props) => (
    <Container>
        <Details1>
            <TitleContainer>
                <ItemDescription>
                    {props.transaction.description}
                </ItemDescription>
                <OnDate>
                    on <FormattedDate dateTime={props.transaction.date}/>
                </OnDate>
            </TitleContainer>
            <CashFlow>
                {props.transaction.fromAccount.name}
                <Icon type={'east'} size={'in-text'}/>
                {props.transaction.toAccount.name}
            </CashFlow>
            {Boolean(props.transaction.tags.length) && (
                <TagsContainer>
                    {props.transaction.tags.map(({tag}) => (
                        <Badge key={tag.id}>
                            {tag.name}
                        </Badge>
                    ))}
                </TagsContainer>
            )}
        </Details1>
        <Details2>
            <BigAmount>
                <FormattedAmount number={props.transaction.amount}/>
            </BigAmount>
            <ItemActions>
                <TransactionEdit transaction={props.transaction} onSave={props.onUpdate}/>
                <TransactionDelete transaction={props.transaction} onDelete={props.onUpdate}/>
            </ItemActions>
        </Details2>
    </Container>
);
