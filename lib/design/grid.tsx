import {Key, PropsWithChildren, ReactElement, ReactNode} from 'react';
import styled from 'styled-components';
import {AnyObject} from '../../types/object';
import {Card} from './card';

type Props<T extends AnyObject> = {
    children: (item: T) => ReactNode
    items: T[],
    keyFn?: (item: T) => Key
}

const _Grid = styled.section`
    display: grid;
    grid-gap: var(--grid-gap);
`;

export const Grid = <T extends AnyObject>(props: PropsWithChildren<Props<T>>): ReactElement<any, any> => (
    <_Grid>
        {props.items?.map((item, index) => (
            <Card key={props.keyFn?.(item) || index}>
                {props.children(item)}
            </Card>
        ))}
    </_Grid>
);
