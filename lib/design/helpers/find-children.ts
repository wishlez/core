import {ReactNode} from 'react';

type FindType = (children: ReactNode, type: ReactNode) => any

export const findType: FindType = (children, type): ReactNode[] =>
    [].concat(children)
        .reduce((list, child) => list.concat(child), [])
        .filter((child: { type: ReactNode }) => child.type === type);

export const findFirstOfType: FindType = (...args): ReactNode =>
    findType(...args)[0] || null;
