import Link from 'next/link';
import {FunctionComponent} from 'react';

type Props = {
    href: string
};

export const NavItem: FunctionComponent<Props> = ({href, ...props}) => (
    <Link
        href={href}
        passHref
    >
        <a {...props}>
            {props.children}
        </a>
    </Link>
);
