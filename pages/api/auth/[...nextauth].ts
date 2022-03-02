import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {getUser} from '../../../lib/services/users';

export default NextAuth({
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.payload = Buffer.from(JSON.stringify(user)).toString('base64');
            }

            return token;
        },
        session({session, token}) {
            session.user = JSON.parse(Buffer.from(token.payload as string, 'base64').toString());

            return session;
        }
    },
    pages: {
        signIn: '/auth/sign-in',
        signOut: '/auth/sign-out'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const user = await getUser(credentials);

                if (!user) {
                    return null;
                }

                return {
                    id: user.id,
                    login: user.login,
                    name: user.name
                };
            },
            credentials: {
                login: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            name: 'Credentials'
        })
    ],
    secret: process.env.JWT_SECRET
});
