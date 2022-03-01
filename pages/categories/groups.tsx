import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {GroupCreate} from '../../lib/components/categories/group-create';
import {GroupItem} from '../../lib/components/categories/group-item';
import {Nav} from '../../lib/components/categories/nav';
import {PageTitle} from '../../lib/components/page-title';
import {swrKeys} from '../../lib/components/swr-keys';
import {doGet} from '../../lib/fetch';
import {getGroups} from '../../lib/services/categories/groups';
import {WithTagGroups} from '../../types/categories';
import {AnyObject} from '../../types/object';

type Props = {
    fallback: AnyObject
}

const Groups: FunctionComponent<Props> = ({fallback}) => {
    const {data, error} = useSWR<WithTagGroups>(swrKeys.categories.groups, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(swrKeys.categories.groups);

    return (
        <SWRConfig value={{fallback}}>
            <PageTitle title="Categories - Groups"/>
            <Nav/>
            <GroupCreate onCreate={refresh}/>
            {error && 'Failed to load groups'}
            {data && data.groups.map((group) => (
                <GroupItem
                    group={group}
                    key={group.id}
                    onUpdate={refresh}
                />
            ))}
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
