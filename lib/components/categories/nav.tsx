import Link from 'next/link';
import {FunctionComponent} from 'react';

export type Nav = FunctionComponent;

export const Nav: Nav = () => (
    <nav>
        <Link href={'/categories/tags'}>Tags</Link>
        <Link href={'/categories/groups'}>Groups</Link>
    </nav>
);
