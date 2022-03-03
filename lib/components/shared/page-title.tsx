import Head from 'next/head';
import {FunctionComponent} from 'react';

type Props = {
    title?: string
}

export const PageTitle: FunctionComponent<Props> = (props) => (
    <Head>
        <title>
            {props.title ? `${props.title} | ` : ''}
            {`Wishlez v${process.env.VERSION}`}
        </title>
    </Head>
);
