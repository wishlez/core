import {FunctionComponent} from 'react';
import {Transaction} from '../../../types/transactions';
import {Badge} from '../../design/badge';
import {FormattedAmount} from '../../design/formatted-amount';
import {FormattedDate} from '../../design/formatted-date';
import {Icon} from '../../design/icon';
import {TagsContainer} from '../shared/tags-container';
import {ItemDescription} from '../shared/item-description';
import {TransactionDelete} from './transaction-delete';
import {TransactionEdit} from './transaction-edit';
import {Actions, BigAmount, CashFlow, Container, Details1, Details2, OnDate, TitleContainer} from './transaction-item-styled';

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
            <Actions>
                <TransactionEdit transaction={props.transaction} onSave={props.onUpdate}/>
                <TransactionDelete transaction={props.transaction} onDelete={props.onUpdate}/>
            </Actions>
        </Details2>
    </Container>
);
