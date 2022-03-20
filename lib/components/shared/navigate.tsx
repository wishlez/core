import NextLink, {LinkProps} from 'next/link';
import {FunctionComponent, HTMLAttributes} from 'react';

type Props = HTMLAttributes<HTMLAnchorElement> & {
    to: LinkProps['href']
};

export const Navigate: FunctionComponent<Props> = ({to, ...props}) => (
    <NextLink href={to}>
        <a {...props}/>
    </NextLink>
);
