import {FunctionComponent} from 'react';
import {Icon} from '../../design/icon';

type Props = {
    length: number
}

export const EmptyDataMessage: FunctionComponent<Props> = (props) => props.length ? (
    <>
        {props.children}
    </>
) : (
    <>
        {'There is nothing here. Create new entries by clicking the '}
        <Icon
            size={'in-text'}
            type={'add'}
        />
        {' button below'}
    </>
);
