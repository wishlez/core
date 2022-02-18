import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {AccountCreateForm} from '../../lib/components/accounts/account-create-form';
import {AccountItem} from '../../lib/components/accounts/account-item';
import {swrKeys} from '../../lib/components/swr-keys';
import {doGet} from '../../lib/fetch';
import {getAccounts} from '../../lib/services/accounts';
import {WithAccounts} from '../../types/accounts';
import {AnyObject} from '../../types/object';

type Props = {
    fallback: AnyObject
}

const Accounts: FunctionComponent<Props> = ({fallback}) => {
    const {data, error} = useSWR<WithAccounts>(swrKeys.accounts, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(swrKeys.accounts);

    return (
        <SWRConfig value={{fallback}}>
            <AccountCreateForm onCreate={refresh}/>
            {error && 'Failed to load accounts'}
            {data && data.accounts.map((account) => (
                <AccountItem
                    account={account}
                    key={account.id}
                    onEdit={refresh}
                    onDelete={refresh}
                />
            ))}
        </SWRConfig>
    );
};

export default Accounts;

export const getServerSideProps: GetServerSideProps = authenticated<Props>(async (context) => {
    const {id} = await getUser(context);
    const accounts = await getAccounts({id});

    return {
        props: {
            fallback: {
                [swrKeys.accounts]: accounts
            }
        }
    };
});
