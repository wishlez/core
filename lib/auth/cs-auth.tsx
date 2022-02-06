import {useRouter} from 'next/router';
import {FunctionComponent, useEffect} from 'react';
import {UserProvider} from '../contexts/user';
import {useAuth} from './auth';

export const CsAuth: FunctionComponent = ({children}) => {
    const {user, status} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/auth/sign-in`);
        }
    }, [user, status, router]);

    if (user) {
        return (
            <UserProvider value={user}>
                {children}
            </UserProvider>
        );
    }

    return null;
};
