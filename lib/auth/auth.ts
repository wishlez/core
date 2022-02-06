import {useSession} from 'next-auth/react';
import {User} from '../contexts/user';

export type UseAuth = () => {
    user: User,
    status: 'loading' | 'authenticated' | 'unauthenticated'
}

export const useAuth: UseAuth = () => {
    const {data: session, status} = useSession();

    return {
        user: session?.user as User,
        status
    };
};
