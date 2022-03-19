import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {GroupCreate} from '../../lib/components/categories/group-create';
import {GroupItem} from '../../lib/components/categories/group-item';
import {PageTitle} from '../../lib/components/shared/page-title';
import {swrKeys} from '../../lib/components/swr-keys';
import {Grid} from '../../lib/design/grid';
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
            <Grid
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
