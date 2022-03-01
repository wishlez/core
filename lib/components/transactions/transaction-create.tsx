import {FunctionComponent, useState} from 'react';
import {TransactionRequest} from '../../../types/transactions';
import {Fab} from '../../design/fab';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPost} from '../../fetch';
import {TransactionForm} from './transaction-form';

type Props = {
    onCreate: () => void
}

export const TransactionCreate: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const createTransaction = async (transaction: TransactionRequest) => {
        await doPost('/api/transactions', transaction);

        closeModal();
        props.onCreate();
    };

    return (
        <>
            <Fab onClick={openModal}>
                <Icon type="add"/>
            </Fab>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <TransactionForm
                    onSubmit={createTransaction}
                    onCancel={closeModal}
                    title={'Create new transaction'}
                />
            </Modal>
        </>
    );
};
