import {FunctionComponent, useState} from 'react';
import {Account} from '../../../types/accounts';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {doDelete} from '../../helpers/fetch';
import {ConfirmationModal} from '../confirmation-modal';
import {swrKeys} from '../swr-keys';

type Props = {
    account: Account
    onDelete: () => void
}

export const AccountDelete: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteAccount = async () => {
        await doDelete(swrKeys.accounts, {id: props.account.id});

        closeModal();
        props.onDelete();
    };

    return (
        <>
            <Button variant="text" color="danger" size="compact" onClick={openModal}>
                <Icon type="delete"/>
            </Button>
            <ConfirmationModal
                title={`Delete account #${props.account.id}`}
                isOpen={isOpen}
                onCancel={closeModal}
                onConfirm={deleteAccount}
            />
        </>
    );
};
