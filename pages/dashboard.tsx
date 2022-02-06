import {signOut} from 'next-auth/react';
import {authenticated} from '../lib/auth/ss-auth';
import {useUser} from '../lib/contexts/user';

export default () => {
    const user = useUser();

    return (
        <>
            Hello, {user.name}!
            <button onClick={() => signOut()}>Sign Out</button>
        </>
    );
};

export const getServerSideProps = authenticated();
