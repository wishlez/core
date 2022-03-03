import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {Nav} from '../../lib/components/categories/nav';
import {TagCreate} from '../../lib/components/categories/tag-create';
import {TagItem} from '../../lib/components/categories/tag-item';
import {PageTitle} from '../../lib/components/shared/page-title';
import {swrKeys} from '../../lib/components/swr-keys';
import {Box} from '../../lib/design/box';
import {doGet} from '../../lib/helpers/fetch';
import {getTags} from '../../lib/services/categories/tags';
import {WithTags} from '../../types/categories';
import {AnyObject} from '../../types/object';

type Props = {
    fallback: AnyObject
}

const Container = styled(Box)`
    display: flex;
    flex-wrap: wrap;
`;

const Tags: FunctionComponent<Props> = ({fallback}) => {
    const {data, error} = useSWR<WithTags>(swrKeys.categories.tags, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(swrKeys.categories.tags);

    return (
        <SWRConfig value={{fallback}}>
            <PageTitle title={'Categories - Tags'}/>
            <Nav/>
            <TagCreate onCreate={refresh}/>
            {error && 'Failed to load tags'}
            <Container>
                {data && data.tags.map((tag) => (
                    <TagItem
                        key={tag.id}
                        onUpdate={refresh}
                        tag={tag}
                    />
                ))}
            </Container>
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
                [swrKeys.categories.tags]: tags
            }
        }
    };
});
