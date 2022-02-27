import {FunctionComponent} from 'react';
import {TransactionRequest} from '../../../types/transactions';
import {doPost} from '../../fetch';
import {TransactionForm} from './transaction-form';

type Props = {
    onCreate: () => void
}

export const TransactionCreate: FunctionComponent<Props> = (props) => {
    const createTransaction = async (transaction: TransactionRequest) => {
        await doPost('/api/transactions', transaction);

        props.onCreate();
    };

    return (
        <TransactionForm
            clearFormOnSave
            onSubmit={createTransaction}
        />
    );
};
