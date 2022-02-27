import {FormEvent, FunctionComponent, useRef} from 'react';
import useSWR from 'swr';
import {WithAccounts} from '../../../types/accounts';
import {WithTags} from '../../../types/categories';
import {Transaction, TransactionRequest} from '../../../types/transactions';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Input} from '../../design/input';
import {SelectMultiple} from '../../design/select-multiple';
import {SelectSingle} from '../../design/select-single';
import {doGet} from '../../fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    clearFormOnSave?: true
    onCancel?: () => void
    onSubmit?: (transaction: TransactionRequest) => void
    transaction?: Transaction
    title: string
}

export const TransactionForm: FunctionComponent<Props> = (props) => {
    const descriptionRef = useRef<HTMLInputElement>();
    const dateRef = useRef<HTMLInputElement>();
    const amountRef = useRef<HTMLInputElement>();
    const fromAccountRef = useRef<HTMLSelectElement>();
    const toAccountRef = useRef<HTMLSelectElement>();
    const tagsRef = useRef<HTMLSelectElement>();
    const {data: {accounts} = {accounts: []}} = useSWR<WithAccounts>(swrKeys.accounts, doGet);
    const {data: {tags} = {tags: []}} = useSWR<WithTags>(swrKeys.categories.tags, doGet);

    const existingTags = props.transaction?.tags.map((transactionTag) => transactionTag.tagId.toString());

    const clearForm = () => {
        if (props.clearFormOnSave) {
            descriptionRef.current.value = '';
            dateRef.current.value = '';
            amountRef.current.value = '';
            fromAccountRef.current.value = '';
            toAccountRef.current.value = '';
            tagsRef.current.value = '';

            descriptionRef.current?.focus();
        }
    };

    const createTransaction = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit?.({
            description: descriptionRef.current.value,
            date: new Date(dateRef.current.value),
            amount: Number(amountRef.current.value),
            fromAccountId: Number(fromAccountRef.current.value),
            toAccountId: Number(toAccountRef.current.value),
            tags: Array.from(tagsRef.current.selectedOptions, (option) => Number(option.value))
        });

        clearForm();
    };

    const cancel = () => {
        clearForm();
        props.onCancel?.();
    };

    return (
        <Form onSubmit={createTransaction}>
            <FormTitle>{props.title}</FormTitle>
            <FormFields>
                <Input
                    type="text"
                    ref={descriptionRef}
                    placeholder="Describe transaction"
                    autoFocus
                    required
                    defaultValue={props.transaction?.description}
                />
                <Input
                    type="date"
                    ref={dateRef}
                    required
                    defaultValue={props.transaction?.date.toString().substring(0, 10)}
                />
                <Input
                    type="number"
                    ref={amountRef}
                    placeholder="Enter amount"
                    step={0.01}
                    min={0.01}
                    required
                    defaultValue={props.transaction?.amount}
                />
                <SelectSingle
                    label="From account"
                    ref={fromAccountRef}
                    defaultValue={props.transaction?.fromAccountId}
                    required
                >
                    {accounts.map(({id, name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </SelectSingle>
                <SelectSingle
                    label="To account"
                    ref={toAccountRef}
                    defaultValue={props.transaction?.toAccountId}
                    required
                >
                    {accounts.map(({id, name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </SelectSingle>
                <SelectMultiple
                    label="Select categories"
                    ref={tagsRef}
                    multiple
                    defaultValue={existingTags}
                    placeholder="Start typing to show categories"
                >
                    {tags.map(({id, name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </SelectMultiple>
            </FormFields>
            <FormActions>
                <Button variant="filled" color="primary">Save</Button>
                <Button variant="outlined" color="secondary" type="reset" onClick={cancel}>Cancel</Button>
            </FormActions>
        </Form>
    );
};
