import {SessionProvider} from 'next-auth/react';
import {AppProps} from 'next/app';
import {Fragment, FunctionComponent} from 'react';
import {CsAuth} from '../lib/auth/cs-auth';
import {AppContainer} from '../lib/components/app-container';

type App = FunctionComponent<AppProps>;

const App: App = ({Component, pageProps}) => {
    let AuthWrapper = CsAuth;
    let AppWrapper = AppContainer;

    if (pageProps.auth === false) {
        AuthWrapper = Fragment;
        AppWrapper = Fragment;
    }

    return (
        <SessionProvider>
            <AuthWrapper>
                <AppWrapper>
                    <Component {...pageProps}/>
                </AppWrapper>
            </AuthWrapper>
        </SessionProvider>
    );
};

export default App;
