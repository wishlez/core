import {FunctionComponent, useState} from 'react';
import {Transaction, TransactionRequest} from '../../../types/transactions';
import {getAdjustedTags, toTagIds} from '../../helpers/tags';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPut} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';
import {TransactionForm} from './transaction-form';

type Props = {
    transaction: Transaction
    onSave: () => void
}

export const TransactionEdit: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const existingTags = toTagIds(props.transaction.tags);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const saveTransaction = async (transaction: TransactionRequest) => {
        await doPut(swrKeys.transactions, {
            ...props.transaction,
            ...transaction,
            tags: getAdjustedTags(existingTags, transaction.tags)
        });

        closeModal();
        props.onSave();
    };

    return (
        <>
            <Button variant="text" color="secondary" size="compact" onClick={openModal}>
                <Icon type="create"/>
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <TransactionForm
                    onSubmit={saveTransaction}
                    onCancel={closeModal}
                    transaction={props.transaction}
                    title={`Edit transaction #${props.transaction.id}`}
                />
            </Modal>
        </>
    );
};
