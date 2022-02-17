import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {getUser} from '../../../lib/services/users';

export default NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                login: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials) {
                const user = await getUser(credentials);

                if (!user) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    login: user.login
                };
            }
        })
    ],
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
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/auth/sign-in',
        signOut: '/auth/sign-out'
    }
});
