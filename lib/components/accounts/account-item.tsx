import {FunctionComponent} from 'react';
import {Account} from '../../../types/accounts';
import {AccountDelete} from './account-delete';
import {AccountEdit} from './account-edit';

type Props = {
    account: Account
    onUpdate: () => void
}

export const AccountItem: FunctionComponent<Props> = (props) => (
    <div>
        {props.account.name}
        {!props.account.builtIn && (
            <>
                <AccountEdit account={props.account} onSave={props.onUpdate}/>
                <AccountDelete account={props.account} onDelete={props.onUpdate}/>
            </>
        )}
    </div>
);
