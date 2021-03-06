import {FunctionComponent, useState} from 'react';
import {AccountRequest} from '../../../types/accounts';
import {Fab} from '../../design/fab';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPost} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';
import {AccountForm} from './account-form';

type Props = {
    onCreate: () => void
}

export const AccountCreate: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const createAccount = async (account: AccountRequest) => {
        await doPost(swrKeys.accounts, account);

        closeModal();
        props.onCreate();
    };

    return (
        <>
            <Fab onClick={openModal}>
                <Icon type={'add'}/>
            </Fab>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
            >
                <AccountForm
                    onCancel={closeModal}
                    onSubmit={createAccount}
                    title={'Create new account'}
                />
            </Modal>
        </>
    );
};
