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
import {doGet} from '../../helpers/fetch';
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
            accountTypeId: Number(accountTypeRef.current.value),
            maximumAmountOwed: Number(maximumRef.current.value) || 0,
            name: nameRef.current.value,
            openingBalance: Number(initialRef.current.value) || 0
        });
    };

    const cancel = () => {
        props.onCancel?.();
    };

    return (
        <Form onSubmit={createAccount}>
            <FormTitle>
                {props.title}
            </FormTitle>
            <FormFields>
                <Input
                    autoFocus
                    defaultValue={props.account?.name}
                    placeholder={'Enter account name'}
                    ref={nameRef}
                    required
                    type={'text'}
                />
                <Input
                    defaultValue={props.account?.openingBalance}
                    min={0}
                    note={'The current balance after which the transactions are tracked. (Optional)'}
                    placeholder={'Enter initial balance'}
                    ref={initialRef}
                    step={0.01}
                    type={'number'}
                />
                <Input
                    defaultValue={props.account?.maximumAmountOwed}
                    min={0}
                    note={'Maximum amount e.g. credit line, or total loan owed. (Optional)'}
                    placeholder={'Enter maximum limit'}
                    ref={maximumRef}
                    step={0.01}
                    type={'number'}
                />
                <SelectSingle
                    defaultValue={props.account?.accountTypeId}
                    label={'Account type'}
                    ref={accountTypeRef}
                >
                    {accountTypes.map(({id, type}) => (
                        <option
                            key={id}
                            value={id}
                        >
                            {type}
                        </option>
                    ))}
                </SelectSingle>
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
