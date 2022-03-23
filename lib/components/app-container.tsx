import {Navigate} from './shared/navigate';
import {useRouter} from 'next/router';
import {FunctionComponent, useEffect} from 'react';
import {Button} from '../design/button';
import {Icon} from '../design/icon';
import {Menu} from '../design/menu';
import {MenuItem} from '../design/menu-item';
import {MenuText} from '../design/menu-text';
import {NavItems} from '../design/nav-props';
import {PageBody} from '../design/page-body';
import {PageContent} from '../design/page-content';
import {PageHeader} from '../design/page-header';
import {PageHeaderProvider} from '../design/page-header-provider';
import {usePageLayoutState} from '../design/page-layout-state';
import {PageNavigation} from '../design/page-navigation';
import {NavItem} from './shared/nav-item';

const items: NavItems = [
    {
        href: '/dashboard',
        icon: 'dashboard',
        label: 'Home'
    },
    {
        href: '/accounts',
        icon: 'account',
        label: 'Accounts'
    },
    {
        href: '/transactions',
        icon: 'transaction',
        label: 'Transactions'
    },
    {
        items: [
            {
                href: '/categories/tags',
                icon: 'tag',
                label: 'Tags'
            },
            {
                href: '/categories/groups',
                icon: 'category',
                label: 'Groups'
            }
        ],
        label: 'Categories'
    }
];

export const AppContainer: FunctionComponent = (props) => {
    const pageLayoutState = usePageLayoutState();
    const router = useRouter();
    const {setIsNavOpen} = pageLayoutState;

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setIsNavOpen(false);
        };
        router.events.on('routeChangeStart', handleRouteChangeStart);

        return () => router.events.off('routeChangeStart', handleRouteChangeStart);
    }, [router, setIsNavOpen]);

    return (
        <PageHeaderProvider>
            <PageNavigation
                {...pageLayoutState}
                items={items}
                navItemComponent={NavItem}
            />
            <PageContent {...pageLayoutState}>
                <PageHeader {...pageLayoutState}>
                    <Menu>
                        <MenuText>
                            <Button
                                color={'secondary'}
                                size={'cozy'}
                                type={'button'}
                                variant={'text'}
                            >
                                <Icon type={'user'}/>
                            </Button>
                        </MenuText>
                        <MenuItem
                            as={Navigate}
                            to={'/auth/sign-out'}
                        >
                            {'Sign Out'}
                        </MenuItem>
                    </Menu>
                </PageHeader>
                <PageBody>
                    {props.children}
                </PageBody>
            </PageContent>
        </PageHeaderProvider>
    );
};
