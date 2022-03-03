import {FunctionComponent} from 'react';
import styled from 'styled-components';
import {Icon} from '../design/icon';
import {Nav} from '../design/nav';
import {PageHeader} from '../design/page-header';
import {Banner} from './banner';

export const _Header = styled(PageHeader)`
    grid-template-columns: auto 1fr auto;
    justify-items: end;
    padding: var(--uniform-padding);
`;

const items = [
    {
        href: '/accounts',
        label: 'Accounts'
    },
    {
        href: '/transactions',
        label: 'Transactions'
    },
    {
        items: [
            {
                href: '/categories/tags',
                label: 'Tags'
            },
            {
                href: '/categories/groups',
                label: 'Groups'
            }
        ],
        label: 'Categories'
    },
    {
        items: [
            {
                href: '/auth/sign-out',
                label: 'Sign Out'
            }
        ],
        label: <Icon type={'account_circle'}/>
    }
];

export const Header: FunctionComponent = (props) => (
    <_Header>
        <Banner/>
        <Nav items={items}/>
    </_Header>
);
