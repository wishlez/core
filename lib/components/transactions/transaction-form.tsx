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
import {toSelectedIds} from '../../design/helpers/selected-ids';
import {Input} from '../../design/input';
import {SelectMultiple} from '../../design/select-multiple';
import {SelectSingle} from '../../design/select-single';
import {doGet} from '../../helpers/fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    onCancel?: () => void
    onSubmit: (transaction: TransactionRequest) => void
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

    const createTransaction = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
            amount: Number(amountRef.current.value),
            date: new Date(dateRef.current.value),
            description: descriptionRef.current.value,
            fromAccountId: Number(fromAccountRef.current.value),
            tags: toSelectedIds(tagsRef.current.selectedOptions),
            toAccountId: Number(toAccountRef.current.value)
        });
    };

    const cancel = () => {
        props.onCancel?.();
    };

    return (
        <Form onSubmit={createTransaction}>
            <FormTitle>
                {props.title}
            </FormTitle>
            <FormFields>
                <Input
                    autoFocus
                    defaultValue={props.transaction?.description}
                    placeholder={'Describe transaction'}
                    ref={descriptionRef}
                    required
                    type={'text'}
                />
                <Input
                    defaultValue={props.transaction?.date.toString().substring(0, 10)}
                    ref={dateRef}
                    required
                    type={'date'}
                />
                <Input
                    defaultValue={props.transaction?.amount}
                    min={0.01}
                    placeholder={'Enter amount'}
                    ref={amountRef}
                    required
                    step={0.01}
                    type={'number'}
                />
                <SelectSingle
                    defaultValue={props.transaction?.fromAccountId}
                    label={'From account'}
                    ref={fromAccountRef}
                    required
                >
                    {accounts.map(({id, name}) => (
                        <option
                            key={id}
                            value={id}
                        >
                            {name}
                        </option>
                    ))}
                </SelectSingle>
                <SelectSingle
                    defaultValue={props.transaction?.toAccountId}
                    label={'To account'}
                    ref={toAccountRef}
                    required
                >
                    {accounts.map(({id, name}) => (
                        <option
                            key={id}
                            value={id}
                        >
                            {name}
                        </option>
                    ))}
                </SelectSingle>
                <SelectMultiple
                    defaultValue={existingTags}
                    label={'Select categories'}
                    multiple
                    placeholder={'Start typing to show categories'}
                    ref={tagsRef}
                >
                    {tags.map(({id, name}) => (
                        <option
                            key={id}
                            value={id}
                        >
                            {name}
                        </option>
                    ))}
                </SelectMultiple>
            </FormFields>
            <FormActions>
                <Button
                    color={'primary'}
                    variant={'filled'}
                >
                    {'Save'}
                </Button>
                <Button
                    color={'secondary'}
                    onClick={cancel}
                    type={'reset'}
                    variant={'outlined'}
                >
                    {'Cancel'}
                </Button>
            </FormActions>
        </Form>
    );
};
