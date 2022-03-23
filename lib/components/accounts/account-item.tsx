import {FunctionComponent} from 'react';
import {Account} from '../../../types/accounts';
import {Badge} from '../../design/badge';
import {FormattedAmount} from '../../design/formatted-amount';
import {Icon} from '../../design/icon';
import {BigAmount} from '../shared/big-amount';
import {ItemActions} from '../shared/item-actions';
import {ItemDescription} from '../shared/item-description';
import {AccountDelete} from './account-delete';
import {AccountEdit} from './account-edit';

type Props = {
    account: Account
    onUpdate: () => void
}

export const AccountItem: FunctionComponent<Props> = (props) => (
    <>
        <ItemDescription>
            {props.account.name}
            {props.account.builtIn && (
                <Badge
                    color={'secondary'}
                    size={'compact'}
                    title={'Built in'}
                    variant={'text'}
                >
                    <Icon
                        size={'in-text'}
                        type={'locked'}
                    />
                </Badge>
            )}
        </ItemDescription>
        <div>
            {props.account.accountType.type}
        </div>
        {!props.account.builtIn ? (
            <>
                <BigAmount>
                    <FormattedAmount number={0}/>
                </BigAmount>
                <ItemActions>
                    <AccountEdit
                        account={props.account}
                        onSave={props.onUpdate}
                    />
                    <AccountDelete
                        account={props.account}
                        onDelete={props.onUpdate}
                    />
                </ItemActions>
            </>
        ) : (
            <>
                <span/>
                <span/>
            </>
        )}
    </>
);
