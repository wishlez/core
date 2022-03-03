import {useRouter} from 'next/router';
import {Fragment, FunctionComponent, useEffect, useState} from 'react';
import {Icon} from './icon';
import {NavItem} from './nav-item';
import {DrawerBackdrop, DrawerContainer, DrawerControl, DrawerToggle, Nav, NavSection} from './nav-mobile-styled';
import {Props} from './nav-props';

export const NavMobile: FunctionComponent<Props> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleChange = () => {
        setIsOpen((state) => !state);
    };

    useEffect(() => {
        const handleRouteChange = () => {
            setIsOpen(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => router.events.off('routeChangeStart', handleRouteChange);
    }, [router]);

    return (
        <>
            <DrawerControl>
                <Icon type={'menu'}/>
            </DrawerControl>
            <DrawerToggle
                checked={isOpen}
                onChange={handleChange}
            />
            <DrawerContainer>
                <DrawerBackdrop/>
                <Nav>
                    <DrawerControl>
                        <Icon type={'close'}/>
                    </DrawerControl>
                    {props.items.map((item1, index1) => 'items' in item1 ? (
                        <Fragment key={index1}>
                            <NavSection>
                                {item1.label}
                            </NavSection>
                            {item1.items.map((item2, index2) => (
                                <NavItem
                                    item={item2}
                                    key={index2}
                                />
                            ))}
                        </Fragment>
                    ) : (
                        <NavItem
                            item={item1}
                            key={index1}
                        />
                    ))}
                </Nav>
            </DrawerContainer>
        </>
    );
};
