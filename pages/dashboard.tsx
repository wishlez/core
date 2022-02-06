import {signOut} from 'next-auth/react';
import {FunctionComponent} from 'react';
import {authenticated} from '../lib/auth/ss-auth';
import {useUser} from '../lib/contexts/user';

const Dashboard: FunctionComponent = () => {
    const user = useUser();

    return (
        <>
            Hello, {user.name}!
            <button onClick={() => signOut()}>Sign Out</button>
        </>
    );
};

export default Dashboard;

export const getServerSideProps = authenticated();
