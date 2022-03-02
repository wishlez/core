import {FunctionComponent, useState} from 'react';
import {Account, AccountRequest} from '../../../types/accounts';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPut} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';
import {AccountForm} from './account-form';

type Props = {
    account: Account
    onSave: () => void
}

export const AccountEdit: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const saveAccount = async (account: AccountRequest) => {
        await doPut(swrKeys.accounts, {
            ...props.account,
            ...account
        });

        closeModal();
        props.onSave();
    };

    return (
        <>
            <Button
                color={'secondary'}
                onClick={openModal}
                size={'compact'}
                variant={'text'}
            >
                <Icon type={'create'}/>
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
            >
                <AccountForm
                    account={props.account}
                    onCancel={closeModal}
                    onSubmit={saveAccount}
                    title={`Edit account #${props.account.id}`}
                />
            </Modal>
        </>
    );
};
