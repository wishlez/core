import {FunctionComponent} from 'react';
import {authenticated} from '../lib/auth/ss-auth';
import {PageTitle} from '../lib/components/shared/page-title';

const Dashboard: FunctionComponent = () => (
    <>
        <PageTitle title={'Dashboard'}/>
        {'Welcome to Wishlez!'}
    </>
);

export default Dashboard;

export const getServerSideProps = authenticated();
