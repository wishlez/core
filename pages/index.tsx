import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent, useEffect} from 'react';
import {useAuth} from '../lib/auth/cs-auth';
import {unauthenticated} from '../lib/auth/ss-auth';
import {PageTitle} from '../lib/components/page-title';

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
            <PageTitle title={'Welcome'}/>
            {'Welcome to Wishlez!'}
            {status === 'unauthenticated' && (
                <button onClick={() => signIn()}>
                    {'Sign In!'}
                </button>
            )}
        </>
    );
};

export default Home;

export const getServerSideProps = unauthenticated();
