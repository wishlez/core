import {FunctionComponent, useState} from 'react';
import {Transaction} from '../../../types/transactions';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {doDelete} from '../../helpers/fetch';
import {ConfirmationModal} from '../confirmation-modal';
import {swrKeys} from '../swr-keys';

type Props = {
    transaction: Transaction
    onDelete: () => void
}

export const TransactionDelete: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteTransaction = async () => {
        await doDelete(swrKeys.transactions, {id: props.transaction.id});

        closeModal();
        props.onDelete();
    };

    return (
        <>
            <Button
                color={'danger'}
                onClick={openModal}
                size={'compact'}
                variant={'text'}
            >
                <Icon type={'delete'}/>
            </Button>
            <ConfirmationModal
                isOpen={isOpen}
                onCancel={closeModal}
                onConfirm={deleteTransaction}
                title={`Delete transaction #${props.transaction.id}`}
            />
        </>
    );
};
