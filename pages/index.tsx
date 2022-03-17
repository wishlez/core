import {signIn} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent, useEffect} from 'react';
import styled from 'styled-components';
import {useAuth} from '../lib/auth/cs-auth';
import {unauthenticated} from '../lib/auth/ss-auth';
import {PageTitle} from '../lib/components/shared/page-title';
import {Button} from '../lib/design/button';

const Center = styled.section`
    text-align: center;
`;

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
            <Center>
                <h2>
                    {'Welcome to Wishlez!'}
                </h2>
                <Button onClick={() => signIn()}>
                    {'Sign In!'}
                </Button>
            </Center>
        </>
    );
};

export default Home;

export const getServerSideProps = unauthenticated();
