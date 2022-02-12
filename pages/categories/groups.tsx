import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {GroupCreateForm} from '../../lib/components/categories/group-create-form';
import {GroupItem} from '../../lib/components/categories/group-item';
import {Nav} from '../../lib/components/categories/nav';
import {swrKeys} from '../../lib/components/swr-keys';
import {doGet} from '../../lib/fetch';
import {getGroups} from '../../lib/services/categories/groups';
import {WithGroups} from '../../types/categories';
import {AnyObject} from '../../types/object';

type Props = {
    fallback: AnyObject
}

type Groups = FunctionComponent<Props>

const Groups: Groups = ({fallback}) => {
    const {data, error} = useSWR<WithGroups>(swrKeys.categories.groups, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(swrKeys.categories.groups);

    return (
        <SWRConfig value={{fallback}}>
            <Nav/>
            <GroupCreateForm onCreate={refresh}/>
            {error && 'Failed to load groups'}
            {data && data.groups.map((group) => (
                <GroupItem
                    group={group}
                    key={group.id}
                    onEdit={refresh}
                    onDelete={refresh}
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
