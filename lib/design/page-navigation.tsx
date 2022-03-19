import {AnimatePresence, motion} from 'framer-motion';
import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Backdrop} from './backdrop';
import {Button} from './button';
import {Card} from './card';
import {Icon} from './icon';
import {Nav} from './nav';
import {NavProps} from './nav-props';
import {WithPageLayoutState} from './page-layout-state';
import {Portal} from './portal';

type Props = WithPageLayoutState<NavProps>;

const Aside = styled(Card.withComponent(motion.aside)).attrs({
    animate: {x: 0},
    exit: {x: '-100%'},
    initial: {x: '-100%'},
    key: 'navigation'
})`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: var(--page-navigation-width);
`;

export const PageNavigation: FunctionComponent<Props> = (props) => {
    const closeNav = () => props.setIsNavOpen(false);

    return props.isInDesktop ? (
        <Aside>
            <Nav
                items={props.items}
                navItemComponent={props.navItemComponent}
            />
        </Aside>
    ) : (
        <Portal>
            <Backdrop
                isVisible={props.isNavOpen}
                onClick={closeNav}
            />
            <AnimatePresence>
                {props.isNavOpen && (
                    <Aside>
                        <Button
                            color={'secondary'}
                            onClick={closeNav}
                            size={'cozy'}
                            variant={'text'}
                        >
                            <Icon
                                size={'root'}
                                type={'close'}
                            />
                        </Button>
                        <Nav
                            items={props.items}
                            navItemComponent={props.navItemComponent}
                        />
                    </Aside>
                )}
            </AnimatePresence>
        </Portal>
    );
};
