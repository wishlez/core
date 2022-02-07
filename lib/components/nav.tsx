import Link from 'next/link';
import {FunctionComponent} from 'react';

export type Nav = FunctionComponent;

export const Nav: Nav = () => (
    <nav>
        <Link href={'/accounts'}>Accounts</Link>
        <Link href={'/categories/tags'}>Categories</Link>
        <Link href={'/transactions'}>Transactions</Link>
    </nav>
);
