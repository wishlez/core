import {signOut} from 'next-auth/react';
import {FunctionComponent} from 'react';
import {useUser} from '../contexts/user';
import {Nav} from './nav';

export const AppContainer: FunctionComponent = ({children}) => {
    const user = useUser();

    return (
        <>
            <div>
                {'Hello, '}
                {' '}
                {user.name}
                {'!'}
                <button onClick={() => signOut()}>
                    {'Sign Out'}
                </button>
            </div>
            <Nav/>
            {children}
        </>
    );
};
