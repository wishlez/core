import {useRouter} from 'next/router';
import {FunctionComponent, useEffect} from 'react';
import {NavItems} from '../design/nav-props';
import {PageBody} from '../design/page-body';
import {PageContent} from '../design/page-content';
import {PageHeader} from '../design/page-header';
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
        icon: 'account_balance',
        label: 'Accounts'
    },
    {
        href: '/transactions',
        icon: 'receipt_long',
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
        <>
            <PageNavigation
                {...pageLayoutState}
                items={items}
                navItemComponent={NavItem}
            />
            <PageContent {...pageLayoutState}>
                <PageHeader {...pageLayoutState}/>
                <PageBody>
                    {props.children}
                </PageBody>
            </PageContent>
        </>
    );
};
