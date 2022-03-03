import {FunctionComponent} from 'react';
import {Header} from './header';

export const AppContainer: FunctionComponent = ({children}) => (
    <>
        <Header/>
        {children}
    </>
);
