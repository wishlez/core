import {Fragment, Key, PropsWithChildren, ReactElement, ReactNode} from 'react';
import styled from 'styled-components';
import {AnyObject} from '../../types/object';
import {Card} from './card';

type Props<T extends AnyObject> = {
    children: (item: T) => ReactNode
    gridTemplateColumns?: string
    header?: ReactNode
    items: T[],
    keyFn?: (item: T) => Key
}

const _Grid = styled(Card)`
    align-items: baseline;
    display: grid;
    grid-gap: var(--grid-gap);
    white-space: nowrap;
`;

const Separator = styled.div`
    border-bottom: 1px solid var(--mono-800);
    grid-column: 1/-1;

    &:last-of-type {
        display: none;
    }
`;

type Grid = <T extends AnyObject>(props: PropsWithChildren<Props<T>>) => ReactElement<any, any>

export const Grid: Grid = ({gridTemplateColumns, ...props}) => (
    <_Grid style={{gridTemplateColumns}}>
        {props.header}
        {props.header && <Separator/>}
        {props.items?.map((item, index) => (
            <Fragment key={props.keyFn?.(item) || index}>
                {props.children(item)}
            </Fragment>
        ))}
    </_Grid>
);
