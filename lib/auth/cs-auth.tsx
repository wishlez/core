import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {FunctionComponent, useEffect} from 'react';
import {User} from '../../types/user';
import {UserProvider} from '../contexts/user';

export type CsAuth = FunctionComponent;

export type UseAuth = () => {
    user: User,
    status: 'loading' | 'authenticated' | 'unauthenticated'
}

export const CsAuth: CsAuth = ({children}) => {
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

export const useAuth: UseAuth = () => {
    const {data: session, status} = useSession();

    return {
        user: session?.user as User,
        status
    };
};
