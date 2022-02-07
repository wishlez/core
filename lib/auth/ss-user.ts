import {GetServerSidePropsContext} from 'next';
import {getSession} from 'next-auth/react';
import {User} from '../../types/user';

type GetUser = (context: GetServerSidePropsContext) => Promise<User>

export const getUser: GetUser = async (context) => {
    const {user} = await getSession(context);

    return user as User;
};
