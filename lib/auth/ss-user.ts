import {GetServerSidePropsContext, NextApiRequest} from 'next';
import {getSession} from 'next-auth/react';
import {User} from '../../types/user';

type GetUser = (context: GetServerSidePropsContext | { req: NextApiRequest }) => Promise<User>

export const getUser: GetUser = async (context) => {
    const session = await getSession(context);

    return session?.user as User;
};
