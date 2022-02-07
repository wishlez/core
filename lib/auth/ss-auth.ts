import {GetServerSideProps, NextApiHandler} from 'next';
import {getSession} from 'next-auth/react';
import {Auth} from '../../types/auth';
import {User} from '../../types/user';
import {getUser} from './ss-user';

const defaultServerSideProps: GetServerSideProps<any, any, any> = async () => ({
    props: {}
});

const auth: Auth = (shouldRedirect, getRedirect, auth) => (getServerSideProps = defaultServerSideProps) => async (context) => {
    const session = await getSession({req: context.req});

    if (shouldRedirect(session)) {
        return {
            redirect: getRedirect(context)
        };
    }

    const serverSideProps = await getServerSideProps(context);
    const props = 'props' in serverSideProps ? serverSideProps.props : {};

    return {
        ...serverSideProps,
        props: {
            ...props,
            auth
        }
    } as any;
};

export const authenticated = auth(
    (session) => !Boolean(session),
    () => ({
        destination: '/auth/sign-in',
        permanent: false
    }),
    true
);

export const unauthenticated = auth(
    (session) => Boolean(session),
    () => ({
        destination: '/dashboard',
        permanent: false
    }),
    false
);

export const authenticatedApi = (handler: (user: User) => NextApiHandler): NextApiHandler => async (req, res, ...rest) => {
    const user = await getUser({req});

    if (user) {
        return handler(user)(req, res, ...rest);
    }

    return res.status(401).send({
        error: 'Unauthorized'
    });
};
