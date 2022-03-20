import {Fragment, ReactElement, ReactNode} from 'react';

type FindType = (children: ReactNode, type: ReactNode) => any

const getFragmentedChildren = (children: ReactNode): ReactNode => {
    if ((children as ReactElement).type === Fragment) {
        return (children as ReactElement).props.children;
    }
    return children;
};

export const findType: FindType = (children, type): ReactNode[] =>
    [].concat(getFragmentedChildren(children))
        .reduce((list, child) => list.concat(child), [])
        .filter((child: { type: ReactNode }) => child.type === type);

export const findFirstOfType: FindType = (...args): ReactNode =>
    findType(...args)[0] || null;
