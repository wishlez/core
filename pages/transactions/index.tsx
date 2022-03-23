import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {PageTitle} from '../../lib/components/shared/page-title';
import {swrKeys} from '../../lib/components/swr-keys';
import {TransactionCreate} from '../../lib/components/transactions/transaction-create';
import {TransactionItem} from '../../lib/components/transactions/transaction-item';
import {Grid} from '../../lib/design/grid';
import {GridHeader} from '../../lib/design/grid-header';
import {doGet} from '../../lib/helpers/fetch';
import {getTransactions} from '../../lib/services/transactions';
import {AnyObject} from '../../types/object';
import {WithTransactions} from '../../types/transactions';

type Props = {
    fallback: AnyObject
}

const Transactions: FunctionComponent<Props> = ({fallback}) => {
    const {data, error} = useSWR<WithTransactions>(swrKeys.transactions, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(swrKeys.transactions);

    return (
        <SWRConfig value={{fallback}}>
            <PageTitle title={'Transactions'}/>
            {error && 'Failed to load transactions'}
            <Grid
                gridTemplateColumns={'1fr auto 1fr auto 8em auto'}
                header={(
                    <>
                        <GridHeader>
                            {'Description'}
                        </GridHeader>
                        <GridHeader>
                            {'Date'}
                        </GridHeader>
                        <GridHeader align={'center'}>
                            {'Cash flow'}
                        </GridHeader>
                        <GridHeader>
                            {'Tags'}
                        </GridHeader>
                        <GridHeader align={'end'}>
                            {'Amount'}
                        </GridHeader>
                        <GridHeader/>
                    </>
                )}
                items={data?.transactions}
                keyFn={(transaction) => transaction.id}
            >

                {(transaction) => (
                    <TransactionItem
                        onUpdate={refresh}
                        transaction={transaction}
                    />
                )}
            </Grid>
            <TransactionCreate onCreate={refresh}/>
        </SWRConfig>
    );
};

export default Transactions;

export const getServerSideProps: GetServerSideProps = authenticated<Props>(async (context) => {
    const {id} = await getUser(context);
    const transactions = await getTransactions({id});

    return {
        props: {
            fallback: {
                [swrKeys.transactions]: transactions
            }
        }
    };
});
