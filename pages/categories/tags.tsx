import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {TagCreateForm} from '../../lib/components/categories/tag-create-form';
import {Nav} from '../../lib/components/categories/nav';
import {TagItem} from '../../lib/components/categories/tag-item';
import {doGet} from '../../lib/fetch';
import {getTags} from '../../lib/services/categories/tags';
import {WithTags} from '../../types/categories';
import {AnyObject} from '../../types/object';

type Props = {
    fallback: AnyObject
}

type Tags = FunctionComponent<Props>

const swrKey = '/api/categories/tags';

const Tags: Tags = ({fallback}) => {
    const {data, error} = useSWR<WithTags>(swrKey, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(swrKey);

    return (
        <SWRConfig value={{fallback}}>
            <Nav/>
            <TagCreateForm onCreate={refresh}/>
            {error && 'Failed to load tags'}
            {data && data.tags.map((tag) => (
                <TagItem
                    tag={tag}
                    key={tag.id}
                    onEdit={refresh}
                    onDelete={refresh}
                    swrKey={swrKey}
                />
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
                [swrKey]: tags
            }
        }
    };
});
