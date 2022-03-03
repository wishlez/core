import {FunctionComponent, useState} from 'react';
import {Transaction, TransactionRequest} from '../../../types/transactions';
import {Button} from '../../design/button';
import {Icon} from '../../design/icon';
import {Modal} from '../../design/modal';
import {doPut} from '../../helpers/fetch';
import {getAdjustedTags, toTagIds} from '../../helpers/tags';
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
                <TransactionForm
                    onCancel={closeModal}
                    onSubmit={saveTransaction}
                    title={`Edit transaction #${props.transaction.id}`}
                    transaction={props.transaction}
                />
            </Modal>
        </>
    );
};
