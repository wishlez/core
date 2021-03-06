import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {GroupCreate} from '../../lib/components/categories/group-create';
import {GroupItem} from '../../lib/components/categories/group-item';
import {EmptyDataMessage} from '../../lib/components/shared/empty-data-message';
import {PageTitle} from '../../lib/components/shared/page-title';
import {swrKeys} from '../../lib/components/swr-keys';
import {Grid} from '../../lib/design/grid';
import {GridHeader} from '../../lib/design/grid-header';
import {doGet} from '../../lib/helpers/fetch';
import {getGroups} from '../../lib/services/categories/groups';
import {WithGroups} from '../../types/categories';
import {AnyObject} from '../../types/object';

type Props = {
    fallback: AnyObject
}

const Groups: FunctionComponent<Props> = ({fallback}) => {
    const {data, error} = useSWR<WithGroups>(swrKeys.categories.groups, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(swrKeys.categories.groups);

    return (
        <SWRConfig value={{fallback}}>
            <PageTitle title={'Categories: Groups'}/>
            <GroupCreate onCreate={refresh}/>
            {error && 'Failed to load groups'}
            <EmptyDataMessage length={data?.groups?.length}>
                <Grid
                    gridTemplateColumns={'auto 1fr 8em auto'}
                    header={(
                        <>
                            <GridHeader>
                                {'Name'}
                            </GridHeader>
                            <GridHeader>
                                {'Tags'}
                            </GridHeader>
                            <GridHeader align={'end'}>
                                {'Budget'}
                            </GridHeader>
                            <GridHeader/>
                        </>
                    )}
                    items={data?.groups}
                    keyFn={(group) => group.id}
                >
                    {(group) => (
                        <GroupItem
                            group={group}
                            onUpdate={refresh}
                        />
                    )}
                </Grid>
            </EmptyDataMessage>
        </SWRConfig>
    );
};

export default Groups;

export const getServerSideProps: GetServerSideProps = authenticated<Props>(async (context) => {
    const {id} = await getUser(context);
    const groups = await getGroups({id});

    return {
        props: {
            fallback: {
                [swrKeys.categories.groups]: groups
            }
        }
    };
});
