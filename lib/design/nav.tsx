import {FunctionComponent} from 'react';
import {useMediaQuery} from 'react-responsive';
import {NavDesktop} from './nav-desktop';
import {NavMobile} from './nav-mobile';
import {Props} from './nav-props';

export const Nav: FunctionComponent<Props> = (props) => {
    const canShowNav = useMediaQuery({query: '(min-width: 800px)'});

    return canShowNav ? (
        <NavDesktop items={props.items}/>
    ) : (
        <NavMobile items={props.items}/>
    );
};
