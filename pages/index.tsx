import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useAuth} from '../lib/auth/auth';
import {unauthenticated} from '../lib/auth/ss-auth';

export default () => {
    const {status} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [status]);

    return (
        <>
            Welcome to Wishlez!
            {status === 'unauthenticated' && <button
                onClick={() => signIn()}
            >Sign In!</button>}
        </>
    );
};

export const getServerSideProps = unauthenticated();
