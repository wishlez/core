import {SessionProvider} from 'next-auth/react';
import {AppProps} from 'next/app';
import {Fragment, FunctionComponent} from 'react';
import {CsAuth} from '../lib/auth/cs-auth';
import {AppContainer} from '../lib/components/app-container';
import {PageTitle} from '../lib/components/shared/page-title';
import './_app.css';

const App: FunctionComponent<AppProps> = ({Component, pageProps}) => {
    let AuthWrapper = CsAuth;

    if (pageProps.auth === false) {
        AuthWrapper = Fragment;
    }

    return (
        <SessionProvider>
            <PageTitle/>
            <AuthWrapper>
                <AppContainer hideNav={!pageProps.auth}>
                    <Component {...pageProps}/>
                </AppContainer>
            </AuthWrapper>
        </SessionProvider>
    );
};

export default App;
