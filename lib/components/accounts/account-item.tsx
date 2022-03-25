import {FunctionComponent} from 'react';
import {Account} from '../../../types/accounts';
import {Badge} from '../../design/badge';
import {FormattedAmount} from '../../design/formatted-amount';
import {Icon} from '../../design/icon';
import {BigAmount} from '../shared/big-amount';
import {ItemDescription} from '../shared/item-description';
import {AccountUpdate} from './account-update';

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
                <AccountUpdate
                    account={props.account}
                    onUpdate={props.onUpdate}
                />
            </>
        ) : (
            <>
                <span/>
                <span/>
            </>
        )}
    </>
);
