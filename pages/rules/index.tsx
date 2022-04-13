import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';
import useSWR, {SWRConfig, useSWRConfig} from 'swr';
import {authenticated} from '../../lib/auth/ss-auth';
import {getUser} from '../../lib/auth/ss-user';
import {RuleCreate} from '../../lib/components/rules/rule-create';
import {RuleItem} from '../../lib/components/rules/rule-item';
import {EmptyDataMessage} from '../../lib/components/shared/empty-data-message';
import {PageTitle} from '../../lib/components/shared/page-title';
import {swrKeys} from '../../lib/components/swr-keys';
import {AccordionGroup} from '../../lib/design/accordion-group';
import {Grid} from '../../lib/design/grid';
import {doGet} from '../../lib/helpers/fetch';
import {getRules} from '../../lib/services/rules';
import {AnyObject} from '../../types/object';
import {WithRules} from '../../types/rules';

type Props = {
    fallback: AnyObject
}

const Rules: FunctionComponent<Props> = ({fallback}) => {
    const {data, error} = useSWR<WithRules>(swrKeys.rules, doGet);
    const {mutate} = useSWRConfig();

    const refresh = () => mutate(swrKeys.rules);

    return (
        <SWRConfig value={{fallback}}>
            <PageTitle title={'Rules'}/>
            <RuleCreate onCreate={refresh}/>
            {error && 'Failed to load rules'}
            <EmptyDataMessage length={data?.rules?.length}>
                <AccordionGroup>
                    <Grid
                        items={data?.rules}
                        keyFn={(rule) => rule.id}
                    >
                        {(rule) => (
                            <RuleItem
                                onUpdate={refresh}
                                rule={rule}
                            />
                        )}
                    </Grid>
                </AccordionGroup>
            </EmptyDataMessage>
        </SWRConfig>
    );
};

export default Rules;

export const getServerSideProps: GetServerSideProps = authenticated<Props>(async (context) => {
    const {id} = await getUser(context);
    const rules = await getRules({id});

    return {
        props: {
            fallback: {
                [swrKeys.rules]: rules
            }
        }
    };
});
