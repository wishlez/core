import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent, useEffect} from 'react';
import {useAuth} from '../lib/auth/auth';
import {unauthenticated} from '../lib/auth/ss-auth';

const Home: FunctionComponent = () => {
    const {status} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/dashboard');
        }
    }, [status, router]);

    return (
        <>
            Welcome to Wishlez!
            {status === 'unauthenticated' && <button
                onClick={() => signIn()}
            >Sign In!</button>}
        </>
    );
};

export default Home;

export const getServerSideProps = unauthenticated();
