import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../../lib/auth/ss-auth';
import {getUser} from '../../../lib/auth/ss-user';
import {CreateForm} from '../../../lib/components/categories/create-form';
import {Nav} from '../../../lib/components/categories/nav';
import {doDelete, doGet} from '../../../lib/fetch';
import {getTags} from '../../../lib/services/categories/tags';
import {WithTags} from '../../../types/category';
import {AnyObject} from '../../../types/object';

type Props = {
    fallback: AnyObject
}

type Tags = FunctionComponent<Props>

const key = '/api/categories/tags';

const Tags: Tags = ({fallback}) => {
    const {data, error} = useSWR<WithTags>(key, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(key);

    const deleteTag = async (id: number) => {
        await doDelete(key, {id});
        await refresh();
    };

    return (
        <SWRConfig value={{fallback}}>
            <Nav/>
            <CreateForm onCreate={refresh}/>
            {error && 'Failed to load tags'}
            {data && data.tags.map((tag) => (
                <div key={tag.id}>
                    #{tag.name}
                    <button onClick={() => deleteTag(tag.id)}>Delete</button>
                </div>
            ))}
        </SWRConfig>
    );
};

export default Tags;

export const getServerSideProps: GetServerSideProps = authenticated<Props>(async (context) => {
    const {id} = await getUser(context);
    const tags = await getTags({id});

    return {
        props: {
            fallback: {
                [key]: tags
            }
        }
    };
});
