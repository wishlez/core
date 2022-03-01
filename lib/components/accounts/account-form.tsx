import {FormEvent, FunctionComponent, useRef} from 'react';
import useSWR from 'swr';
import {WithAccountTypes} from '../../../types/account-types';
import {Account, AccountRequest} from '../../../types/accounts';
import {Button} from '../../design/button';
import {Form} from '../../design/form';
import {FormActions} from '../../design/form-actions';
import {FormFields} from '../../design/form-fields';
import {FormTitle} from '../../design/form-title';
import {Input} from '../../design/input';
import {SelectSingle} from '../../design/select-single';
import {doGet} from '../../fetch';
import {swrKeys} from '../swr-keys';

type Props = {
    onCancel?: () => void
    onSubmit: (account: AccountRequest) => void
    account?: Account
    title: string
}

export const AccountForm: FunctionComponent<Props> = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const initialRef = useRef<HTMLInputElement>();
    const maximumRef = useRef<HTMLInputElement>();
    const accountTypeRef = useRef<HTMLSelectElement>();
    const {data: {accountTypes} = {accountTypes: []}} = useSWR<WithAccountTypes>(swrKeys.accountTypes, doGet);

    const createAccount = async (event: FormEvent) => {
        event.preventDefault();

        await props.onSubmit({
            name: nameRef.current.value,
            openingBalance: Number(initialRef.current.value) || 0,
            maximumAmountOwed: Number(maximumRef.current.value) || 0,
            accountTypeId: Number(accountTypeRef.current.value)
        });
    };

    const cancel = () => {
        props.onCancel?.();
    };

    return (
        <>
            <Form onSubmit={createAccount}>
                <FormTitle>{props.title}</FormTitle>
                <FormFields>
                    <Input
                        ref={nameRef}
                        type="text"
                        placeholder="Enter account name"
                        autoFocus
                        required
                        defaultValue={props.account?.name}
                    />
                    <Input
                        ref={initialRef}
                        type="number"
                        placeholder="Enter initial balance"
                        step={0.01}
                        min={0}
                        defaultValue={props.account?.openingBalance}
                        note="The current balance after which the transactions are tracked. (Optional)"
                    />
                    <Input
                        ref={maximumRef}
                        type="number"
                        placeholder="Enter maximum limit"
                        step={0.01}
                        min={0}
                        defaultValue={props.account?.maximumAmountOwed}
                        note="Maximum amount e.g. credit line, or total loan owed. (Optional)"
                    />
                    <SelectSingle
                        label="Account type"
                        ref={accountTypeRef}
                        defaultValue={props.account?.accountTypeId}
                    >
                        {accountTypes.map(({id, type}) => (
                            <option key={id} value={id}>{type}</option>
                        ))}
                    </SelectSingle>
                </FormFields>
                <FormActions>
                    <Button variant="filled" color="primary">Save</Button>
                    <Button variant="outlined" color="secondary" type="reset" onClick={cancel}>Cancel</Button>
                </FormActions>
            </Form>
        </>
    );
};
