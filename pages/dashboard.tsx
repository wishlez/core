import {FunctionComponent} from 'react';
import {authenticated} from '../lib/auth/ss-auth';

type Dashboard = FunctionComponent;

const Dashboard: Dashboard = () => (
    <>
        Welcome to Wishlez!
    </>
);

export default Dashboard;

export const getServerSideProps = authenticated();
