import {SessionProvider} from 'next-auth/react';
import {AppProps} from 'next/app';
import {Fragment, FunctionComponent} from 'react';
import {CsAuth} from '../lib/auth/cs-auth';

const App: FunctionComponent<AppProps> = ({Component, pageProps}) => {
    const AuthWrapper = pageProps.auth === false ? Fragment : CsAuth;

    return (
        <SessionProvider>
            <AuthWrapper>
                <Component {...pageProps}/>
            </AuthWrapper>
        </SessionProvider>
    );
};

export default App;
