import Link from 'next/link';
import {FunctionComponent} from 'react';

export const Nav: FunctionComponent = () => (
    <nav>
        <Link href={'/categories/tags'}>
            {'Tags'}
        </Link>
        <Link href={'/categories/groups'}>
            {'Groups'}
        </Link>
    </nav>
);
