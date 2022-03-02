import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Account} from '../../../types/accounts';
import {Badge} from '../../design/badge';
import {Card} from '../../design/card';
import {FormattedAmount} from '../../design/formatted-amount';
import {Icon} from '../../design/icon';
import {BigAmount} from '../shared/big-amount';
import {Details1, Details2} from '../shared/details-column';
import {ItemActions} from '../shared/item-actions';
import {ItemDescription} from '../shared/item-description';
import {TagsContainer} from '../shared/tags-container';
import {AccountDelete} from './account-delete';
import {AccountEdit} from './account-edit';

type Props = {
    account: Account
    onUpdate: () => void
}

const Container = styled(Card)`
    margin: var(--grid-gap);

    @media (min-width: 960px) {
        display: flex;
        justify-content: space-between;
    }
`;

export const AccountItem: FunctionComponent<Props> = (props) => (
    <Container>
        <Details1>
            <ItemDescription>
                {props.account.name}
            </ItemDescription>
            <TagsContainer>
                {props.account.builtIn && (
                    <Badge variant="outlined" color="danger" size="compact">
                        <Icon type={'lock'} size={'in-text'}/>
                        Built-in
                    </Badge>
                )}
                <Badge variant="outlined" color="secondary" size="compact">
                    {props.account.accountType.type}
                </Badge>
            </TagsContainer>
        </Details1>
        <Details2>
            {!props.account.builtIn && (
                <>
                    <BigAmount>
                        <FormattedAmount number={0}/>
                    </BigAmount>
                    <ItemActions>
                        <AccountEdit account={props.account} onSave={props.onUpdate}/>
                        <AccountDelete account={props.account} onDelete={props.onUpdate}/>
                    </ItemActions>
                </>
            )}
        </Details2>
    </Container>
);
