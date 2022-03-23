import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {AccountCreate} from '../../lib/components/accounts/account-create';
import {AccountItem} from '../../lib/components/accounts/account-item';
import {PageTitle} from '../../lib/components/shared/page-title';
import {swrKeys} from '../../lib/components/swr-keys';
import {Grid} from '../../lib/design/grid';
import {GridHeader} from '../../lib/design/grid-header';
import {doGet} from '../../lib/helpers/fetch';
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
            <PageTitle title={'Accounts'}/>
            <AccountCreate onCreate={refresh}/>
            {error && 'Failed to load accounts'}
            <Grid
                gridTemplateColumns={'auto 1fr 8em auto'}
                header={(
                    <>
                        <GridHeader>
                            {'Name'}
                        </GridHeader>
                        <GridHeader>
                            {'Type'}
                        </GridHeader>
                        <GridHeader align={'end'}>
                            {'Balance'}
                        </GridHeader>
                        <GridHeader/>
                    </>
                )}
                items={data?.accounts}
                keyFn={(account) => account.id}
            >
                {(account) => (
                    <AccountItem
                        account={account}
                        onUpdate={refresh}
                    />
                )}
            </Grid>
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
