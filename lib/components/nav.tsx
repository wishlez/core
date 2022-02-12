import Link from 'next/link';
import {FunctionComponent} from 'react';

export const Nav: FunctionComponent = () => (
    <nav>
        <Link href={'/accounts'}>Accounts</Link>
        <Link href={'/categories/tags'}>Categories</Link>
        <Link href={'/transactions'}>Transactions</Link>
    </nav>
);
