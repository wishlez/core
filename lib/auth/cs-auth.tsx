import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent, useEffect} from 'react';

export const CsAuth: FunctionComponent = ({children}) => {
    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/sign-in');
        }
    }, [status, router]);

    if (session?.user) {
        return (
            <>
                {children}
            </>
        );
    }

    return null;
};
