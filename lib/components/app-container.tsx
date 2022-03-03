import {FunctionComponent} from 'react';
import {Header, Props as HeaderProps} from './header';

type Props = HeaderProps;

export const AppContainer: FunctionComponent<Props> = (props) => (
    <>
        <Header hideNav={props.hideNav}/>
        {props.children}
    </>
);
