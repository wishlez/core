import {SessionProvider} from 'next-auth/react';
import {AppProps} from 'next/app';
import {Fragment, FunctionComponent} from 'react';
import {CsAuth} from '../lib/auth/cs-auth';
import {AppContainer} from '../lib/components/app-container';
import {IntroContainer} from '../lib/components/intro-container';
import {PageTitle} from '../lib/components/shared/page-title';
import './_app.css';

const App: FunctionComponent<AppProps> = ({Component, pageProps}) => {
    let AuthWrapper = CsAuth;
    let AppWrapper = AppContainer;

    if (pageProps.auth === false) {
        AuthWrapper = Fragment;
        AppWrapper = IntroContainer;
    }

    return (
        <SessionProvider>
            <PageTitle/>
            <AuthWrapper>
                <AppWrapper>
                    <Component {...pageProps}/>
                </AppWrapper>
            </AuthWrapper>
        </SessionProvider>
    );
};

export default App;
