import {FunctionComponent} from 'react';
import {authenticated} from '../lib/auth/ss-auth';

const Dashboard: FunctionComponent = () => (
    <>
        Welcome to Wishlez!
    </>
);

export default Dashboard;

export const getServerSideProps = authenticated();
