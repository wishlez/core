import {FunctionComponent, useState} from 'react';
import {Transaction, TransactionRequest} from '../../../types/transactions';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon/icon';
import {Modal} from '../../design/modal';
import {doPut} from '../../fetch';
import {swrKeys} from '../swr-keys';
import {TransactionForm} from './transaction-form';

type Props = {
    transaction: Transaction
    onSave: () => void
}

export const TransactionEdit: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const existingTags = props.transaction.tags.map((transactionTag) => transactionTag.tagId);

    const saveTransaction = async (transaction: TransactionRequest) => {
        await doPut(swrKeys.transactions, {
            ...props.transaction,
            ...transaction,
            tags: {
                deleted: existingTags.filter((tag) => !transaction.tags.includes(tag)),
                added: transaction.tags.filter((tag) => !existingTags.includes(tag))
            }
        });
        setIsOpen(false);
        props.onSave();
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
