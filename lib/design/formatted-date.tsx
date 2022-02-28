import {FunctionComponent} from 'react';
import {DateTime} from 'luxon';

type Props = {
    dateTime: string
}

export const FormattedDate: FunctionComponent<Props> = (props) => (
    <time dateTime={props.dateTime}>
        {DateTime.fromISO(props.dateTime).toLocaleString(DateTime.DATE_MED)}
    </time>
);
